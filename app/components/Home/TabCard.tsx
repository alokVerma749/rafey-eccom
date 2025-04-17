
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product_type";
import Link from "next/link";

export function TabCard({ cardDetail }: { cardDetail: Product }) {
  const { name, price, images, discount, _id } = cardDetail;
  const discountText = discount ? `${discount.percentage}% OFF` : "No Discount";
  const discountPercentage = discount?.percentage || 0
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(2)
  return (
    <Link href={`/product/${_id}`}>
      <Card className="h-full w-full rounded-2xl relative border-0">
        <div
          className="bg-cover bg-center relative h-full w-full rounded-2xl text-white"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.3) 100%), url(${(images && images[0])})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className="text-sm mb-2 text-start absolute right-0 top-0 bg-green-600 p-2 rounded-tr-2xl">{discountText}</p>
          <div className="p-5 bottom-10 left-10">
            <p className="font-semibold text-xl text-start">₹{discountedPrice}</p>
            <p className="font-semibold text-sm text-start line-through ">₹{price}</p>
            <h2 className="text-lg font-semibold mb-2 text-start">{name}</h2>
          </div>
        </div>
      </Card>
    </Link>
  );
}
