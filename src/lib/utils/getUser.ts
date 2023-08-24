import { User } from "../types/db";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

async function fetchUser(command: string, ...args: (number | string)[]) {
  const commandUrl = `${url}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

const getUser = async (id: string) => {
  try {
    const response = await fetchUser("get", `user:${id}`);
    const result = JSON.parse(response) as User;
    console.log("rs", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
