import getProductsAction from '@/actions/get-products';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let allProducts: any[] = [];

  try {
    const response = await getProductsAction({});
    const products = typeof response === 'string' ? JSON.parse(response) : response;
    allProducts = Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `https://www.wonderstapestry.com/product/${product._id}`,
    lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const staticPaths = [
    "/",
    "/sales",
    "/shop",
    "/shop/ceramic_art",
    "/shop/candles",
    "/shop/resin_art",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `https://www.wonderstapestry.com${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: path === "/" ? 1 : 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
