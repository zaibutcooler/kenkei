import { ReactNode } from "react";

const loginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="container w-full md:w-[800px] ">{children}</div>
    </div>
  );
};

export default loginLayout;
