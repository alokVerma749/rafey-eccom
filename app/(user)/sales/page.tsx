import getSalesProductsAction from "@/actions/sales/get_sales_products";
import { Product } from "@/types/product_type";

export default async function SalesPage() {
  const response = await getSalesProductsAction();
  const products: Product[] = response ? JSON.parse(response as string) : [];

  if (!products) {
    return {
      title: "Product Not Found",
      description: "The requested product was not found.",
    };
  }

  console.log(products);

  return (
    <div>
      <h1>Sales Page</h1>
    </div>
  );
}
