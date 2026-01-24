import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useChatStore } from "../store/chat.store";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useChatStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 border-t"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-1.5 focus:outline-none text-black bg-white"
      />
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <FiSend />
      </button>
    </form>
  );
};

export default MessageInput;
