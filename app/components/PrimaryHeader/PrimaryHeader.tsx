'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Search, ShoppingCart, UserRound, Menu, X } from 'lucide-react';
import Loader from "@/app/components/Loader";
import { useCart } from '@/context/cartContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";

export function PrimaryHeader() {

	const navLinks = ['Candles', 'Ceramic Art', 'Resin Art'];

	const { data: session, status } = useSession();
	const { state } = useCart();
	const [menuOpen, setMenuOpen] = useState(false);

	if (status === "loading") {
		return <div className="text-center p-4"><Loader /></div>;
	}

	const toggleMenu = () => setMenuOpen(prev => !prev);

	return (
		<div className="shadow-md">
			<div className="flex justify-between items-center px-6 py-1 md:px-20 bg-transparent backdrop-blur-lg">
				<div className="flex items-center space-x-4 md:hidden">
					{menuOpen ? (
						<X className="text-white cursor-pointer" onClick={toggleMenu} />
					) : (
						<Menu className="text-white cursor-pointer" onClick={toggleMenu} />
					)}
				</div>

				<Link href="/" className="sm:text-2xl text-xl font-bellefair my-auto text-white font-semibold text-start sm:py-2">Wonders Tapestry</Link>

				<div className="flex items-center space-x-4 md:hidden">
					<Link href="/cart" className="relative flex items-center text-white hover:text-gray-200">
						<ShoppingCart />
						{state?.items.length > 0 ? (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
								{state?.items.length}
							</span>
						) : null}
					</Link>
				</div>

				<div className="hidden md:flex justify-start items-center space-x-10 text-white">
					<div className="flex items-center space-x-2">
						<Search />
						<span className="ml-1">Search</span>
					</div>

					<Link href="/cart" className="relative flex items-center">
						<ShoppingCart />
						{state?.items.length > 0 ? (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
								{state?.items.length}
							</span>
						) : null}
					</Link>
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="focus:outline-none"><UserRound /></DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>{session.user?.name}</DropdownMenuItem>
								<Separator />
								<DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
								<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : <button onClick={() => signIn()} className="px-3 py-1 rounded text-white" >Login</button>
					}
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden flex flex-col px-6 text-white">
					<div className="flex justify-start items-center space-x-2 cursor-pointer hover:text-gray-200 hover:shadow-md mt-1">
						<Search size={16} />
						<span className='text-base'>Search</span>
					</div>

					<div className="flex flex-col items-start md:flex-col justify-center gap-x-6"></div>
					{navLinks.map(link => (
						<Link
							key={link}
							href={`/shop/${link.toLowerCase().replace(/\s+/g, '-')}`}
							className="text-white text-base hover:cursor-pointer mt-1"
						>
							{link}
						</Link>
					))}
				</div>
			)}

			{menuOpen && (
				<div className="md:hidden flex flex-col items-start text-black px-6 text-base">
					{session ? (
						<>
							<div className="flex items-center mt-1">
								<span>Hi, {session.user?.name}!</span>
							</div>
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
							className="flex items-center text-white gap-2 hover:underline"
						>
							<UserRound />
							<span>Login</span>
						</button>
					)}
				</div>
			)}
		</div>
	);
}
