import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatField from "../components/ChatField";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <ChatHeader></ChatHeader>
        <ChatField></ChatField>
      </div>
    </>
  );
};

export default Home;
