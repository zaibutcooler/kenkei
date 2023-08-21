import { fetcher } from "../db";
import { RequestType } from "../types/types";

const getRequests = async (userID: string) => {
  try {
    console.log("reached");

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
