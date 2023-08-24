import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db, fetcher } from "./db";
import { User } from "./types/db";

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userExists = (await fetcher("get", `user:${token.id}`)) as string;

      if (!userExists) {
        if (user) {
          token.id = user!.id;
        }
        return token;
      }

      const dbUser = JSON.parse(userExists) as User;

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
