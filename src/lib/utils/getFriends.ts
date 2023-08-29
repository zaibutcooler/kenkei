import { fetcher } from "../db";
import { User } from "../types/db";

const getFriends = async (userID: string) => {
  console.log("useriD", userID);
  const friendIds = (await fetcher(
    "smembers",
    `user:${userID}:friends`
  )) as string[];
  console.log("friend ids", friendIds);

  const friends = await Promise.all(
    friendIds.map(async (friendID) => {
      const friend = (await fetcher("get", `user:${friendID}`)) as string;
      const parsedFriend = JSON.parse(friend) as User;
      return parsedFriend;
    })
  );

  return friends;
};

export default getFriends;
