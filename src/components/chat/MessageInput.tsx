import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your logic to send the message
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex border-t p-3 gap-4">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow text-sm md:text-base p-2 h-[10vh] rounded-l-md border"
      />

      <div>
        <button className=" flex gap-2 flex-row py-2 px-2 md:px-4 rounded-md bg-green-400">
          <span className="text-sm md:text-base">Send</span>
          <FaPaperPlane className="hidden md:block" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
