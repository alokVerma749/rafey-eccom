'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const DeliveryOptions = () => {
  const [pincode, setPincode] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckPincode = async () => {
    if (!pincode) {
      return toast({ title: "Please enter a pincode" });
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/shipment/check-service?pincode=${pincode}`);
      const data: DeliveryOptionsResponse = await response.json();

      if (response.ok) {
        setDeliveryOptions(data);
      } else {
        toast({ title: "Failed to fetch delivery options" });
      }
    } catch (error) {
      console.error("Error fetching delivery options:", error);
      toast({ title: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const isServiceable =
    (deliveryOptions?.delivery_codes?.length ?? 0) > 0 &&
    deliveryOptions?.delivery_codes?.[0]?.postal_code?.pre_paid === "Y";

  return (
    <div className="py-4">
      <label className="block text-base font-semibold pt-4">🚚 DELIVERY OPTIONS</label>
      <div className="mt-2 space-x-2 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="flex-1 border w-[60%] md:w-1/2 rounded-md p-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Button onClick={handleCheckPincode} className="mt-2 md:mt-0" disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>

      {deliveryOptions && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Delivery Options:</h3>
          {isServiceable ? (
            <p className="text-green-600">This pincode is serviceable for prepaid orders.</p>
          ) : (
            <p className="text-red-600">This pincode is not serviceable for prepaid orders.</p>
          )}

          <pre className="bg-gray-100 p-4 rounded mt-4">
            {(deliveryOptions?.delivery_codes?.length ?? 0) > 0 && (
              <div className="mt-2">
                <h4 className="text-md font-semibold">Details:</h4>
                <p><strong>City:</strong> {deliveryOptions?.delivery_codes?.[0]?.postal_code?.city ?? "N/A"}</p>
                <p><strong>District:</strong> {deliveryOptions?.delivery_codes?.[0]?.postal_code?.district ?? "N/A"}</p>
                <p><strong>State:</strong> {deliveryOptions?.delivery_codes?.[0]?.postal_code?.state_code ?? "N/A"}</p>
                <p><strong>Max Weight:</strong> {deliveryOptions?.delivery_codes?.[0]?.postal_code?.max_weight ?? "N/A"} kg</p>
                <p><strong>Max Amount:</strong> ₹{deliveryOptions?.delivery_codes?.[0]?.postal_code?.max_amount ?? "N/A"}</p>
              </div>
            )}
          </pre>
        </div>
      )}

      <div className="border mt-6 mb-4 w-1/2 mx-auto md:hidden"></div>
      <ul className="text-sm text-gray-500 mt-2 list-disc pl-5">
        <li>100% Original Products</li>
        <li>Only Prepaid payment is acceptable</li>
        <li>No return and exchange available</li>
      </ul>
    </div>
  );
};

export default DeliveryOptions;
