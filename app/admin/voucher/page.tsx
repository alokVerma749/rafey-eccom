import getVouchersAction from "@/actions/voucher/get-vouchers"
import type { IDiscountToken } from "@/types/vouchers_type"
import { VoucherList } from "@/app/components/Admin/VoucherList"

export default async function AdminPage() {
  const activeResponse = await getVouchersAction(true)
  const inactiveResponse = await getVouchersAction(false)
  const activeVouchers: IDiscountToken[] = activeResponse ? JSON.parse(activeResponse as string) : []
  const inactiveVouchers: IDiscountToken[] = inactiveResponse ? JSON.parse(inactiveResponse as string) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bellefair">Admin Vouchers</h1>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bellefair mb-4">Active Vouchers</h2>
          <VoucherList vouchers={activeVouchers} isActive={true} />
        </div>
        <div>
          <h2 className="text-2xl font-bellefair mb-4">Inactive Vouchers</h2>
          <VoucherList vouchers={inactiveVouchers} isActive={false} />
        </div>
      </div>
    </div>
  )
}
