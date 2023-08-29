"use client";
import { keyToPusher, pusherClient } from "@/lib/pusher";
import { Message } from "@/lib/types/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface MessageProps {
  text: string;
  isSentByMe: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isSentByMe }) => {
  return (
    <div
      className={`w-full flex gap-4 ${
        isSentByMe ? "justify-end" : "justify-start "
      } mb-2 `}>
      {!isSentByMe && (
        <div className="w-11 h-auto">
          <div className="w-11 rounded-full h-11 bg-gray-100" />
        </div>
      )}

      <p
        className={`py-2 px-3 rounded-lg border inline-block ${
          isSentByMe ? "bg-green-400" : ""
        }`}>
        {text}
      </p>
      {isSentByMe && (
        <div className="w-11 h-auto">
          <div className="w-11 rounded-full h-11 bg-gray-100" />
        </div>
      )}
    </div>
  );
};

interface MessagesProps {
  initialMessages: Message[];
  chatID: string;
  sessionId: string;
}

const Messages: React.FC<MessagesProps> = ({
  initialMessages,
  chatID,
  sessionId,
}) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(keyToPusher(`chat:${chatID}`));

    const messageHandler = (data: Message) => {
      setMessages((prev) => [data, ...prev]);
    };
    pusherClient.bind(`incoming-message`, messageHandler);

    return () => {
      pusherClient.unsubscribe(keyToPusher(`chat:${chatID}`));
      pusherClient.unbind(`incoming-message`, messageHandler);
    };
  }, []);

  return (
    <div className=" px-0 md:px-2 pb-4 pt-3 flex flex-col-reverse">
      {" "}
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isSentByMe={message.senderID === session?.user.id}
        />
      ))}
    </div>
  );
};

export default Messages;
