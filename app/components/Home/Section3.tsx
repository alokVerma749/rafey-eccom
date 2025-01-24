'use client';

import getProductsAction from "@/actions/get-products";
import { Product } from "@/types/product_type";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabArea } from "./TabArea";
import { useEffect, useState } from "react";

function Section3() {
  const [category, setCategory] = useState("candles");
  const [products, setProducts] = useState<Product[]>([]);

	async function fetchProducts() {
		const response: string = await getProductsAction({
			category,
			limit: 4,
		});
		const parsedProducts: Product[] = response ? JSON.parse(response) : [];
		setProducts(parsedProducts);
	}

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <Tabs defaultValue="candles" className="hidden md:block w-full p-10 h-[80vh]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="candles" onClick={() => setCategory("candles")}>
          Candles
        </TabsTrigger>
        <TabsTrigger value="ceramic" onClick={() => setCategory("ceramic art")}>
          Ceramic Art
        </TabsTrigger>
        <TabsTrigger value="resin" onClick={() => setCategory("resin art")}>
          Resin Art
        </TabsTrigger>
      </TabsList>

      <TabsContent value="candles" className="w-full h-full">
        {products[0] && <TabArea cardDetail={products} />}
      </TabsContent>

      <TabsContent value="ceramic" className="w-full h-full">
        {products[0] && <TabArea cardDetail={products} />}
      </TabsContent>

      <TabsContent value="resin" className="w-full h-full">
        {products[0] && <TabArea cardDetail={products} />}
      </TabsContent>
    </Tabs>
  );
}

export default Section3;
