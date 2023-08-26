"use client";
import { FC, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { User } from "@/lib/types/db";
import { Session } from "next-auth";
import ProfileBlock from "./ProfileBlock";

interface Props {
  friends: User[];
  session: Session;
}

const MobileSidebarToggler: FC<Props> = ({ friends, session }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="fixed top-0 right-0">
      {display && (
        <div className="md:hidden w-full h-screen">
          <div className="flex h-screen">
            <div className="w-[265px] bg-white px-3 border-l flex flex-col">
              <button
                className="md:hidden text-xs font-semibold mr-4 mt-4 self-end"
                onClick={() => setDisplay(false)}>
                Back
              </button>
              <div className="flex-grow">
                <Sidebar friends={friends} session={session} />
              </div>
              <div className="self-end">
                <ProfileBlock />
              </div>
            </div>
            <div
              className="flex-1 backdrop-filter backdrop-blur"
              onClick={() => setDisplay(false)}></div>
          </div>
        </div>
      )}
      <button className="md:hidden" onClick={() => setDisplay(true)}>
        <AiOutlineMenu className="mt-6 mr-4 text-lg" />
      </button>
    </div>
  );
};

export default MobileSidebarToggler;
