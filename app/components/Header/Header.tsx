'use client';

import { useSession, signOut, signIn } from "next-auth/react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { Menu, X, ShoppingCart, UserRound } from 'lucide-react';
import { useState } from 'react';
import Loader from "../Loader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { CommandDialogSearch } from "../Search";

export function Header() {
  const { data: session, status } = useSession();
  const { state } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return <div><Loader /></div>;
  }

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className="p-2 bg-gray-100 shadow-md ">
      <div className="flex justify-between items-center py-1 md:px-20">

        <div className="block md:hidden">
          {menuOpen ? (
            <X className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          ) : (
            <Menu className="text-gray-700 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <Link href="/" className="sm:text-2xl text-xl font-bellefair my-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>

        <div className="flex items-center gap-4 md:hidden mr-2">
          <Link
            href="/cart"
            className="relative flex items-center text-gray-700"
          >
            <ShoppingCart />
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
                {state.items.length}
              </span>
            )}
          </Link>
        </div>


        <div className="hidden md:flex justify-start items-center space-x-10 text-gray-700">
          <Link
            href="/shop"
            className="flex items-center gap-2"
          >
            Shop
          </Link>
          <div className="flex items-center space-x-2">
            <CommandDialogSearch />
          </div>
          <Link
            href="/cart"
            className="relative flex items-center gap-2"
          >
            <ShoppingCart />
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {state.items.length}
              </span>
            )}
          </Link>


          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none"><UserRound /></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{session.user?.name}</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer"><Link href={"#"}>Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : <button onClick={() => signIn()} className="px-3 py-1 rounded" >Login</button>
          }
        </div>

      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col text-gray-700">


          {session ? (
            <>
              <div className="flex items-center my-2">
                <span>{session.user?.name}!</span>
              </div>
              <Separator />
              <Link
                href="/profile"
                className="text-left hover:text-gray-200 hover:shadow-md my-1"
              >
                Profile
              </Link>
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
      )}

    </header>
  );
}
