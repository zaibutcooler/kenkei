import ProfileBlock from "@/components/ProfileBlock";
import { fetcher } from "@/lib/db";
import getFriends from "@/lib/utils/getFriends";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { ReactNode } from "react";
import { BiUserPlus, BiUser } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { authOptions } from "@/lib/auth";
import DisplayFriends from "@/components/DisplayFriends";
import Sidebar from "@/components/Sidebar";
import MobileSidebarToggler from "@/components/MobileSidebarToggler";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const friends = await getFriends(session.user.id);

  return (
    <div className="flex h-screen">
      <section className="hidden md:flex h-full w-full font-medium max-w-[300px] grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        {friends && <Sidebar friends={friends} session={session} />}
        <div className="">
          <ProfileBlock />
        </div>
      </section>
      <section className="px-3 md:px-6 w-full">
        <main>{children}</main>{" "}
        {friends && (
          <MobileSidebarToggler friends={friends} session={session} />
        )}
      </section>
    </div>
  );
};

export default HomeLayout;
