'use server';

import { getAllSalesProducts } from "@/services/get-all-sales-products";
import { Product } from "@/types/product_type";

const getSalesProductsAction = async (): Promise<string> => {
  try {
    const products: Product[] | null = await getAllSalesProducts({});
    return JSON.stringify(products);
  } catch (error) {
    console.error("Error in getSalesProductsAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getSalesProductsAction;
