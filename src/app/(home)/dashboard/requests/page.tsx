import { authOptions } from "@/lib/auth";
import { fetcher } from "@/lib/db";
import getRequests from "@/lib/utils/getRequests";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsXCircleFill, BsCheckCircleFill } from "react-icons/bs";

const RequestPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const incomingSenderIds = (await fetcher(
    "smembers",
    `user:${session.user.id}:incoming_request`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetcher("get", `user:${senderId}`)) as string;

      const senderParsed = JSON.parse(sender) as User;
      console.log({
        senderId,
        senderEmail: senderParsed.email,
      });

      return {
        senderId,
        senderEmail: senderParsed.email,
      };
    })
  );

  return (
    <div>
      <main className="mt-16">
        <header className="mb-8 text-3xl font-extrabold ">Add Friends</header>
        {incomingFriendRequests ? (
          <section>
            {incomingFriendRequests.map((item) => (
              <div className="mb-3 p-2 flex gap-3">
                <h1 className="w-60">{item.senderEmail}</h1>
                <button className="text-xl text-green-500">
                  <BsCheckCircleFill />
                </button>
                <button className="text-xl text-red-500">
                  <BsXCircleFill />
                </button>
              </div>
            ))}
          </section>
        ) : (
          <section>No Requests</section>
        )}
      </main>
    </div>
  );
};

export default RequestPage;
