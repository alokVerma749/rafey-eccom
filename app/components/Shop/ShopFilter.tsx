'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types/product_type';
import ShopCard from '@/app/components/Shop/ShopCard';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterProps {
   products: Product[];
}

interface staticFilters {
   price: number;
   inStock: boolean;
   [key: string]: any;
}

const initialStaticFiltersValue = {
   price: 500,
   inStock: true,
}

const initialDynamicFiltersValue = [
   {
      label: 'Category',
      name: 'category',
      options: ['candles', 'ceramic art', 'resin art'],
   },
   {
      label: 'Sub Category',
      name: 'sub-category',
      options: [],
   },
   {
      label: 'Tags',
      name: 'tags',
      options: [],
   },
]

const fetchTagsAndSubCategories = async () => {
   const tagsRes = await fetch('/api/tags');
   const tagsData = await tagsRes.json();

   const subCategoriesRes = await fetch('/api/sub_category');
   const subCategoriesData = await subCategoriesRes.json();

   return {
      tags: Array.isArray(tagsData.tags) ? tagsData.tags : [],
      subCategories: Array.isArray(subCategoriesData.subCategories) ? subCategoriesData.subCategories : [],
   };
};

const ShopFilter = ({ products }: FilterProps) => {
   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
   const [filters, setFilters] = useState<staticFilters>(initialStaticFiltersValue);
   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
   const [filtersConfig, setFiltersConfig] = useState(initialDynamicFiltersValue);
   useEffect(() => {
      const loadFilters = async () => {
         const { tags, subCategories } = await fetchTagsAndSubCategories();

         setFiltersConfig((prevConfig) =>
            prevConfig.map((filter) => {
               if (filter.name === 'tags') {
                  return { ...filter, options: Array.isArray(tags) ? tags.map(tag => tag.name) : [] };
               }
               if (filter.name === 'sub-category') {
                  return { ...filter, options: Array.isArray(subCategories) ? subCategories.map(sub => sub.name) : [] };
               }
               return filter;
            })
         );
      };

      loadFilters();
   }, []);

   // Function to apply the filters
   const applyFilters = () => {
      let filtered = products;

      // Filter by price
      if (filters.price) {
         filtered = filtered.filter((product) => product.price <= filters.price);
      }

      // Filter by stock availability
      if (filters.inStock) {
         filtered = filtered.filter((product) => product.stock > 0);
      }

      // Apply dynamic filters
      filtersConfig.forEach(({ name }) => {
         if (filters[name]?.length > 0) {
            filtered = filtered.filter((product) => {
               const productValue = product[name];
               if (!productValue) {
                  return false;
               }

               if (Array.isArray(productValue)) {
                  return filters[name].some((option: string) => productValue.includes(option));
               } else if (typeof productValue === 'string') {
                  return filters[name].some((option: string) => productValue.toLowerCase() === option.toLowerCase());
               } else if (typeof productValue === 'object') {
                  return filters[name].some((option: string) => productValue.name?.toLowerCase() === option.toLowerCase());
               }
               return false;
            });
         }
      });

      setFilteredProducts(filtered);
   };

   // Reapply filters whenever they change
   useEffect(() => {
      applyFilters();
   }, [filters, products]);

   // Handlers for filters
   const handleSliderChange = (values: number[]) => {
      setFilters((prev) => ({ ...prev, price: values[0] }));
   };

   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFilters((prev) => ({ ...prev, [name]: checked }));
   };

   const handleMultiSelectChange = (
      e: React.ChangeEvent<HTMLSelectElement>,
      filterName: string
   ) => {
      const value = e.target.value;
      if (value) {
         setFilters((prev) => {
            const currentValues = prev[filterName] || [];
            const updatedValues = currentValues.includes(value)
               ? currentValues.filter((item: string) => item !== value)
               : [...currentValues, value];
            return { ...prev, [filterName]: updatedValues };
         });
      }
   };

   const removeSelectedFilter = (name: string, value: string) => {
      setFilters((prev) => ({
         ...prev,
         [name]: prev[name].filter((item: string) => item !== value),
      }));
   };

   return (
      <div className="flex flex-col">
         {/* Mobile Filter Button - Positioned Below Navbar */}
         <div className="md:hidden fixed  top-[auto] left-0 right-0 z-0 bg-white flex justify-end">
            <button
               onClick={() => setIsMobileFilterOpen(true)}
               className="bg-white text-black px-2 py-2 rounded-md flex items-center gap-2"
            >
               <SlidersHorizontal />
               Filters
            </button>
         </div>

         <div className="flex">
            {/* Sidebar */}
            <aside
               className={`fixed h-full overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out
             ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
             md:translate-x-0 md:w-64 md:block`}
            >
               <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Filter</p>
                  {/* Close Button for Mobile */}
                  <button
                     onClick={() => setIsMobileFilterOpen(false)}
                     className="md:hidden text-gray-500 hover:text-gray-700"
                  >
                     <X />
                  </button>
               </div>

               {/* Max Price */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Max Price
                  </label>
                  <Slider
                     step={5}
                     min={1}
                     max={1000}
                     defaultValue={[500]}
                     onValueChange={handleSliderChange}
                  />
                  <div className="text-center mt-2 text-sm text-gray-500">
                     Current Price: ₹{filters.price}
                  </div>
               </div>

               {/* In Stock */}
               <div className="flex gap-2 items-center">
                  <label className="block text-sm font-medium text-gray-700">
                     In Stock:{' '}
                  </label>
                  <input
                     type="checkbox"
                     name="inStock"
                     checked={filters.inStock}
                     onChange={handleCheckboxChange}
                     className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
               </div>

               {/* Dynamic Filters */}
               {filtersConfig.map(({ label, name, options }) => (
                  <div key={name} className="mb-4">
                     <label className="block text-sm font-medium text-gray-700">{label}</label>
                     <select
                        onChange={(e) => handleMultiSelectChange(e, name)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value=""
                     >
                        <option value="">Select {label}</option>
                        {options?.map((option) => (
                           <option key={option} value={option.toLowerCase()}>
                              {option}
                           </option>
                        ))}
                     </select>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {(filters[name] || []).map((selected: string) => (
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
            </aside>

            {/* Product Grid */}
            <div className="ml-0 md:ml-64 w-full p-4 overflow-y-auto mt-16 md:mt-0">
               <ShopCard filteredProducts={filteredProducts} />
            </div>
         </div>
      </div>
   );
};

export default ShopFilter;