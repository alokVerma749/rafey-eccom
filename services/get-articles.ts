import Products from '@/models/product_model';
import connect_db from '../config/db';
import { Product } from '@/types/product_type';

export const getProducts = async (category?: string): Promise<Product[]> => {
  await connect_db();

  const query = category ? { category } : {}

  try {
    const articles = await Products.find(query).exec();
    return articles as Product[];
  } catch (error) {
    console.error("Error fetching all articles:", error instanceof Error ? error.message : error);
    return [];
  }
};
