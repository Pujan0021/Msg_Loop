import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { io } from "socket.io-client";

export const useChatStore = create((set, get) => ({
    authUser: null,
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    socket: null,
    onlineUsers: [],

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axios.get("http://localhost:3000/api/messages/contacts", {
                withCredentials: true,
            });
            set({ allContacts: res.data.contacts });
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    handleChats: () => set({ activeTab: "chats" }),
    handleContacts: () => set({ activeTab: "contacts" }),

    getMyChatPartners: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axios.get("http://localhost:3000/api/messages/chats", {
                withCredentials: true,
            });
            set({ chats: res.data.chatPartners });
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessagesByUserId: async () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        set({ isMessagesLoading: true });
        try {
            const res = await axios.get(
                `http://localhost:3000/api/messages/${selectedUser._id}`,
                { withCredentials: true }
            );
            set({ messages: res.data.message });
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (msg) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;

        try {
            const res = await axios.post(
                `http://localhost:3000/api/messages/send/${selectedUser._id}`,
                { message: msg },
                { withCredentials: true }
            );
            set({ messages: [...messages, res.data.message] });
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket = io("http://localhost:3000", {
            withCredentials: true,
        });

        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) socket.disconnect();
    },

    subscribeToMessage: () => {
        const socket = get().socket;
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            set({ messages: [...get().messages, newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = get().socket;
        socket?.off("newMessage");
    },
}));