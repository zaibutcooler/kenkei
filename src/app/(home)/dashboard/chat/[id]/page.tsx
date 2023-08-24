import React from "react";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";
import { fetcher } from "@/lib/db";
import { User } from "@/lib/types/db";
import getUser from "@/lib/utils/getUser";
import Image from "next/image";

interface ChatPageProps {
  params: { id: string };
}

const dummyMessages = [
  { text: "Hello!", isSentByMe: true },
  { text: "Hi there!", isSentByMe: false },
  { text: "How are you?", isSentByMe: true },
  // Add more dummy messages here
];

const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const { id } = params;

  const chatPartner = await getUser(id);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Your Header */}
      <header className="h-[12vh] flex items-center px-4 border-b">
        <div>
          {chatPartner?.image && (
            <Image
              className="rounded-full"
              src={chatPartner.image}
              alt={`${chatPartner?.name}'s profile image`}
              width={48}
              height={48}
            />
          )}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">
            {chatPartner ? chatPartner.name : ""}
          </h2>
          <p className="text-sm text-gray-600">
            {chatPartner ? chatPartner.email : ""}
          </p>
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
