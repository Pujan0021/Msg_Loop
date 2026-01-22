import React, { useEffect } from "react";
import { useChatStore } from "../store/chat.store";
const Contacts = () => {
  const { getAllContacts, allContacts } = useChatStore();
  //   console.log(allContacts);
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  const { activeTab } = useChatStore();
  return (
    <>
      <div className="flex font-orbitron justify-center items-center  flex-col ">
        <div className="shadow-2xl shadow-blue-950 p-5 rounded-sm  bg-gray-800 text-white mt-1">
          <div className="flex justify-between items-center">
            <div className="flex justify-start px-3 flex-col">
              {activeTab === "contacts" ? (
                allContacts.map((contact) => {
                  return (
                    <div
                      key={contact._id}
                      className="flex justify-start px-3 flex-row mt-3"
                    >
                      <div className=" h-10 rounded-full  px-5">
                        <img
                          className=" border border-cyan-900 h-10 rounded-full "
                          src=".././public/profile.jpg"
                          alt="profile"
                        />
                      </div>
                      <div className="px-3  text-[12px] py-3">
                        {contact.fullName}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>You are in chat field</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
