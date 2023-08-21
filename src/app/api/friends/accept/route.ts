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

    await db.srem(`user:${session.user.id}:incoming_request`);

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Accept Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
