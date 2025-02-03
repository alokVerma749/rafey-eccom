import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { Product } from "@/types/product_type";
import Image from "next/image";

function ProductDetail({ product }: { product: Product }) {
  const discountedPrice = product?.price - (product?.price * (product.discount?.percentage ?? 0) / 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded-lg mr-6 ">
      <div className="space-y-4">
        <div>
          <Label htmlFor="product-name">Product Name</Label>
          <Input id="product-name" defaultValue={product.name} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" defaultValue={product.description} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" defaultValue={product.category} />
        </div>
        <div>
          <Label htmlFor="brand">Brand Name</Label>
          <Input id="brand" defaultValue={product.brand} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" defaultValue={product.sku} />
          </div>
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" type="number" defaultValue={product.stock} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Regular Price</Label>
            <Input id="price" type="text" defaultValue={`$${product.price}`} />
          </div>
          <div>
            <Label htmlFor="sale-price">Sale Price</Label>
            <Input id="sale-price" type="text" defaultValue={`$${discountedPrice}`} />
          </div>
        </div>
        <div>
          <Label>Tag</Label>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-200 rounded">Casual</span>
            <span className="px-2 py-1 bg-gray-200 rounded">Light</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-500">Image Preview</span>
        </div>
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center">
          <input type="file" className=" opacity-0 w-full h-full cursor-pointer" />
          <span className="text-gray-500">Drop your image here, or browse</span>
        </div>
        <div className="space-y-2">
          {[
            { src: product.images.large, label: "Large Image" },
            { src: product.images.medium, label: "Medium Image" },
            { src: product.images.thumbnail, label: "Thumbnail Image" },
          ].map((image, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
              <Image src={image.src} alt={image.label} width={40} height={40} className="rounded" />
              <span className="flex-1">{image.label}</span>
              <Check className="text-green-500" size={18} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="default">UPDATE</Button>
          <Button variant="destructive">
            <Trash2 size={16} className="mr-2" />DELETE
          </Button>
          <Button variant="outline">CANCEL</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;