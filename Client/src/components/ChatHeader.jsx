import React, { useContext } from "react";
import { UserAuthContext } from "../context/ContextProvider";
const ChatHeader = () => {
  const { userDetail } = useContext(UserAuthContext);
  return (
    <>
      <div className="flex  font-orbitron justify-center items-center h-screen">
        <div className="shadow-2xl shadow-blue-950 p-5 rounded-sm bg-cyan-900 text-white">
          <div className="flex justify-center   w-80 ">
            <div className="border rounded-full px-5">i</div>
            <div className=" px-5">
              {userDetail ? userDetail.fullName : "Guest"}
            </div>

            <div></div>
          </div>
          <div className="flex justify-center gap-10 w-80 mt-10 ">
            <div className="bg-cyan-600 px-5 rounded-sm text-white py-1 font-semibold">
              Chats
            </div>
            <div className="bg-cyan-600 px-5 rounded-sm text-white py-1 font-semibold">
              Contacts
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
