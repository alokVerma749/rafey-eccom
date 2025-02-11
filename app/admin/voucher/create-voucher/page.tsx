'use client'

import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [maxUsage, setMaxUsage] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [minCartValue, setMinCartValue] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch('/api/admin/voucher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        percentage,
        maxUsage,
        validFrom,
        validUntil,
        minCartValue
      }),
    });

    if (res.ok) {
      toast({
        title: 'Voucher added successfully'
      });
      
      // Reset form fields after success
      setCode('');
      setPercentage('');
      setMaxUsage('');
      setValidFrom('');
      setValidUntil('');
      setMinCartValue(0);
    } else {
      toast({
        title: 'Error creating voucher',
      });
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Voucher Page</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="code" className="block font-medium mb-1">Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="percentage" className="block font-medium mb-1">Percentage</label>
          <input
            type="number"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            min="1"
            max="100"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxUsage" className="block font-medium mb-1">Max Usage</label>
          <input
            type="number"
            id="maxUsage"
            value={maxUsage}
            onChange={(e) => setMaxUsage(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="minCartValue" className="block font-medium mb-1">Minimum Cart Value</label>
          <input
            type="number"
            id="minCartValue"
            value={minCartValue}
            onChange={(e) => setMinCartValue(Number(e.target.value))}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="validFrom" className="block font-medium mb-1">Valid From</label>
          <input
            type="date"
            id="validFrom"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="validUntil" className="block font-medium mb-1">Valid Until</label>
          <input
            type="date"
            id="validUntil"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Voucher
        </button>
      </form>
    </div>
  );
}
