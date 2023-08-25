"use client";

import { POST } from "@/app/api/friends/accept/route";
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface Props {
  chatID: string;
}

const MessageInput: React.FC<Props> = ({ chatID }) => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postBody = { chatID, text: inputText };

      const response = await fetch("/api/chat/send", {
        method: "POST",
        body: JSON.stringify(postBody),
      });

      if (response.ok) {
        setInputText("");
      }
    } catch (error) {
      console.log("chat submmit error", error);
    }

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
