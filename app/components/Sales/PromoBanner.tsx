'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { IDiscountToken } from '@/types/vouchers_type';
import { useState } from 'react';

const PromoBanner = ({ bannerVoucher }: { bannerVoucher: IDiscountToken }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (bannerVoucher) {
      navigator.clipboard.writeText(bannerVoucher.code);
      setCopied(true);
      toast({ title: 'Toast copied' })
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#e25c3c] to-[#2a8a9d] text-white py-8 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-2">Extra Discount of {bannerVoucher.percentage}% On Limited Items!</h2>
        <div className="flex items-center mb-4">
          {bannerVoucher && (
            <p className="mb-4">
              Use code <span className="bg-white text-[#e25c3c] px-3 py-1 mx-2 font-bold rounded">{bannerVoucher.code}</span> at checkout for an additional discount!
            </p>
          )}
        </div>
        <Button className="bg-white text-[#e25c3c] hover:bg-[#f8f9fa]" onClick={handleCopyCode}>
          {copied ? 'Code Copied!' : 'Copy Code'}
        </Button>
      </div>
    </section>
  )
}

export default PromoBanner;
