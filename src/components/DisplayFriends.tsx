"use client";

import { User } from "@/lib/types/db";
import getUrl from "@/lib/utils/getUrl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  friends: User[];
  userID: string;
}

const DisplayFriends: FC<Props> = ({ friends, userID }) => {
  return (
    <div>
      {friends &&
        friends.map((item) => (
          <Link
            href={`/dashboard/chat/${getUrl(item.id, userID)}`}
            key={item.id}
            className="flex gap-4 mb-2 font-medium items-center rounded-md pl-4 py-1.5 hover:bg-green-50">
            <div>
              {item.image && (
                <Image
                  className="rounded-full"
                  src={item.image}
                  alt={`${item.name}'s profile`}
                  width={30}
                  height={30}
                />
              )}
            </div>
            <div className="flex ">
              <h1 className="w-full text-base">{item.name}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default DisplayFriends;
