"use client";
import React from "react";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";

interface ChatPageProps {
  params: { id: string };
}

const dummyMessages = [
  { text: "Hello!", isSentByMe: true },
  { text: "Hi there!", isSentByMe: false },
  { text: "How are you?", isSentByMe: true },
  // Add more dummy messages here
];

const ChatPage: React.FC<ChatPageProps> = ({ params }) => {
  const { id } = params;

  // Replace this with your actual chat partner data
  const chatPartner = {
    name: "John Doe",
    email: "john@example.com",
    image: "url_to_image", // Replace with the actual image URL
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Your Header */}
      <header className="h-[12vh] flex items-center px-4 border-b">
        <div className="w-12 h-12 bg-green-500"></div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{chatPartner.name}</h2>
          <p className="text-sm text-gray-600">{chatPartner.email}</p>
        </div>
      </header>

      <section className="h-[68vh]">
        <Messages messages={dummyMessages} />
      </section>
      <section className="h-[20vh]">
        <MessageInput />
      </section>
    </div>
  );
};

export default ChatPage;
