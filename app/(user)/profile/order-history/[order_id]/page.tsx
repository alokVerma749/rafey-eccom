import { DeliveryTracker } from "@/app/components/Profile/DeliveryTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Image from "next/image";

const OrderDetails = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ArrowLeft className="cursor-pointer" />
          <h2 className="text-lg font-semibold">ORDER NO: 00000029265</h2>
        </div>
        <span className="text-sm text-gray-500">Estimated 24/07/2024</span>
      </div>

      <DeliveryTracker />

      <h3 className="text-md font-semibold mb-3">ORDER SUMMARY</h3>
      <div className="flex items-center border border-gray-300 rounded-lg p-4 mb-4">
        <div className="mr-4">
          <Image
            src="/ring.png"
            alt="Solitaire Diamond Ring"
            height={80}
            width={80}
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 text-sm text-gray-700">
          <p className="font-medium">SOLITAIRE DIAMOND RING</p>
          <p>Size: 24</p>
          <p>Purity: 14kt</p>
          <p>Color: Gold</p>
          <p>Diamond: IJ-SI</p>
        </div>
        <span className="font-medium text-gray-800">₹39,999</span>
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹39,999</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span>Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>TOTAL AMOUNT:</span>
          <span>₹39,999</span>
        </div>
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <p>
          <strong>Order updates sent to:</strong> amsiani@gmail.com | +91 9302847392
        </p>
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <p className="font-semibold">Delivering at:</p>
        <p>
          52RV-5FR, Golden Apartments, MG Rd, near Kapadia Hospital, Goregaon
          (W), Mumbai, Maharashtra 400104
        </p>
        <p>Phone: +91 96500 39980</p>
      </div>

      <div className="text-sm text-gray-700 mb-6">
        <p className="font-semibold">Mode of Payment:</p>
        <p>Online payment (credit card)</p>
      </div>

      <Button className="w-fit bg-indigo-900 text-white flex items-center gap-2 px-10">
        <Download className="w-4 h-4" />
        Download Invoice
      </Button>
    </div>
  );
};

export default OrderDetails;
