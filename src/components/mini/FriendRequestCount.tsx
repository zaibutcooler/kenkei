"use client";

import { keyToPusher, pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

interface Props {
  sessionId: string;
  initialUnseen: number;
}

const FriendRequestCount: FC<Props> = ({ sessionId, initialUnseen }) => {
  const [unseenRequest, setUnseenRequest] = useState(
    initialUnseen ? initialUnseen : 0
  );

  useEffect(() => {
    pusherClient.subscribe(keyToPusher(`user:${sessionId}:incoming_request`));

    const friendRequestHandler = () => {
      setUnseenRequest(unseenRequest + 1);
    };
    pusherClient.bind(`incoming_request`, friendRequestHandler);
    return () => {
      pusherClient.unsubscribe(
        keyToPusher(`user:${sessionId}:incoming_request`)
      );
      pusherClient.unbind(`incoming_request`, friendRequestHandler);
    };
  }, []);

  return (
    <div className="p-1 text-sky-600 text-xs font-semi">
      {unseenRequest ? unseenRequest : ""}
    </div>
  );
};

export default FriendRequestCount;
