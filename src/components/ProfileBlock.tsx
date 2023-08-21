"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

const ProfileBlock = () => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user && (
        <div className="flex flex-1 items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
          <div className="relative rounded-full h-8 w-8 bg-gray-50">
            {session.user.image && (
              <Image
                className="rounded-full"
                src={session.user.image}
                alt="profile pic"
                width={32}
                height={32}
              />
            )}
          </div>

          <span className="sr-only">Your profile</span>
          <div className="flex flex-col">
            <span aria-hidden="true">{session.user.name}</span>
            <span className="text-xs text-zinc-400" aria-hidden="true">
              {session.user.email}
            </span>
          </div>
          <button className="hover:text-green-500" onClick={() => signOut()}>
            <FiLogOut className="h-4 w-4 aspect-square" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileBlock;
