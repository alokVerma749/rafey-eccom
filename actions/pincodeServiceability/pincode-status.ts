'use server';

import { checkPincodeServiceabilityService } from "@/services/shipment/checkPincode/checkPincodeServiceablity";

const checkPincodeServiceability = async (pincode: string): Promise<string> => {
  try {
    if (!pincode) throw new Error("Pincode is required.");

    const res = await checkPincodeServiceabilityService(pincode);
    return JSON.stringify(res);
  } catch (error) {
    console.error("Error in checkPincodeServiceability:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default checkPincodeServiceability;
