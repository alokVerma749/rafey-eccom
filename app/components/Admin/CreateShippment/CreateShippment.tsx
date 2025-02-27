'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Order } from "@/types/order";
import { UserAccount } from "@/models/user_model";

const CreateShippment = ({ order, user, totalWeight }: { order: Order, user: UserAccount, totalWeight: number }) => {

  async function handleClick() {
    try {
      const packageDetails = {
        shipments: [
          {
            name: user.name,
            add: user.address,
            pin: user.pincode,
            city: user.city,
            state: user.state,
            country: user.country,
            phone: user.phone,
            order: "parcel",
            payment_mode: "Prepaid",
            products_desc: "parcel of different products",
            cod_amount: '0',
            order_date: order.createdAt,
            total_amount: order.payableAmount,
            quantity: order.products.length || 0,
            waybill: order.waybill,
            shipment_width: "",
            shipment_height: "",
            weight: totalWeight,
          }
        ],
        pickup_location: {
          name: 'Ahmad Raffey',
          add: 'somewhere in allahabad',
          city: 'allahabad',
          pin_code: '211001',
          country: 'India',
          phone: '1234567890'
        }
      };

      const res = await fetch('/api/shipment/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ packageDetails })
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        toast({ title: 'Shipment created successfully' });
      } else {
        toast({ title: 'Error creating shipment', description: data.error });
      }
    } catch (error) {
      toast({ title: 'Error creating shipment' });
      console.error('Error creating shipment:', error);
    }
  }

  return (
    <Button onClick={handleClick} className='my-4'>
      Create Shipment
    </Button>
  );
}

export default CreateShippment;
