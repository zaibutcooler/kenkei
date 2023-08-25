import Image from "next/image";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}
