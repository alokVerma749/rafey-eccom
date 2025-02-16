"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"
import type { Product } from "@/types/product_type"
import { toast } from "@/hooks/use-toast"

function ProductDetail({ product }: { product: Product }) {
  console.log(product)
  const [formData, setFormData] = useState<Product>({
    ...product,
    discount: product.discount || { percentage: 0 },
  })

  const discountedPrice = formData.price - (formData.price * (formData.discount?.percentage ?? 0)) / 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/product`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`)
      }

      toast({ title: "Product updated successfully!" })
    } catch (error) {
      console.error("Update failed", error)
      toast({ title: "Failed to update product. Please try again.", variant: "destructive" })
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product._id }),
      })

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`)
      }

      toast({ title: "Product deleted successfully!" })
    } catch (error) {
      console.error("Delete failed", error)
      toast({ title: "Failed to delete product. Please try again.", variant: "destructive" })
    }
  }

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url
    if (uploadedImageUrl && formData.images.length < 4) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, uploadedImageUrl],
      }))
    } else if (formData.images.length >= 4) {
      toast({ title: "Maximum 4 images allowed", variant: "destructive" })
    } else {
      console.error("Image URL is invalid")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

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

        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="candles">Candles</option>
          <option value="ceramic art">Ceramic Art</option>
          <option value="resin art">Resin Art</option>
        </select>

        {formData.category === "ceramic art" && (
          <>
            <Label htmlFor="color">Color</Label>
            <select
              id="color"
              value={formData.color || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Color</option>
              {["red", "green", "yellow", "blue", "purple", "pink", "orange", "brown", "gray", "black", "white"].map(
                (color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ),
              )}
            </select>
          </>
        )}

        <Label htmlFor="stock">Stock Quantity</Label>
        <Input id="stock" type="number" value={formData.stock} onChange={handleChange} />

        <Label htmlFor="price">Regular Price</Label>
        <Input id="price" type="number" value={formData.price} onChange={handleChange} />

        <Label htmlFor="discount.percentage">Discount (%)</Label>
        <Input
          id="discount.percentage"
          type="number"
          value={formData.discount?.percentage || 0}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, discount: { ...prev.discount, percentage: Number(e.target.value) } }))
          }
        />
        <p className="text-gray-600 text-sm">Sale Price: ₹{discountedPrice.toFixed(2)}</p>

        <div className="flex items-center space-x-2">
          <input
            id="onSale"
            type="checkbox"
            checked={formData.onSale}
            onChange={(e) => setFormData((prev) => ({ ...prev, onSale: e.target.checked }))}
          />
          <Label htmlFor="onSale">On Sale</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="isCustomizable"
            type="checkbox"
            checked={formData.isCustomizable}
            onChange={(e) => setFormData((prev) => ({ ...prev, isCustomizable: e.target.checked }))}
          />
          <Label htmlFor="isCustomizable">Customizable</Label>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        {formData.images.length < 4 && (
          <div className="flex justify-center items-center space-x-10 w-full">
            <CldUploadButton
              onSuccess={handleImageUpload}
              onClose={() => console.log("Upload widget closed")}
              uploadPreset="mmmgkp-news"
              className="bg-black p-2 text-white my-2 w-full rounded"
            >
              Upload Image ({formData.images.length}/4)
            </CldUploadButton>
          </div>
        )}

        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          type="text"
          value={formData.tags?.join(", ") || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tags: e.target.value.split(",").map((tag) => tag.trim()) }))
          }
          placeholder="Enter tags separated by commas"
        />

        <Label htmlFor="subCategories">Sub-Categories</Label>
        <Input
          id="subCategories"
          type="text"
          value={formData.subCategories?.join(", ") || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              subCategories: e.target.value.split(",").map((subCat) => subCat.trim()),
            }))
          }
          placeholder="Enter sub-categories separated by commas"
        />

        <div className="flex justify-between mt-4">
          <Button onClick={handleUpdate} className="bg-blue-600 text-white">
            UPDATE
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 size={16} className="mr-2" /> DELETE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
