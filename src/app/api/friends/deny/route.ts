import { authOptions } from "@/lib/auth";
import { db, fetcher } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAlreadyFriends = await fetcher(
      "sismember",
      `user:${session.user.id}:friends`
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const friendRequest = await fetcher(
      "sismember",
      `user:${session.user.id}:incoming_request`,
      id
    );

    if (!friendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    const [rawUser, rawFriend] = (await Promise.all([
      fetcher("get", `user:${session.user.id}`),
      fetcher("get", `user:${id}`),
    ])) as [string, string];

    const user = JSON.parse(rawUser) as User;
    const friend = JSON.parse(rawFriend) as User;

    //notify and final step

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Deny Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
