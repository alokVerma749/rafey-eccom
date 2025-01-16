import connect_db from "@/config/db";
import Products from "@/models/product_model";

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get('productId');

    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'Missing required query parameter: productId' }),
        { status: 400 }
      );
    }

    await connect_db();
    const product = await Products.findOne({ _id: productId }).exec();

    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found for the given productId.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Product retrieved successfully', product }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
