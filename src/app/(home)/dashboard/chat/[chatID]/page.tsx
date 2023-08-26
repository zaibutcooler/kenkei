import React from "react";
import Messages from "@/components/chat/Messages";
import MessageInput from "@/components/chat/MessageInput";
import { fetcher } from "@/lib/db";
import { User } from "@/lib/types/db";
import getUser from "@/lib/utils/getUser";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import getMessages from "@/lib/utils/getMessages";
import { redirect } from "next/navigation";

interface ChatPageProps {
  params: { chatID: string };
}

const ChatPage: React.FC<ChatPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const { chatID } = params;

  const [idOne, idTwo] = chatID?.split("--") || [];
  console.log("bb", chatID);

  const partnerID = session.user.id === idOne ? idTwo : idOne;

  const chatPartner = await getUser(partnerID);

  const initialMessages = await getMessages(chatID);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Your Header */}
      <header className="h-[12vh] flex items-center px-4 border-b">
        <div className="w-[42px] h-[42px] md:w-[48px] md:h-[48px]">
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
          <h2 className="text-base md:text-lg font-semibold">
            {chatPartner ? chatPartner.name : ""}
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            {chatPartner ? chatPartner.email : ""}
          </p>
        </div>
      </header>

      <section className="h-[68vh]">
        {initialMessages ? <Messages messages={initialMessages} /> : null}
      </section>
      <section className="h-[20vh]">
        <MessageInput chatID={chatID} />
      </section>
    </div>
  );
};

export default ChatPage;
