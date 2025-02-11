'use client'

import { IDiscountToken } from "@/types/vouchers_type";
import { Button } from "@/components/ui/button";

interface VoucherCardProps {
  voucher: IDiscountToken;
  onDisable: (code: string) => void;
}

export function VoucherCard({ voucher, onDisable }: VoucherCardProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Ticket notches */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full" />
      
      {/* Main ticket body */}
      <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{voucher.percentage}% OFF</h3>
            <p className="text-sm text-muted-foreground">Code: {voucher.code}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDisable(voucher.code)}
            disabled={!voucher.isActive}
          >
            Disable
          </Button>
        </div>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Min. Cart Value: ${voucher.minCartValue || 0}</p>
          <p>Usage: {voucher.usedCount || 0}/{voucher.maxUsage}</p>
          <p className="text-xs">
            Valid until {new Date(voucher.validUntil).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
          <span>Created by: {voucher.createdBy}</span>
          <span className={`px-2 py-0.5 rounded-full ${
            voucher.isActive 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {voucher.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
}
