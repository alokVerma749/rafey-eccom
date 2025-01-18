import getProductsAction from "@/actions/get-products";
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
      <div>
        <h1>Categories</h1>
        <p>Path: {categories.join(" / ") || "All Categories"}</p>
        <div>
          <div>Number of Products: {products.length}</div>
          <ul className="flex flex-col gap-3">
            {products.map((item) => (
              <Link href={`/product/${item._id}`} key={item._id} className="cursor-pointer">{item.name}</Link>
            ))}
          </ul>
        </div>
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
