import getProductsAction from '@/actions/get-products';
import { Product } from '@/types/product_type';
import Link from 'next/link';

async function Shop() {
  const response: string = await getProductsAction()
  const products: Product[] = response ? JSON.parse(response as string) : [];
  return (
    <div>
      <Link href='/shop/candles'>Candles</Link>
      <Link href='/shop/ceramic_art'>Ceramic Arts</Link>
      <Link href='/shop/resin_art'>Resin Arts</Link>
      <div>{products.length}</div>
      {
        products.map((item) => <li key={item._id}>{item.name}</li>)
      }
    </div>
  )
}

export default Shop
