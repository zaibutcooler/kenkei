import { fetcher } from "../db";
import { User } from "../types/db";

const getFriends = async (userID: string) => {
  try {
    console.log("userID", userID);
    const friendIds = (await fetcher(
      "smembers",
      `user:${userID}:friends`
    )) as string[];
    console.log("friend ids", friendIds);

    const friends = await Promise.all(
      friendIds.map(async (friendId) => {
        const friend = (await fetcher("get", `user:${friendId}`)) as string;
        const parsedFriend = JSON.parse(friend) as User;
        return parsedFriend;
      })
    );

    return friends;
  } catch (error) {
    console.log("err", error);
  }
};

export default getFriends;
