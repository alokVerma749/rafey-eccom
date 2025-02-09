import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useVoucher = (totalPrice: number) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState('');

  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      setVoucherError('Please enter a voucher code.');
      return;
    }

    try {
      const response = await fetch('/api/apply-voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voucherCode, cartTotal: totalPrice }),
      });
      const data = await response.json();

      if (!response.ok) {
        setVoucherError('Invalid or expired voucher.');
        return;
      }

      setVoucherDiscount(data.discountAmount);
      toast({ title: "Voucher Applied", description: `₹${data.discountAmount} off applied!` });
      setVoucherError('');
      setVoucherCode('');
    } catch (error) {
      setVoucherError('Failed to validate voucher. Try again.');
    }
  };

  return { voucherCode, setVoucherCode, voucherDiscount, voucherError, handleApplyVoucher };
};