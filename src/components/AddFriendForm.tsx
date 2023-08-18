"use client";

import { useState } from "react";

const AddFriendForm = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ status: "", message: "" });

  const handleSubmit = (event: React.FormEvent) => {};

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900">
          Add friend by E-Mail
        </label>

        <div className="mt-2 flex gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
          <button type="submit">Add</button>
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
