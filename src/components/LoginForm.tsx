"use client";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="w-full md:w-1/2 text-center py-2 rounded-md bg-gray-800 text-green-50 flex gap-4">
      Continue With Google
    </button>
  );
};

export default LoginForm;
