"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();
  const { state } = useCart();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="p-4 bg-gray-100 shadow-md flex justify-between items-center">
      <Link href='/' className="text-lg font-bellefair">Wonders Tapestry</Link>
      <div className="flex items-center gap-4">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-gray-700"
        >
          <span>Cart</span>
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            {state.items.length}
          </span>
        </Link>

        <Link
          href="/shop"
          className="flex items-center gap-2 text-gray-700"
        >
          Shop
        </Link>

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
