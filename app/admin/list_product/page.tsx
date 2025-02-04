'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import { CircleX } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
  image: string;
  category: string;
  subCategory: string[];
  discount: number;
  variations: string[];
}

export default function ListProductPage() {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<ProductFormValues>({
    defaultValues: {
      tags: [],
      subCategory: [],
    }
  });

  const [categories] = useState<string[]>(['candles', 'ceramic art', 'resin art']);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newSubCategory, setNewSubCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [savedSubCategories, setSavedSubCategories] = useState<string[]>([]); // Track saved subcategories
  const [savedTags, setSavedTags] = useState<string[]>([]); // Track saved tags

  const category = watch('category') || '';

  const addSubCategory = async () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      setSubCategories((prev) => [...prev, newSubCategory]);
      setNewSubCategory('');
    }
    const res = await fetch('/api/admin/sub_category', {
      method: 'POST',
      body: JSON.stringify({ name: newSubCategory, category: watch('category') || '' }),
    });
    console.log(res);
    if (res.ok) {
      setSavedSubCategories((prev) => [...prev, newSubCategory]);
    }
  };

  const addTag = async () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
    }
    const res = await fetch('/api/admin/tags', {
      method: 'POST',
      body: JSON.stringify({ name: newTag, category: watch('category') || '' }),
    });
    console.log(res);
    if (res.ok) {
      setSavedTags((prev) => [...prev, newTag]);
    }
  };

  // TODO: deletion should be only done if tag is not attached to any product else
  const removeSubCategory = async (subCategoryToRemove: string) => {
    const res = await fetch(
      `/api/admin/sub_category?name=${subCategoryToRemove}`,
      {
        method: "DELETE",
        body: JSON.stringify(category)
      }
    );

    if (res.ok) {
      setSubCategories((prev) => prev.filter((subCategory) => subCategory !== subCategoryToRemove));
      setSavedSubCategories((prev) => prev.filter((savedSubCategory) => savedSubCategory !== subCategoryToRemove));
    } else {
      console.error("Failed to delete subcategory");
    }
  };

  const removeTag = async (tagToRemove: string) => {
    try {
      const res = await fetch(`/api/admin/tags?name=${tagToRemove}`, {
        method: 'DELETE',
        body: JSON.stringify(category)
      });

      if (!res.ok) throw new Error("Failed to delete tag");

      setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
      setSavedTags((prev) => prev.filter((savedTag) => savedTag !== tagToRemove));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const formData = {
      ...data,
      tags,
      subCategory: subCategories,
    };

    reset();
    setTags([]);
    setSubCategories([]);
    setSavedSubCategories([]);
    setSavedTags([]);

    const res = await fetch('/api/admin/product', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    console.log(res);
  };

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;
    if (uploadedImageUrl) {
      setValue('image', uploadedImageUrl);
      setImagePreview(uploadedImageUrl);
    } else {
      console.error('Image URL is invalid');
    }
  };

  const handleDelete = () => {
    reset();
    setTags([]);
    setSubCategories([]);
    setSavedSubCategories([]);
    setSavedTags([]);
  };

  return (
    <div className="p-6 shadow-lg w-full">
      <h1 className="text-2xl font-bold mb-6">List Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register('name', { required: 'Name is required' })} placeholder="Product Name" />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register('description', { required: 'Description is required' })} placeholder="Description" />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...register('price', { required: 'Price is required', valueAsNumber: true })} type="number" placeholder="Price" />
              {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" {...register('stock', { required: 'Stock is required', valueAsNumber: true })} type="number" placeholder="Stock" />
              {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
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
            <Label htmlFor="subCategory">Sub-Category</Label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="Add new subcategory"
                className="p-2 w-[90%] border border-gray-300 rounded-md"
              />
              <Button type="button" onClick={addSubCategory}>Add</Button>
            </div>
            <div className="space-y-2 my-2 flex w-full p-2 justify-start gap-2 text-wrap overflow-auto">
              {subCategories.map((subCategory, index) => (
                <div key={index}>
                  {/* Show the subcategory only if it's saved */}
                  {savedSubCategories.includes(subCategory) && (
                    <div className="flex items-center justify-between w-fit">
                      <span className='mx-2'>{subCategory}</span>
                      <div onClick={() => removeSubCategory(subCategory)} className="text-red-500 cursor-pointer">
                        <CircleX size={20} strokeWidth={1.25} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add new tag" />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>

            <div className="space-y-2 my-2 flex w-full p-2 justify-start gap-2 text-wrap overflow-auto">
              {tags.map((tag, index) => (
                <div key={index}>
                  {/* Show the tag only if it's saved */}
                  {savedTags.includes(tag) && (
                    <div className="flex items-center justify-between w-fit">
                      <span>{tag}</span>
                      <div onClick={() => removeTag(tag)} className="text-red-500 cursor-pointer">
                        <CircleX size={20} strokeWidth={1.25} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="discount">Discount</Label>
            <Input id="discount" {...register('discount', { valueAsNumber: true })} type="number" placeholder="Discount" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-full min-h-56 bg-gray-200 rounded flex items-center justify-center">
            {imagePreview ? (
              <Image src={imagePreview} alt="Uploaded Preview" width={800} height={800} className="object-cover rounded-lg" />
            ) : (
              <span className="text-gray-500">No Image Selected</span>
            )}
          </div>

          <div className='flex justify-between flex-col items-center space-x-10'>
            <div className="mt-8">
              <CldUploadButton
                onSuccess={handleImageUpload}
                onClose={() => console.log('Upload widget closed')}
                uploadPreset="mmmgkp-news"
                className='bg-black p-2 text-white rounded-xl my-2'
              />
            </div>
          </div>
          <div className="flex justify-between mt-20 w-[90%] mx-auto">
            <Button variant="destructive" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleDelete}>Delete</Button>
            <Button type="submit" className="py-2 px-4 rounded-lg">Create Product</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
