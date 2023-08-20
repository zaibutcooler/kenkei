import React from "react";

interface MessageProps {
  text: string;
  isSentByMe: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isSentByMe }) => {
  return (
    <div className={`message ${isSentByMe ? "sent" : "received"}`}>
      <p className="py-2 px-3 rounded-lg shadow-md inline-block bg-white">
        {text}
      </p>
    </div>
  );
};

interface MessagesProps {
  messages: MessageProps[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="messages-container overflow-y-auto px-4 pb-4">
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
