import React, { useEffect } from "react";
import { useChatStore } from "../store/chat.store";

const ChatPage = () => {
  const { chats, getMyChatPartners, setSelectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, []); // run only once

  if (!chats || chats.length === 0) {
    return <p className="px-3 py-2 text-gray-500">No Chats</p>;
  }

  return (
    <div className="shadow-2xl shadow-blue-950 p-5 rounded-sm flex font-orbitron justify-center items-center  flex-col  bg-gray-800 text-white mt-1 ">
      <div className="flex justify-between items-center">
        <div className="flex justify-start px-3 flex-col">
          {chats.map((chat) => {
            return (
              <div
                onClick={() => setSelectedUser(chat)}
                key={chat._id}
                className="flex justify-start px-3 flex-row mt-3 cursor-pointer"
              >
                <div className=" h-10 rounded-full  px-5">
                  <img
                    className=" border border-cyan-900 h-10 rounded-full "
                    src=".././public/profile.jpg"
                    alt="profile"
                  />
                </div>
                <div className="px-3  text-[12px] py-3">{chat.fullName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
