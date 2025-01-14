export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}
