"use client";

import { useSession, signOut, signIn } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Optionally show a loading indicator
  }

  return (
    <header className="p-4 bg-gray-100 shadow-md flex justify-between items-center">
      <h1 className="text-lg font-bellefair">Wonders Tapestry</h1>
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="font-poppins">Welcome, {session.user?.name}!</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
