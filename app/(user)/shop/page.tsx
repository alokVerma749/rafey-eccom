'use client';

import { useState, useEffect } from 'react';
import getProductsAction from '@/actions/get-products';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types/product_type';
import Image from 'next/image';
import Link from 'next/link';

function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    price: number[];
    stock: string;
    category: string[];
    tags: string[];
    variations: string[];
    inStock: boolean;
    fragrance: string[];
    color: string[];
  }>({
    price: [0],
    stock: '',
    category: [],
    tags: [],
    variations: [],
    inStock: true,
    fragrance: [] as string[],
    color: [] as string[],
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
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

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

    if (name === 'tags') {
      const tagFilters = filters.tags.includes(value)
        ? filters.tags.filter((tag) => tag !== value)
        : [...filters.tags, value];
      setFilters((prev) => ({ ...prev, tags: tagFilters }));
      filtered = filtered.filter((product) =>
        tagFilters.every((tag) => product.tags?.includes(tag))
      );
    }

    if (name === 'variations') {
      const variationFilters = filters.variations.includes(value)
        ? filters.variations.filter((variation) => variation !== value)
        : [...filters.variations, value];
      setFilters((prev) => ({ ...prev, variations: variationFilters }));
      filtered = filtered.filter((product) =>
        variationFilters.every((variation) => product.variations?.includes(variation))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleMultiSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterName: keyof typeof filters
  ) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilterValues = Array.isArray(prev[filterName]) && prev[filterName].includes(value)
        ? (prev[filterName] as string[]).filter((item) => item !== value)
        : [...(prev[filterName] as string[]), value];

      let filtered = products;

      if (filterName === 'category') {
        if (newFilterValues.length > 0) {
          filtered = filtered.filter((product) =>
            newFilterValues.includes(product.category)
          );
        }
      }

      if (filterName === 'color') {
        if (newFilterValues.length > 0) {
          filtered = filtered.filter((product) =>
            newFilterValues.includes(product.color)
          );
        }
      }

      if (prev.inStock) {
        filtered = filtered.filter((product) => product.stock > 0);
      }

      setFilteredProducts(filtered);
      return { ...prev, [filterName]: newFilterValues };
    });
  };

  const removeSelectedFilter = (name: string, value: string) => {
    setFilters((prev) => {
      const currentFilter = prev[name as keyof typeof filters];
      const updatedFilters = Array.isArray(currentFilter)
        ? currentFilter.filter((item: string | number) => item !== value)
        : currentFilter;

      return { ...prev, [name]: updatedFilters };
    });
    setFilters((prev) => {
      let filtered = products;
  
      if (prev.inStock) {
        filtered = filtered.filter((product) => product.stock > 0);
      }
  
      if (prev.category.length > 0) {
        filtered = filtered.filter((product) => prev.category.includes(product.category));
      }
  
      setFilteredProducts(filtered);
      return prev;
    });
  };


  return (
    <div className="p-6 space-y-6 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        {/* Max Price */}
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
        {/* In Stock */}
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
        {/* Fragrance Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fragrance Type</label>
          <select
            name="fragrance"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={''}
          >
            <option value="">Select Fragrance</option>
            {['Lavender', 'Rose', 'Vanilla', 'Jasmine', 'Sandalwood'].map((fragrance) => (
              <option key={fragrance} value={fragrance.toLowerCase()}>
                {fragrance}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.fragrance.map((fr) => (
              <span
                key={fr}
                className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
              >
                {fr}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={() => removeSelectedFilter('fragrance', fr)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Color Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <select
            name="color"
            onChange={(e) => handleMultiSelectChange(e, 'color')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={''}
          >
            <option value="">Select Color</option>
            {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map((color) => (
              <option key={color} value={color.toLowerCase()}>
                {color}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.color.map((col) => (
              <span
                key={col}
                className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
              >
                {col}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={() => removeSelectedFilter('color', col)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Select Variation</label>
          <select
            name="variations"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={''}
          >
            <option value="">Select Variation</option>
            {['Size', 'Color', 'Fragrance'].map((variation) => (
              <option key={variation} value={variation.toLowerCase()}>
                {variation}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 mt-2">
            {filters.variations.map((variation) => (
              <span
                key={variation}
                className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
              >
                {variation}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={() => removeSelectedFilter('variations', variation)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Category Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            onChange={(e) => handleMultiSelectChange(e, 'category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={''}
          >
            <option value="">Select Category</option>
            {['candles', 'ceramic art', 'resin art'].map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.category.map((cat) => (
              <span
                key={cat}
                className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
              >
                {cat}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={() => removeSelectedFilter('category', cat)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Tags Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <select
            name="tags"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={''}
          >
            <option value="">Select Tags</option>
            {['New', 'Sale', 'Hot'].map((tag) => (
              <option key={tag} value={tag.toLowerCase()}>
                {tag}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-gray-300"
                  onClick={() => removeSelectedFilter('tags', tag)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            const discountPercentage = item.discount?.percentage || 0;
            return (
              <Link href={`/product/${item._id}`} key={item._id} className="bg-white rounded mb-4">
                <Image
                  height={200}
                  width={200}
                  src={item.images.thumbnail}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-sm text-gray-600">{item.name}</h3>
                {discountPercentage > 0 && (
                  <div className="flex justify-start items-center gap-x-4 font-medium">
                    <p className='text-base font-semibold text-green-600'> ${(item.price - (item.price * discountPercentage) / 100).toFixed(2)}</p>
                    <p className="font-semibold text-black text-sm line-through">${item.price}</p>
                    <p className="text-green-600 text-sm">{discountPercentage} % OFF</p>
                  </div>
                )}
                <p className="text-sm text-gray-400">{item.category}</p>
              </Link>
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

