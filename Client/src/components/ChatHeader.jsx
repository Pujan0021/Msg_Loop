import React, { useContext } from "react";
import { UserAuthContext } from "../context/ContextProvider";
import { useChatStore } from "../store/chat.store";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate();
  const { userDetail } = useContext(UserAuthContext);
  const { activeTab } = useChatStore();
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      if (res) {
        toast.success("Logout SuccessFully");
        // console.log("success");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error occured Logging out");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex font-orbitron justify-center items-center h-screen flex-col">
        <div className=" text-center py-2 px-2  text-xl font-bold bg-gray-800 text-white rounded-sm w-90">
          Msg_Loop
        </div>
        <div className="shadow-2xl shadow-blue-950 p-5 rounded-sm  bg-gray-800 text-white mt-1">
          <div className="flex justify-between items-center">
            <div className="flex justify-start px-3 flex-col">
              <div className=" h-10 rounded-full  px-5">
                <img
                  className=" border border-cyan-900 h-10 rounded-full "
                  src=".././public/profile.jpg"
                  alt="profile"
                />
              </div>
              <div className="px-3 text-sm py-2">
                {userDetail ? userDetail.fullName : "Guest"}
              </div>
            </div>
            <div onClick={handleLogOut} className="text-xl px-5">
              <FiLogOut className="hover:text-amber-800 cursor-pointer" />
            </div>
          </div>

          <div className="flex border-t-2 border-white justify-center gap-15 w-80 mt-5">
            <div className="bg-cyan-600 px-5 rounded-sm text-white py-1 mt-2 font-semibold text-sm cursor-pointer">
              Chats
            </div>

            <div className="bg-cyan-600 px-5 rounded-sm text-white py-1 mt-2 font-semibold text-sm cursor-pointer">
              Contacts
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
