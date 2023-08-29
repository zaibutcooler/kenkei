import { authOptions } from "@/lib/auth";
import { fetcher } from "@/lib/db";
import { User } from "@/lib/types/db";
import { Message } from "@/lib/types/types";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { db } from "@/lib/redis";
import { keyToPusher, pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { text, chatID }: { text: string; chatID: string } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const [idOne, idTwo] = chatID.split("--");

    if (session.user.id !== idOne && session.user.id !== idTwo) {
      return new Response("Unauthorized", { status: 401 });
    }

    const partnerID = session.user.id === idOne ? idTwo : idOne;

    const myFriends = (await fetcher(
      "smembers",
      `user:${session.user.id}:friends`
    )) as string[];

    const isFriend = myFriends.includes(partnerID);

    if (!isFriend) {
      return new Response("Unauthorized", { status: 401 });
    }

    const rawSender = (await fetcher(
      "get",
      `user:${session.user.id}`
    )) as string;
    const sender = JSON.parse(rawSender) as User;

    const created = Date.now();

    const data: Message = {
      id: nanoid(),
      senderID: session.user.id,
      receiverID: partnerID,
      text,
      created,
    };

    pusherServer.trigger(
      keyToPusher(`chat:${chatID}`),
      "incoming-message",
      data
    );

    await db.zadd(`chat:${chatID}:messages`, {
      score: created,
      member: JSON.stringify(data),
    });

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Add Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
