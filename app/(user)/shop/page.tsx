import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';

async function Shop() {
  const response: string = await getProductsAction()
  const products: Product[] = response ? JSON.parse(response as string) : [];
  return (
    <div>
      <div>{products.length}</div>
      {
        products.map((item) => <li key={item._id}>{item.name}</li>)
      }
    </div>
  )
}

export default Shop
