export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number; // Required: The price of the product
  stock: number; // Required: The stock availability
  category: 'candles' | 'ceramic art' | 'resin art'; // Restrict to specific categories
  color:'red' | 'green' | 'yellow' ;
  tags?: string[]; // Optional: Tags for categorization
  variations?: string[]; // Optional: Variations for items like candles
  images: {
    thumbnail: string; // Required: Small image
    medium: string; // Required: Medium image
    large: string; // Required: High-resolution image
  };
  discount?: {
    percentage: number; // Discount percentage (e.g., 20)
    startDate?: Date; // Optional: Start date of the discount
    endDate?: Date; // Optional: End date of the discount
  };
  createdAt: Date; // Required: Date of product creation
  updatedAt: Date; // Required: Date of last update
}
