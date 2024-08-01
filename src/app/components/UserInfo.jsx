"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="max-w-xs mx-auto my-20 md:max-w-md">
      <div className="shadow-lg p-5 rounded-lg border-2 bg-gray-300">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
