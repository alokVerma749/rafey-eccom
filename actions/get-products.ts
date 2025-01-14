'use server';

import { getProducts } from "@/services/get-products";
import { Product } from "@/types/product_type";

const VALID_CATEGORIES = ['candles', 'ceramic art', 'resin art'] as const;
type ValidCategory = (typeof VALID_CATEGORIES)[number];

interface GetProductsActionParams {
  category?: string;
  limit?: number;
}

/**
 * Fetches products based on category. If no category is provided, fetches all products.
 * @param {string | undefined} category - The category to filter products by (optional).
 * @returns {Promise<Product[]>} List of products.
 */
const getProductsAction = async ({ category, limit }: GetProductsActionParams): Promise<string> => {
  try {
    let validCategory: ValidCategory | undefined;

    if (category) {
      if (VALID_CATEGORIES.includes(category as ValidCategory)) {
        validCategory = category as ValidCategory;
      } else {
        return JSON.stringify({
          error: `Invalid category: '${category}'. Valid categories are ${VALID_CATEGORIES.join(', ')}.`,
        });
      }
    }

    const products: Product[] = await getProducts({ category, limit });
    return JSON.stringify(products);
  } catch (error) {
    console.error("Error in getProductsAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getProductsAction;
