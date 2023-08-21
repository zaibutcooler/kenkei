"use client";
import { fetcher } from "@/lib/db";
import { RequestType } from "@/lib/types/types";
import getRequests from "@/lib/utils/getRequests";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const RequestPage = () => {
  const [requests, setRequests] = useState<RequestType[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fillDatas = async () => {
      if (session?.user) {
        const friendRequests = await getRequests(session.user.id);
        friendRequests && setRequests(friendRequests);
      }
    };
    fillDatas();
  }, []);

  return (
    <div>
      {requests ? <section>requests</section> : <section>No Requests</section>}
    </div>
  );
};

export default RequestPage;
