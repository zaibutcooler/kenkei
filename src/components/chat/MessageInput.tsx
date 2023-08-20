import React, { useState } from "react";

const MessageInput: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your logic to send the message
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex border-t p-3">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 h-[15vh] rounded-l-md border"
      />
    </form>
  );
};

export default MessageInput;
