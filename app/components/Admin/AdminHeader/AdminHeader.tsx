'use client';

import { useState } from 'react';
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Menu, X, UserRound } from 'lucide-react';
import Loader from "@/app/components/Loader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommandDialogSearch } from '../../Search';

export function AdminHeader() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return <div><Loader /></div>;
  }

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="p-2 bg-gray-100 shadow-md ">
      <div className="flex justify-between items-center py-1 md:px-20">

        <Link href="/" className="sm:text-2xl text-xl font-marcellus my-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>
        
        <div className="block md:hidden">
          {menuOpen ? (
            <X className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          ) : (
            <Menu className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <div className="hidden md:flex justify-start items-center space-x-10 text-gray-700">
          <Link href="/shop" className="flex items-center gap-2">Shop</Link>
          <CommandDialogSearch />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none"><UserRound /></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
