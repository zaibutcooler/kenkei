import { fetcher } from "@/lib/db";
import getRequests from "@/lib/utils/getRequests";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RequestPage = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const friendRequests = await getRequests(session.user.id);

  return (
    <div>
      <section>requests</section>
    </div>
  );
};

export default RequestPage;
