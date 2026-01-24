import React, { useContext, useEffect, useRef } from "react";
import ChatHead from "./ChatHead";
import { useChatStore } from "../store/chat.store";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import { UserAuthContext } from "../context/ContextProvider";
import NoConversationPlaceHolder from "./NoConversationPlaceHolder";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { userDetail } = useContext(UserAuthContext);

  const {
    selectedUser,
    messages,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessages,
  } = useChatStore();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;

    getMessagesByUserId();
    subscribeToMessage();

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return <NoConversationPlaceHolder />;

  return (
    <div className="flex flex-col h-83.5 p-2 rounded-md bg-gray-800 shadow-lg">
      <ChatHead />

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin hide-scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === userDetail._id;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow font-orbitron transition-transform duration-200 ${
                    isOwnMessage
                      ? "bg-blue-600 text-white hover:scale-105"
                      : "bg-gray-200 text-gray-900 hover:scale-105"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        ) : (
          <NoChatHistoryPlaceholder />
        )}

        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
