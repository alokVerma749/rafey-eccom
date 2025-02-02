'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
  image: string;
  category: string;
  subCategory: string;
  discount: number;
  variations: string[];
}

export default function ListProductPage() {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProductFormValues>();
  const [categories] = useState<string[]>(['candles', 'ceramic art', 'resin art']);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newSubCategory, setNewSubCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addSubCategory = async () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      setSubCategories((prev) => [...prev, newSubCategory]);
      setNewSubCategory('');
    }

    const res = await fetch('/api/subcategory', {
      method: 'POST',
      body: JSON.stringify({ name: newSubCategory, category: watch('category') || '' }),
    });

    console.log(res);
  };

  const addTag = async () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
    }

    const res = await fetch('/api/tags', {
      method: 'POST',
      body: JSON.stringify({ name: newTag }),
    });

    console.log(res);
  };

  const removeSubCategory = (subCategoryToRemove: string) => {
    setSubCategories((prev) => prev.filter((subCategory) => subCategory !== subCategoryToRemove));
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const formData = {
      ...data,
      tags,
      subCategory: watch('subCategory') || '',
    };

    reset();
    setTags([]);
    setSubCategories([]);

    const res = await fetch('/api/product', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    console.log(res);
  };


  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;
    if (!uploadedImageUrl) {
      console.error('Failed to upload image.');
      return;
    }
    setValue('image', uploadedImageUrl);
    setImagePreview(uploadedImageUrl);
  };

  return (
    <div className="p-6 shadow-lg w-full">
      <h1 className="text-2xl font-bold mb-6">List Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <input
            {...register('description', { required: 'Description is required' })}
            type="text"
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        <div>
          <input
            {...register('price', { required: 'Price is required', valueAsNumber: true })}
            type="number"
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-md"
            defaultValue={0}
          />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        <div>
          <input
            {...register('stock', { required: 'Stock is required', valueAsNumber: true })}
            type="number"
            placeholder="Stock"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
        </div>

        <div>
          <input
            {...register('image', { required: 'Images URL is required' })}
            type="text"
            placeholder="Images"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Upload Image</label>
          <CldUploadButton
            onSuccess={handleImageUpload} // For handling upload success
            onClose={() => console.log('Upload widget closed')} // Triggered when "Done" is clicked
            uploadPreset="mmmgkp-news"
          >
            <div className="cursor-pointer bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Upload Image
            </div>
          </CldUploadButton>

          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
                width={800}
                height={400}
              />
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Tags</h4>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="p-2 w-[90%] border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 text-white p-2 text-sm rounded-md hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>
          <div className="space-y-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Category</h4>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-red-500">{errors.category.message}</span>}
        </div>

        <div>
          <h4 className="font-semibold mb-2">Sub-Categories</h4>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Add new subcategory"
              className="p-2 w-[90%] border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={addSubCategory}
              className="bg-green-500 text-white text-sm py-2 px-4 rounded-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {subCategories.map((subCategory, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{subCategory}</span>
                <button
                  type="button"
                  onClick={() => removeSubCategory(subCategory)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <input
            {...register('discount', { valueAsNumber: true })}
            type="number"
            placeholder="Discount"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
