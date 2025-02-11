"use client"

import { useState } from "react"
import type { IDiscountToken } from "@/types/vouchers_type"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { VoucherCard } from "../VoucherCard"

interface VoucherListProps {
  vouchers: IDiscountToken[]
  isActive: boolean
}

export function VoucherList({ vouchers: initialVouchers, isActive }: VoucherListProps) {
  const [vouchers, setVouchers] = useState(initialVouchers)

  const handleToggleVoucher = async (code: string) => {
    const res = await fetch(`/api/admin/voucher`, {
      method: "PATCH",
      body: JSON.stringify({ code, isActive: !isActive }),
    })

    if (res.ok) {
      setVouchers(vouchers.filter((v) => v.code !== code))
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {vouchers.map((voucher) => (
        <VoucherCard key={voucher.code} voucher={voucher} onToggle={handleToggleVoucher} />
      ))}

      {isActive && (
        <Link href="/admin/voucher/create-voucher" className="block">
          <Button variant="outline" className="w-full mt-6 border-dashed">
            <Plus className="mr-2 h-4 w-4" />
            Add New Voucher
          </Button>
        </Link>
      )}
    </div>
  )
}

