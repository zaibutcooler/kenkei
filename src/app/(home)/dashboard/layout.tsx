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

const friendRequests = ["Kakashi Sensei", "Gojo Satoru", "Doraemon", "Python"];

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // const friends = await getFriends(session.user.id);

  // console.log("friends", friends);

  return (
    <div className="flex h-screen">
      <section className="hidden md:flex h-full w-full max-w-[300px] grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <header className="w-full h-16 shrink-0">Icon</header>

        <div className="flex-grow font-medium text-sm">
          <section className="mb-4">
            <p className="text-gray-400 font-medium text-xs mb-1">Chats</p>
          </section>
          <section className="mb-4">
            <p className="text-gray-400 font-medium text-xs mb-1">Friends</p>
            <Link
              href="/dashboard/add"
              className="py-2 rounded-md group hover:bg-green-50 hover:text-green-500 px-4 flex items-center gap-4">
              <BiUserPlus className="text-2xl p-[2px] border rounded-md group-hover:border-green-200" />
              <span className="">Add Friends</span>
            </Link>
            <Link
              href="/dashboard/requests"
              className="py-2 rounded-md group hover:bg-green-50 hover:text-green-500 px-4 flex items-center gap-4">
              <BiUser className="text-2xl p-[3px] border rounded-md group-hover:border-green-200" />
              <span className="">Friend Requests</span>
            </Link>

            {1 < 0 &&
              friendRequests.map((item) => (
                <div className="py-2" key={item}>
                  <p>{item}</p>
                </div>
              ))}
          </section>
        </div>

        <div className="">
          <ProfileBlock />
        </div>
      </section>
      <section className="px-3 md:px-6 w-full">{children}</section>
    </div>
  );
};

export default HomeLayout;
