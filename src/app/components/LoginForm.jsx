"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        // email,
        name,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("home");
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-xs mx-auto my-20 md:max-w-md">
      <div className="shadow-lg p-5 rounded-lg border-2 bg-gray-300">
        <h1 className="text-2xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          /> */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder=" Name"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder=" Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            {`Don't have an account?`} <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
