'use client'

import { useState } from "react";
import Image from "next/image";
import { CldUploadButton } from 'next-cloudinary';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { Product } from "@/types/product_type";

function ProductDetail({ product }: { product: Product }) {
  const [formData, setFormData] = useState({
    id: product._id || '',
    name: product?.name || "",
    description: product?.description || "",
    height: product?.height || "",
    width: product?.width || "",
    weight: product?.weight || "",
    fragrance: product?.fragrance || "",
    category: product?.category || "",
    stock: product?.stock || 0,
    price: product?.price || 0,
    onSale: product?.onSale || false,
    discount: {
      percentage: product?.discount?.percentage || 0,
      startDate: product?.discount?.startDate || new Date(),
      endDate: product?.discount?.endDate || null,
    },
    image: product?.images?.large || "",
  });

  const discountedPrice = formData.price - (formData.price * (formData.discount.percentage ?? 0)) / 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/product`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;
    if (uploadedImageUrl) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImageUrl,
      }));
    } else {
      console.error('Image URL is invalid');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-lg">
      {/* Left Section */}
      <div className="space-y-4">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" type="text" value={formData.name} onChange={handleChange} />

        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" value={formData.description} onChange={handleChange} />

        <Label htmlFor="height">Height</Label>
        <Input id="height" type="text" value={formData.height} onChange={handleChange} />

        <Label htmlFor="width">Width</Label>
        <Input id="width" type="text" value={formData.width} onChange={handleChange} />

        <Label htmlFor="weight">Weight</Label>
        <Input id="weight" type="text" value={formData.weight} onChange={handleChange} />

        {product.category === 'candles' && (
          <>
            <Label htmlFor="fragrance">Fragrance</Label>
            <Input id="fragrance" type="text" value={formData.fragrance} onChange={handleChange} />
          </>
        )}

        <Label htmlFor="stock">Stock Quantity</Label>
        <Input id="stock" type="number" value={formData.stock} onChange={handleChange} />

        <Label htmlFor="price">Regular Price</Label>
        <Input id="price" type="number" value={formData.price} onChange={handleChange} />

        <Label htmlFor="discount">Discount (%)</Label>
        <Input id="discount" type="number" value={formData.discount.percentage} onChange={handleChange} />
        <p className="text-gray-600 text-sm">Sale Price: ₹{discountedPrice.toFixed(2)}</p>

        <div className="flex items-center space-x-2">
          <input id="onSale" type="checkbox" checked={formData.onSale} onChange={handleChange} />
          <Label htmlFor="onSale">On Sale</Label>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-4">
        <div className="bg-gray-200 rounded flex items-center justify-center">
          {formData.image ? (
            <Image src={formData.image} alt="Product Image" width={260} height={160} className="rounded" />
          ) : (
            <span className="text-gray-500">No Image Available</span>
          )}
        </div>

        <div className='flex justify-between flex-col items-center space-x-10 w-full'>
          <div className="ml-auto">
            <CldUploadButton
              onSuccess={handleImageUpload}
              onClose={() => console.log('Upload widget closed')}
              uploadPreset="mmmgkp-news"
              className='bg-black p-2 text-white my-2 w-full rounded'
            />
          </div>
        </div>

        <div className="space-y-2">
          {(["large", "medium", "thumbnail"] as const).map((key) => (
            <div key={key} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
              {product?.images?.[key] ? (
                <Image src={product.images[key] || formData.image} alt={`${key} Image`} width={40} height={40} className="rounded" />
              ) : (
                <span className="text-gray-500">No {key} Image</span>
              )}
              <span className="flex-1">{key.charAt(0).toUpperCase() + key.slice(1)} Image</span>
              <Check className="text-green-500" size={18} />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <Button onClick={handleUpdate} className="bg-blue-600 text-white">UPDATE</Button>
          <Button variant="destructive" onClick={handleDelete}><Trash2 size={16} className="mr-2" /> DELETE</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
