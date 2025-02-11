import getVouchersAction from "@/actions/voucher/get-vouchers";
import { IDiscountToken } from "@/types/vouchers_type";
import { VoucherList } from "@/app/components/Admin/VoucherList";

export default async function AdminPage() {
  const response = await getVouchersAction(true);
  const vouchers: IDiscountToken[] = response ? JSON.parse(response as string) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bellefair">Admin Vouchers</h1>
      </div>
      <VoucherList vouchers={vouchers} />
    </div>
  );
}
