"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginForm = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user.id ? (
        <button
          onClick={() => signOut()}
          className="w-full md:w-1/2 flex justify-center py-2 rounded-md bg-gray-800 text-green-50 gap-4">
          SignOut
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="w-full md:w-1/2 flex justify-center py-2 rounded-md bg-gray-800 text-green-50 gap-4">
          Continue With Google
        </button>
      )}
    </>
  );
};

export default LoginForm;
