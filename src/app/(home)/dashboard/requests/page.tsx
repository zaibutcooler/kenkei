import { authOptions } from "@/lib/auth";
import getRequests from "@/lib/utils/getRequests";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RequestPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const friendRequests = await getRequests(session.user.id);

  return (
    <div>
      {friendRequests ? (
        <section>requests</section>
      ) : (
        <section>No Requests</section>
      )}
    </div>
  );
};

export default RequestPage;
