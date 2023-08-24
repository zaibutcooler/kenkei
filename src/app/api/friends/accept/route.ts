import { authOptions } from "@/lib/auth";
import { db, fetcher } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const session = await getServerSession(authOptions);

    console.log("id ->", id);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("passed one");

    // verify both users are not already friends
    const isAlreadyFriends = await fetcher(
      "sismember",
      `user:${session.user.id}:friends`,
      id
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await fetcher(
      "sismember",
      `user:${session.user.id}:incoming_request`,
      id
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    await db.sadd(`user:${session.user.id}:friends`, id);

    await db.sadd(`user:${id}:friends`, id);

    // await db.srem(``) outbound

    await db.srem(`user:${session.user.id}:incoming_request`, id);

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Accept Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
