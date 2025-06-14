import Products from '@/models/product_model';
import connect_db from '../config/db';
import { Product } from '@/types/product_type';

interface GetProductsParams {
  category?: string;
  limit?: number;
}

export const getAllSalesProducts = async ({ category, limit }: GetProductsParams): Promise<Product[]> => {
  await connect_db();

  const query = category ? { category: category, onSale: true } : { onSale: true };

  try {
    const productsQuery = Products.find(query);

    if (limit && limit > 0) {
      productsQuery.limit(limit);
    }

    const products = await productsQuery.exec();
    return products as Product[];
  } catch (error) {
    console.error("Error fetching all products:", error instanceof Error ? error.message : error);
    return [];
  }
};
