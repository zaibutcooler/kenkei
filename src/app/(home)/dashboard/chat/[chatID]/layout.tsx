import { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full">{children}</div>;
};

export default ChatLayout;
