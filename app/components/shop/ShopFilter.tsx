'use client';

import getProductsAction from '@/actions/get-products';
import ShopCard from '@/app/components/shop/ShopCard';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types/product_type';

import { useState, useEffect } from 'react';

function ShopFilter() {
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

    // Multi-select for fragrance
    if (name === 'fragrance') {
      const fragranceFilters = filters.fragrance.includes(value)
        ? filters.fragrance.filter((fr) => fr !== value)
        : [...filters.fragrance, value];

      setFilters((prev) => ({ ...prev, fragrance: fragranceFilters }));
      filtered = filtered.filter((product) =>
        fragranceFilters.every((fr) =>
          product.variations?.some((variation) =>
            variation.toLowerCase().includes(fr.toLowerCase())
          )
        )
      );
    }

    // Multi-select for color
    if (name === 'color') {
      const colorFilters = filters.color.includes(value)
        ? filters.color.filter((col) => col !== value)
        : [...filters.color, value];

      setFilters((prev) => ({ ...prev, color: colorFilters }));
      filtered = filtered.filter((product) =>
        colorFilters.every((col) => product.variations?.includes(col))
      );
    }

    // Multi-select for category
    if (name === 'category') {
      const categoryFilters = filters.category.includes(value)
        ? filters.category.filter((cat) => cat !== value)
        : [...filters.category, value];

      setFilters((prev) => ({ ...prev, category: categoryFilters }));
      filtered = filtered.filter((product) =>
        categoryFilters.includes(product.category)
      );
    }

    // Multi-select for tags
    if (name === 'tags') {
      const tagFilters = filters.tags.includes(value)
        ? filters.tags.filter((tag) => tag !== value)
        : [...filters.tags, value];

      setFilters((prev) => ({ ...prev, tags: tagFilters }));
      filtered = filtered.filter((product) =>
        tagFilters.every((tag) => product.tags?.includes(tag))
      );
    }

    // Multi-select for variations
    if (name === 'variations') {
      const variationFilters = filters.variations.includes(value)
        ? filters.variations.filter((variation) => variation !== value)
        : [...filters.variations, value];

      setFilters((prev) => ({ ...prev, variations: variationFilters }));
      filtered = filtered.filter((product) =>
        variationFilters.every((variation) => product.variations?.includes(variation))
      );
    }

    if (name === 'variations' && value) {
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

  const removeSelectedFilter = (name: string, value: string) => {
    const currentFilter = filters[name as keyof typeof filters];
    const updatedFilters = Array.isArray(currentFilter)
      ? currentFilter.filter((item: string | number) => item !== value)
      : currentFilter;

    setFilters((prev) => ({ ...prev, [name]: updatedFilters }));
  };
  return (
    <div>
      <aside className="p-4 rounded-lg space-y-6 flex gap-x-6 w-full">
        {/* Max Price */}
        <div className='w-1/5'>
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
        <div className='flex justify-start space-x-4 w-1/5'>
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
        <div className='w-1/5'>
          {/* <label className="block text-sm font-medium text-gray-700">Fragrance Type</label> */}
          <select
            name="fragrance"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className='w-1/5'>
          {/* <label className="block text-sm font-medium text-gray-700">Color</label> */}
          <select
            name="color"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Tags Multi-Select */}
        <div className='w-1/6'>
          {/* <label className="block text-sm font-medium text-gray-700">Tags</label> */}
          <select
            name="tags"
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
      
    </div>
  )
}

export default ShopFilter
