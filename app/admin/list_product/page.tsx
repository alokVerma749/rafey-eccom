"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm, type SubmitHandler } from "react-hook-form"
import { CldUploadButton } from "next-cloudinary"
import { CircleX } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ProductFormValues {
  name: string
  description: string
  height: string
  width: string
  weight: string
  fragrance?: string
  price: number
  stock: number
  tags: string[]
  images: string[]
  category: string
  subCategory: string[]
  discount: number
  variations: string[]
  iscustomizable: boolean
}

export default function ListProductPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      tags: [],
      subCategory: [],
      images: [],
    },
  })

  const [categories] = useState<string[]>(["ceramic art", "candles", "resin art"])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newSubCategory, setNewSubCategory] = useState<string>("")
  const [newTag, setNewTag] = useState<string>("")
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [savedSubCategories, setSavedSubCategories] = useState<string[]>([])
  const [savedTags, setSavedTags] = useState<string[]>([])
  const [iscustomizable, setIscustomizable] = useState<boolean>(false)

  const category = watch("category") || ""

  const addSubCategory = async () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      setSubCategories((prev) => [...prev, newSubCategory])
      setNewSubCategory("")
    }
    const res = await fetch("/api/admin/sub_category", {
      method: "POST",
      body: JSON.stringify({ name: newSubCategory, category: watch("category") || "" }),
    })
    if (res.ok) {
      setSavedSubCategories((prev) => [...prev, newSubCategory])
    }
  }

  const addTag = async () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag])
      setNewTag("")
    }
    const res = await fetch("/api/admin/tags", {
      method: "POST",
      body: JSON.stringify({ name: newTag, category: watch("category") || "" }),
    })
    console.log(res)
    if (res.ok) {
      setSavedTags((prev) => [...prev, newTag])
    }
  }

  // TODO: deletion should be only done if tag is not attached to any product else
  const removeSubCategory = async (subCategoryToRemove: string) => {
    const res = await fetch(`/api/admin/sub_category?name=${subCategoryToRemove}`, {
      method: "DELETE",
      body: JSON.stringify(category),
    })

    if (res.ok) {
      setSubCategories((prev) => prev.filter((subCategory) => subCategory !== subCategoryToRemove))
      setSavedSubCategories((prev) => prev.filter((savedSubCategory) => savedSubCategory !== subCategoryToRemove))
    } else {
      console.error("Failed to delete subcategory")
    }
  }

  const removeTag = async (tagToRemove: string) => {
    try {
      const res = await fetch(`/api/admin/tags?name=${tagToRemove}`, {
        method: "DELETE",
        body: JSON.stringify(category),
      })

      if (!res.ok) throw new Error("Failed to delete tag")

      setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
      setSavedTags((prev) => prev.filter((savedTag) => savedTag !== tagToRemove))
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const formData = {
      ...data,
      tags,
      subCategory: subCategories,
      iscustomizable,
      images: imagePreviews,
    }

    reset()
    setTags([])
    setSubCategories([])
    setSavedSubCategories([])
    setSavedTags([])
    setImagePreviews([])

    const res = await fetch("/api/admin/product", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      toast({ title: "Product added successfully" })
    }
  }

  const handleImageUpload = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url
    if (uploadedImageUrl && imagePreviews.length < 4) {
      setImagePreviews((prev) => [...prev, uploadedImageUrl])
      setValue("images", [...imagePreviews, uploadedImageUrl])
    } else if (imagePreviews.length >= 4) {
      toast({ title: "Maximum 4 images allowed", variant: "destructive" })
    } else {
      console.error("Image URL is invalid")
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    setValue(
      "images",
      imagePreviews.filter((_, i) => i !== index),
    )
  }

  const handleDelete = () => {
    reset()
    setTags([])
    setSubCategories([])
    setSavedSubCategories([])
    setSavedTags([])
    setImagePreviews([])
  }

  return (
    <div className="w-full mx-10 my-6 bg-white shadow-md rounded-lg p-3 font-bellefair">
      <h1 className="text-2xl my-2">List Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register("name", { required: "Name is required" })} placeholder="Product Name" />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description", { required: "Description is required" })}
              placeholder="Description"
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>

          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              {...register("height", { required: "Height is required" })}
              placeholder="Height(in cm)"
            />
            {errors.height && <span className="text-red-500">{errors.height.message}</span>}
          </div>

          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              {...register("width", { required: "Width is required" })}
              placeholder="Width(in cm)"
            />
            {errors.width && <span className="text-red-500">{errors.width.message}</span>}
          </div>

          <div>
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              {...register("weight", { required: "Weight is required" })}
              placeholder="Weight(in grams)"
            />
            {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
          </div>

          {category === "candles" && (
            <div>
              <Label htmlFor="fragrance">Fragrance</Label>
              <Input
                id="fragrance"
                {...register("fragrance", { required: "Fragrance is required" })}
                placeholder="Fragrance"
              />
              {errors.fragrance && <span className="text-red-500">{errors.fragrance.message}</span>}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...register("price", { required: "Price is required", valueAsNumber: true })}
                type="number"
                placeholder="Price"
              />
              {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                {...register("stock", { required: "Stock is required", valueAsNumber: true })}
                type="number"
                placeholder="Stock"
              />
              {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
            </div>
          </div>

          <div>
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              {...register("discount", { valueAsNumber: true })}
              type="number"
              placeholder="Discount"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-1 border border-gray-300 rounded-md"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
          </div>
          <div className="">
            <Label htmlFor="subCategory">Sub-Category</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
                placeholder="Add new subcategory"
                className="p-1 w-[90%] border border-gray-300 rounded-md"
              />
              <Button type="button" onClick={addSubCategory}>
                Add
              </Button>
            </div>

            <div className="space-y-2 flex w-full justify-start gap-2 text-wrap overflow-auto">
              {subCategories.map((subCategory, index) => (
                <div key={index}>
                  {/* Show the subcategory only if it's saved */}
                  {savedSubCategories.includes(subCategory) && (
                    <div className="flex items-center justify-between w-fit">
                      <span className="mx-2">{subCategory}</span>
                      <div onClick={() => removeSubCategory(subCategory)} className="text-red-500 cursor-pointer">
                        <CircleX size={20} strokeWidth={1.25} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add new tag" />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
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

          {/* fix this field */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="customizable">Customizable</Label>
            <input
              id="customizable"
              type="checkbox"
              {...register("iscustomizable")}
              checked={iscustomizable}
              onChange={(e) => setIscustomizable(e.target.checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt={`Uploaded Preview ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <CircleX size={20} />
                </button>
              </div>
            ))}
          </div>

          {imagePreviews.length < 4 && (
            <div className="flex justify-center items-center space-x-10 w-full">
              <CldUploadButton
                onSuccess={handleImageUpload}
                onClose={() => console.log("Upload widget closed")}
                uploadPreset="mmmgkp-news"
                className="bg-black p-2 text-white my-2 w-full rounded"
              >
                Upload Image ({imagePreviews.length}/4)
              </CldUploadButton>
            </div>
          )}
        </div>
        <div className="flex justify-around w-[90%] mx-auto">
          <Button
            variant="destructive"
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button type="submit" className="py-2 px-4 rounded-lg bg-green-600 hover:bg-green-200 hover:text-black">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}
