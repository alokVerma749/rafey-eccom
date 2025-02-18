import Products from '@/models/product_model';
import connect_db from '../config/db';
import { Product } from '@/types/product_type';

interface GetProductParams {
  product_id?: string;
}

export const getProduct = async ({ product_id }: GetProductParams): Promise<Product | null> => {
  await connect_db();

  if (!product_id) {
    console.error("Product ID is required but was not provided.");
    return null;
  }

  try {
    const product = await Products.findById(product_id).populate('tags').populate('subCategories').exec();
    return product as Product | null;
  } catch (error) {
    console.error("Error fetching the product:", error instanceof Error ? error.message : error);
    return null;
  }
};
