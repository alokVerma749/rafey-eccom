'use client';

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Menu, X, UserRound } from 'lucide-react';
import { useState } from 'react';

export function AdminHeader() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="p-4 bg-gray-100 shadow-md ">
      <div className="flex justify-between items-center py-1 md:px-20">

        <div className="block md:hidden">
          {menuOpen ? (
            <X className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          ) : (
            <Menu className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <Link href="/" className="text-lg font-bellefair">
          Wonders Tapestry
        </Link>

        <div className="hidden md:flex justify-start items-center space-x-10 text-gray-700">
          <Link href="/shop" className="flex items-center gap-2">Shop</Link>

          {session ? (
            <div className="flex items-center gap-4">
              <button onClick={() => signOut()} className="px-3 py-1 bg-red-500 text-white rounded" > Logout </button>
            </div>
          ) : <button onClick={() => signIn()} className="px-3 py-1 bg-blue-500 text-white rounded" >Login</button>
          }
        </div>
      </div>

      {
        menuOpen && (
          <div className="md:hidden flex flex-col text-gray-700">
            <div className="flex flex-col items-start mt-4">
              <Link
                href="/shop"
                className="text-gray-700 text-base hover:text-gray-200 mt-2"
              >
                Shop
              </Link>
            </div>

            {session ? (
              <>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="text-left hover:text-gray-200 hover:shadow-md my-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center gap-2 hover:underline"
              >
                <UserRound />
                <span>Login</span>
              </button>
            )}
          </div>
        )
      }
    </header >
  );
}
