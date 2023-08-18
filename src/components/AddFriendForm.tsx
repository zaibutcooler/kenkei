"use client";

import { useState } from "react";

const AddFriendForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ status: "", message: "" });

  const handleSubmit = (event: React.FormEvent) => {};

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-[450px]">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-green-900">
          Add friend by E-Mail
        </label>
        <div className="mt-2 flex gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="p-2 border rounded-md w-full border-green-50 focus:border-green-100 ring-green-400 focus:bg-green-50 text-sm"
            placeholder="you@example.com"
          />
          <button
            className="p-2 w-28 border rounded-md border-green-800 bg-green-800 text-white hover:bg-white hover:text-green-800"
            type="submit">
            Add
          </button>
        </div>
        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        {success ? (
          <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
        ) : null}
      </form>
    </div>
  );
};

export default AddFriendForm;
