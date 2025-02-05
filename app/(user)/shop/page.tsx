import getProductsAction from '@/actions/get-products';
import ShopFilter from '@/app/components/Shop/ShopFilter';

export default async function Shop() {
  const products = JSON.parse(await getProductsAction({}));
  return <ShopFilter products={products} />;
}
