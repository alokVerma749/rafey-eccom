import Products from '@/models/product_model';
import connect_db from '../config/db';
import { Product } from '@/types/product_type';

interface GetProductsParams {
  category?: string;
  limit?: number;
}

export const getProducts = async ({ category, limit }: GetProductsParams): Promise<Product[]> => {
  await connect_db();

  const query = category ? { category } : {};

  try {
    const articlesQuery = Products.find(query);

    if (limit && limit > 0) {
      articlesQuery.limit(limit);
    }

    const articles = await articlesQuery.exec();
    return articles as Product[];
  } catch (error) {
    console.error("Error fetching all articles:", error instanceof Error ? error.message : error);
    return [];
  }
};
