import connect_db from '@/config/db';
import DiscountToken from '@/models/discount_token';
import { IDiscountToken } from '@/types/vouchers_type';

export const getVouchers = async (isActive: boolean): Promise<IDiscountToken[]> => {
  await connect_db();

  const query = { isActive };

  try {
    const vouchersQuery = DiscountToken.find(query);
    const vouchers = await vouchersQuery.exec();
    return vouchers as IDiscountToken[];
  } catch (error) {
    console.error("Error fetching all vouchers:", error instanceof Error ? error.message : error);
    return [];
  }
};
