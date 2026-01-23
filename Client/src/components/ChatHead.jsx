import React from "react";
import { useChatStore } from "../store/chat.store";
import { FiX } from "react-icons/fi";
import NoConversationPlaceHolder from "./NoConversationPlaceHolder";
const ChatHead = () => {
  const { setSelectedUser } = useChatStore();
  const { selectedUser } = useChatStore();
  return (
    <>
      {selectedUser ? (
        <div className="shadow-2xl flex justify-between  shadow-blue-950 p-5 rounded-sm bg-gray-800 text-white  font-orbitron mt-12  h-72 w-80">
          <div>
            <div className=" h-10 rounded-full w-30">
              <img
                className=" border border-cyan-900  h-10 rounded-full "
                src=".././public/profile.jpg"
                alt="profile"
              />
            </div>

            <div className="text-[10px] ">{selectedUser.fullName}</div>
          </div>{" "}
          <div
            onClick={() => setSelectedUser(null)}
            className="pt-5 cursor-pointer"
          >
            <FiX />
          </div>
        </div>
      ) : (
        <NoConversationPlaceHolder />
      )}
    </>
  );
};

export default ChatHead;
