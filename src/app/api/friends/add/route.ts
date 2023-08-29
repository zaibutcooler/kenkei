import { authOptions } from "@/lib/auth";
import { fetcher } from "@/lib/db";
import { keyToPusher, pusherServer } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { db } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const idToAdd = (await fetcher("get", `user:email:${email}`)) as string;

    if (!idToAdd) {
      return new Response("Invalid Email!", { status: 400 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as friend", { status: 400 });
    }

    const isAlreadyAdded = await fetcher(
      "sismember",
      `user:${idToAdd}:incoming_requests`,
      session.user.id
    );

    if (isAlreadyAdded) {
      return new Response("Already added this user", { status: 400 });
    }

    const isAlreadyFriends = await fetcher(
      "sismember",
      `user:${idToAdd}:friends`,
      session.user.id
    );

    if (isAlreadyFriends) {
      return new Response("Already friends with this user", { status: 400 });
    }

    pusherServer.trigger(
      keyToPusher(`user:${idToAdd}:incoming_request`),
      "incoming_request",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    );

    const newItem = await db.sadd(
      `user:${idToAdd}:incoming_request`,
      session.user.id
    );

    if (!newItem) {
      return new Response("An error occuredd", { status: 500 });
    }

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Add Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
