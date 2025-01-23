import getProductsAction from "@/actions/get-products";
import ShopCard from "@/app/components/shop/ShopCard";
import { Product } from "@/types/product_type";
import { reverseFormatCategory } from "@/utils/format_string";
import Link from "next/link";

const Page = async ({ params }: any) => {
  const data = await params;
  const categories = data?.category || [];

  try {
    const response: string = await getProductsAction({ category: reverseFormatCategory(categories[0]) });
    let products: Product[] = [];

    if (response) {
      const parsedResponse = JSON.parse(response);
      if (Array.isArray(parsedResponse)) {
        products = parsedResponse as Product[];
      } else {
        console.error("Invalid response format: Not an array", parsedResponse);
      }
    }

    return (

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((item) => (
          <ShopCard key={item._id} item={item} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>An error occurred while fetching products.</p>
      </div>
    );
  }
};

export default Page;
