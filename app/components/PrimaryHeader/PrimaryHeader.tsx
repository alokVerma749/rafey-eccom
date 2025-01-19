'use client';

import { useCart } from '@/context/cartContext';
import logo from '@/public/asset/logo.png';
import { Search, ShoppingCart, UserRound, EllipsisVertical } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function PrimaryHeader() {
	const { data: session, status } = useSession();
	const { state } = useCart();
	const [menuOpen, setMenuOpen] = useState(false);

	if (status === "loading") {
		return <div className="text-center p-4">Loading...</div>;
	}

	const toggleMenu = () => setMenuOpen((prev) => !prev);

	return (
		<div className="flex justify-between items-center px-20 py-1 shadow-md backdrop-blur-sm">
			<Image src={logo.src} alt="Logo" className="h-12 w-12" height={50} width={50} />

			<div className="flex justify-start items-center space-x-10 text-white">
				<div className="flex items-center space-x-2">
					<Search />
					<span className="ml-1">Search</span>
				</div>

				<Link href="/cart" className="relative flex items-center">
					<ShoppingCart />
					{state?.totalQuantity > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
							{state.totalQuantity}
						</span>
					)}
				</Link>

				<Link
          href="/shop"
          className=""
        >
          Shop
        </Link>
				{session ? (
					<div className="flex items-center gap-2">
						<UserRound />
						<span className="hidden md:block">Hi, {session.user?.name}!</span>
						{/* Ellipsis with Dropdown */}
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
	);
}
