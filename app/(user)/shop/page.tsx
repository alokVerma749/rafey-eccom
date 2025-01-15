'use client';

import getProductsAction from '@/actions/get-products';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types/product_type';
import { useState, useEffect } from 'react';

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    price: [0],
    stock: '',
    category: '',
    tags: '',
    variations: '',
    inStock: true,
  });

  useEffect(() => {
    async function fetchProducts() {
      const response: string = await getProductsAction({});
      const productsData: Product[] = response ? JSON.parse(response as string) : [];
      setProducts(productsData);
      setFilteredProducts(productsData);
    }
    fetchProducts();
  }, []);

  const handleSliderChange = (values: number[]) => {
    setFilters((prev) => ({ ...prev, price: values }));

    const filtered = products.filter((product) => product.price <= values[0]);
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value;

    setFilters((prev) => ({ ...prev, [name]: newValue }));

    let filtered = products;

    if (name === 'inStock') {
      filtered = newValue
        ? filtered.filter((product) => product.stock > 0)
        : products;
    }

    if (filters.inStock && name !== 'inStock') {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    if (name === 'stock' && value) {
      filtered = filtered.filter((product) => product.stock >= parseInt(value));
    }

    if (name === 'category' && value) {
      filtered = filtered.filter((product) => product.category === value);
    }

    if (name === 'tags' && value) {
      filtered = filtered.filter((product) => product.tags?.includes(value));
    }

    if (name === 'variations' && value) {
      filtered = filtered.filter((product) => product.variations?.includes(value));
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Price</label>
            <Slider
              step={100}
              min={50}
              max={6000}
              onValueChange={handleSliderChange}
            />
            <div className="text-center mt-2 text-sm text-gray-500">
              Current Price: ${filters.price[0]}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">In Stock</label>
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
              className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              <option value="candles">Candles</option>
              <option value="ceramic art">Ceramic Art</option>
              <option value="resin art">Resin Art</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              value={filters.tags}
              onChange={handleFilterChange}
              placeholder="Enter tag"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const discountPercentage = item.discount?.percentage || 0;
            return (
              <div key={item._id} className="bg-white rounded-lg shadow p-4 space-y-2">
                <img
                  src={item.images.thumbnail}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm font-medium">Price: ${item.price}</p>
                <p className="text-sm font-medium">Stock: {item.stock}</p>
                {discountPercentage > 0 && (
                  <p className="text-sm text-green-500">Discount: {discountPercentage}%</p>
                )}
                <p className="text-sm text-gray-400">Category: {item.category}</p>
                <a
                  href={`/${item._id}`}
                  className="block mt-2 text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  View Details
                </a>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Shop;
