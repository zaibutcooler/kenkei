import { fetcher } from "../db";

const getFriends = async (userID: string) => {
  try {
    const friendIDs = await fetcher("sismember", `user:${userID}:friends`);

    if (friendIDs) {
      const friends = await Promise.all(
        friendIDs.map((id: string) => fetcher("get", `user:${id}`))
      );
      console.log("friends ->", friends);
      return friends;
    } else {
      console.log("no friends");
    }
  } catch (error) {
    console.log("err", error);
  }
};

export default getFriends;
