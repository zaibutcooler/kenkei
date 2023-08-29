"use client";

import { keyToPusher, pusherClient } from "@/lib/pusher";
import { RequestType } from "@/lib/types/types";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

interface Props {
  items: { senderId: string; senderEmail: string }[];
  sessionId: string;
}

interface IncomingRequest {
  senderId: string;
  senderEmail: string;
}

const FriendRequests: FC<Props> = ({ items, sessionId }) => {
  const [requests, setRequests] = useState(items);

  const handleAccept = async (id: string) => {
    try {
      const response = await fetch("/api/friends/accept", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        window.alert("ok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(keyToPusher(`user:${sessionId}:incoming_request`));

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingRequest) => {
      console.log(senderId, "sid");
      setRequests((prev) => [...prev, { senderId, senderEmail }]);
    };
    pusherClient.bind(`incoming_request`, friendRequestHandler);
    return () => {
      pusherClient.unsubscribe(
        keyToPusher(`user:${sessionId}:incoming_request`)
      );
      pusherClient.unbind(`incoming_request`, friendRequestHandler);
    };
  }, []);

  const handleDeny = async (id: string) => {
    try {
      const response = await fetch("/api/friends/deny", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        window.alert("ok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {" "}
      {requests &&
        requests.map((item) => (
          <div className="mb-3 p-2 flex gap-3" key={item.senderId}>
            <h1 className="w-60">{item.senderEmail}</h1>
            <button
              className="text-xl text-green-500"
              onClick={() => handleAccept(item.senderId)}>
              <BsCheckCircleFill />
            </button>
            <button
              className="text-xl text-red-500"
              onClick={() => handleDeny(item.senderId)}>
              <BsXCircleFill />
            </button>
          </div>
        ))}
    </div>
  );
};

export default FriendRequests;
