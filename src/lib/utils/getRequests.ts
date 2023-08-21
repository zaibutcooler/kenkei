import { fetcher } from "../db";
import { RequestType } from "../types/types";

interface Request {
  id: string;
  email: string;
}

const getRequests = async (userID: string) => {
  try {
    const requestIDs = await fetcher(
      "sismember",
      `user:${userID}:incoming_requests`
    );

    console.log("request ID->", requestIDs);

    if (requestIDs) {
      const requests: RequestType[] = await Promise.all(
        requestIDs.map(async (id: string) => {
          const email = await fetcher("get", `user:${id}`);
          return { id, email };
        })
      );
      console.log("requests ->", requests);
      return requests;
    } else {
      console.log("no requests");
      return [];
    }
  } catch (error) {
    console.log("err", error);
  }
};

export default getRequests;
