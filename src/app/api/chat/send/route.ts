export async function POST(req: Request) {
  try {
    const { chatID, text } = await req.json();

    console.log("cid", { chatID, text });

    return new Response("okay", { status: 201 });
  } catch (err) {
    console.log("Add Friend Error ->", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
