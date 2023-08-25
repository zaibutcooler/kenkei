import { fetcher } from "../db";
import { Message } from "../types/types";

const getMessages = async (chatID: string) => {
  try {
    const results: string[] = await fetcher(
      "zrange",
      `chat:${chatID}:messages`,
      0,
      -1
    );

    const rawMessages = results.map(
      (message) => JSON.parse(message) as Message
    );

    const messages = rawMessages.reverse();

    return messages;
  } catch (err) {
    console.log("get message err", err);
  }
};

export default getMessages;
