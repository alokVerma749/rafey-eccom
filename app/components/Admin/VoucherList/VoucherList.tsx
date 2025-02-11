'use client'

import { useState } from 'react';
import { IDiscountToken } from "@/types/vouchers_type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from 'lucide-react';
import { VoucherCard } from '../VoucherCard';

interface VoucherListProps {
  vouchers: IDiscountToken[];
}

export function VoucherList({ vouchers: initialVouchers }: VoucherListProps) {
  const [vouchers, setVouchers] = useState(initialVouchers);

  const handleDisableVoucher = async (code: string) => {
    // TODO: Implement the API call to disable the voucher
    console.log(`Disabling voucher with code: ${code}`);
    
    setVouchers(vouchers.map(v => 
      v.code === code ? { ...v, isActive: false } : v
    ));
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {vouchers.map((voucher) => (
        <VoucherCard
          key={voucher.code} 
          voucher={voucher} 
          onDisable={handleDisableVoucher} 
        />
      ))}
      
      <Link href="/admin/voucher/create-voucher" className="block">
        <Button 
          variant="outline" 
          className="w-full mt-6 border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" />
          <Link href="/admin/voucher/create-voucher">Add New Voucher</Link>
        </Button>
      </Link>
    </div>
  );
}
