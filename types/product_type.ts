import { ISubCategory } from "./sub_category";
import { ITag } from "./tag";

export interface Product {
  _id: string;
  name: string;
  description: string;
  weight: string;
  height: string;
  width: string;
  price: number; // Required: The price of the product
  stock: number; // Required: The stock availability
  category: 'candles' | 'ceramic art' | 'resin art'; // Restrict to specific categories
  color?: 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'pink' | 'orange' | 'brown' | 'gray' | 'black' | 'white'; // for ceramic only
  tags?: ITag[]; // Optional: Tags for categorization
  subCategories?: ISubCategory[]; // Optional: Tags for categorization
  [key: string]: any;
  images: string[]; // Required: Array of image URLs
  discount?: {
    percentage: number; // Discount percentage (e.g., 20)
    startDate?: Date; // Optional: Start date of the discount
    endDate?: Date; // Optional: End date of the discount
  };
  onSale: boolean;
  isCustomizable: boolean;
  createdAt: Date; // Required: Date of product creation
  updatedAt: Date; // Required: Date of last update
}
