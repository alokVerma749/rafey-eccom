'use server';

import { getVouchers } from "@/services/voucher/get-vouchers";
import { IDiscountToken } from "@/types/vouchers_type";

const getVouchersAction = async (isActive: boolean): Promise<string> => {
  try {
    const vouchers: IDiscountToken[] = await getVouchers(isActive);
    return JSON.stringify(vouchers);
  } catch (error) {
    console.error("Error in getVouchersAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getVouchersAction;
