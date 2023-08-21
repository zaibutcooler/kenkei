import React from "react";

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
  messages: MessageProps[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="messages-container overflow-y-auto px-0 md:px-2 pb-4 pt-3">
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isSentByMe={message.isSentByMe}
        />
      ))}
    </div>
  );
};

export default Messages;
