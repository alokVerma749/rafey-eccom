import logo from '@/public/asset/logo.png';
import { Search, Heart, ShoppingCart, UserRound, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

export function PrimaryHeader() {
	return (
		<div
			className="flex justify-between items-center px-20 py-1 shadow-md backdrop-blur-sm">
			<Image src={logo.src} alt="" className="h-12 w-12" height={50} width={50} />
			<div className="flex justify-start items-center space-x-6 text-white">
				<div className="flex items-center space-x-2">
					<Search />
					<span className="ml-1">Search</span>
				</div>
				<Heart />
				<ShoppingCart />
				<UserRound />
				<EllipsisVertical />
			</div>
		</div>
	);
}
