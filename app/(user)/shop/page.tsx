'use client';

import { useState, useEffect } from 'react';
import getProductsAction from '@/actions/get-products';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types/product_type';
import Image from 'next/image';
import Link from 'next/link';
import ShopCard from '@/app/components/Shop/ShopCard';
import { Button } from '@/components/ui/button';
import {X, AlignJustify} from 'lucide-react'
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

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filterData = [
    {
      label: "Fragrance Type",
      name: "fragrance",
      options: ["Lavender", "Rose", "Vanilla", "Jasmine", "Sandalwood"],
    },
    {
      label: "Color",
      name: "color",
      options: ["Red", "Blue", "Green", "Yellow", "Black", "White"],
    },
    {
      label: "Variation",
      name: "variations",
      options: ["Size", "Color", "Fragrance"],
    },
    {
      label: "Category",
      name: "category",
      options: ["candles", "ceramic art", "resin art"],
    },
    {
      label: "Tags",
      name: "tags",
      options: ["New", "Sale", "Hot"],
    },
  ];

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
  };

  return (

    <div className="space-y-6 flex flex-col md:flex-row justify-start relative">
      {/* Mobile Filter Toggle */}
      <div className="block md:hidden">
        <div
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className={`w-full text-center ${isMobileFilterOpen ? 'hidden' : 'block'}`}
        >
          <button className="text-base font-medium">Filter</button>
        </div>
      </div>
    
      {/* Sidebar */}
      <aside
        className={`${
          isMobileFilterOpen ? 'block' : 'hidden'
        } md:block absolute md:relative top-0 left-0 w-full md:w-64 bg-gray-100 p-4 rounded-lg shadow-md space-y-6 z-50 h-fit`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-2xl text-gray-700"
          >
            <X />
          </button>
        </div>
    <p className='text-lg font-medium'>Filter</p>
        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <Slider
            step={10}
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
    
        {/* Dynamic Filters (Category, Color, etc.) */}
        <div>
          {filterData.map(({ label, name, options }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <select
                name={name}
                onChange={(e) =>
                  name === 'category' || name === 'color'
                    ? handleMultiSelectChange(e, name)
                    : handleFilterChange(e)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value=""
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {(filters[name as keyof typeof filters] as string[])?.map((selected) => (
                  <span
                    key={selected}
                    className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center"
                  >
                    {selected}
                    <button
                      type="button"
                      className="ml-1 text-white hover:text-gray-300"
                      onClick={() => removeSelectedFilter(name, selected)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    
      {/* Product Grid */}
        <ShopCard filteredProducts={filteredProducts} />
    </div>
    

  );
}

export default Shop;
