import { fetcher } from "../db";
const session = await getServerSession();
if (!session) redirect("/login");
const getRequests = async (userID: string) => {
  try {
    const requestIDs = await fetcher(
      "sismember",
      `user:${userID}:incoming_requests`
    );

    if (requestIDs) {
      const requests = await Promise.all(
        requestIDs.map((id: string) => {
          const email = fetcher("get", `user:${id}`);
          return { id, email };
        })
      );
      console.log("requests ->", requests);
      return requests;
    } else {
      console.log("no requests");
    }
  } catch (error) {
    console.log("err", error);
  }
};

export default getRequests;
