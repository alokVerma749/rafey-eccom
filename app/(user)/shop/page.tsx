import getProductsAction from '@/actions/get-products';
import ShopFilter from '@/app/components/Shop/ShopFilter';

export default async function Shop() {
  const products = JSON.parse(await getProductsAction({}));

  const filtersConfig = [
    {
      label: 'Fragrance Type',
      name: 'fragrance',
      options: ['Lavender', 'Rose', 'Vanilla', 'Jasmine', 'Sandalwood'],
    },
    {
      label: 'Color',
      name: 'color',
      options: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'],
    },
    {
      label: 'Category',
      name: 'category',
      options: ['candles', 'ceramic art', 'resin art'],
    },
    {
      label: 'Tags',
      name: 'tags',
      options: ['New', 'Sale', 'Hot'],
    },
  ];

  return <ShopFilter products={products} filtersConfig={filtersConfig} />;
}
