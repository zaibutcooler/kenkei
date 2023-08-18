"use client";

import { useSession } from "next-auth/react";

const ProfileBlock = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? <div>{session.user.email}</div> : <div>nothing</div>}
    </div>
  );
};

export default ProfileBlock;
