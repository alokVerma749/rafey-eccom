import getProductsAction from "@/actions/get-products";
import { Product } from "@/types/product_type";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

import { TabArea } from "./TabArea";

async function Section3() {
	const response: string = await getProductsAction({
		category: "candles",
		limit: 4,
	});
	const products: Product[] = response ? JSON.parse(response) : [];

	return (
		<Tabs defaultValue="candle" className="w-full px-20 p-10 h-[80vh]">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="candle">Candles</TabsTrigger>
				<TabsTrigger value="ceramic">Ceramic Art</TabsTrigger>
				<TabsTrigger value="resin">Resin Art</TabsTrigger>
			</TabsList>
			<TabsContent value="candle" className="w-full h-full">
				<TabArea cardDetail={products[0]} />
			</TabsContent>
			<TabsContent value="ceramic" className="w-full h-full">
				<TabArea cardDetail={products[0]} />
			</TabsContent>

			<TabsContent value="resin" className="w-full h-full">
				<TabArea cardDetail={products[0]} />
			</TabsContent>
		</Tabs>
	);
}

export default Section3;