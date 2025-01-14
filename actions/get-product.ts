'use server';

import { getProduct } from "@/services/get-product";
import { Product } from "@/types/product_type";

interface GetProductActionParams {
  product_id: string;
}

/**
 * Fetches products based on category. If no category is provided, fetches all products.
 * @param {string | undefined} category - The category to filter products by (optional).
 * @returns {Promise<Product>} List of products.
 */
const getProductAction = async ({ product_id }: GetProductActionParams): Promise<string> => {
  try {
    const product: Product | null = await getProduct({ product_id });
    return JSON.stringify(product);
  } catch (error) {
    console.error("Error in getProductsAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getProductAction;
