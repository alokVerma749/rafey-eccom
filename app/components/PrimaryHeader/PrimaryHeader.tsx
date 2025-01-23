'use client';

import { useCart } from '@/context/cartContext';
import logo from '@/public/asset/logo.png';
import { Search, ShoppingCart, UserRound, EllipsisVertical, Menu, X } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function PrimaryHeader() {

	const navLinks = ['Candles', 'Ceramic Art', 'Resin Art'];

	const { data: session, status } = useSession();
	const { state } = useCart();
	const [menuOpen, setMenuOpen] = useState(false);

	if (status === "loading") {
		return <div className="text-center p-4">Loading...</div>;
	}

	const toggleMenu = () => setMenuOpen(prev => !prev);

	return (
		<div className="shadow-md backdrop-blur-sm">
			<div className="flex justify-between items-center px-6 py-1 md:px-20">
				<div className="flex items-center space-x-4 md:hidden">
					{menuOpen ? (
						<X className="text-white cursor-pointer" onClick={toggleMenu} />
					) : (
						<Menu className="text-white cursor-pointer" onClick={toggleMenu} />
					)}
				</div>

				<Link href={"/home"}>
					<Image src={logo.src} alt="Logo" className="h-fit" height={50} width={50} />
				</Link>

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
						<div className="flex items-center gap-2">
							<UserRound />
							<span className="hidden md:block">Hi, {session.user?.name}!</span>
							<div className="relative">
								<EllipsisVertical className="cursor-pointer" onClick={toggleMenu} />
								{menuOpen && (
									<div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-black z-50">
										<button
											onClick={() => {
												setMenuOpen(false);
												signOut();
											}}
											className="block px-4 py-2 text-left w-full hover:bg-gray-200"
										>
											Logout
										</button>
									</div>
								)}
							</div>
						</div>
					) : (
						<button
							onClick={() => signIn()}
							className="px-3 py-1 text-white rounded flex items-center gap-2"
						>
							<UserRound />
							<span>Login</span>
						</button>
					)}
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden flex flex-col space-y-2 px-6 py-1 text-white">
					<div className="flex justify-start items-center space-x-2 cursor-pointer hover:text-gray-200 hover:shadow-md">
						<Search size={20}/>
						<span>Search</span>
					</div>

					<div className="flex flex-col items-start md:flex-col md:justify-center gap-x-6"></div>
					{navLinks.map(link => (
						<Link
							key={link}
							href={`/shop/${link.toLowerCase().replace(/\s+/g, '-')}`}
							className="text-white text-base md:text-xl hover:cursor-pointer"
						>
							{link}
						</Link>
					))}
				</div>
			)}

			{menuOpen && (
				<div className="md:hidden flex flex-col items-start gap-y-2 text-white px-6 py-2">
					{session ? (
						<>
							<div className="flex items-center gap-4">
								<span>Hi, {session.user?.name}!</span>
							</div>
							<button
								onClick={() => {
									setMenuOpen(false);
									signOut();
								}}
								className="text-left hover:text-gray-200 hover:shadow-md"
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
		</div>
	);
}
