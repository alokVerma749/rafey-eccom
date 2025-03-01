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
            order: order._id,
            payment_mode: "Prepaid",
            products_desc: ["ceramic", "resin products", "wax"].join(", "),
            cod_amount: '0',
            order_date: order.createdAt,
            total_amount: order.payableAmount.toString(),
            quantity: (order.products.length || 0).toString(),
            waybill: order.waybill || "",
            shipment_width: "10",
            shipment_height: "5",
            weight: totalWeight.toString(),
            shipping_mode: "Surface",
          }
        ],
        pickup_location: {
          name: "allahabad_facility",
          add: "M G Marg Sub-Office allahabad",
          city: "Allahabad",
          pin: "211001",
          country: "India",
          phone: "918948119171"
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
      if (data.data.success) {
        toast({ title: 'Shipment created successfully' });
      } else {
        toast({ title: 'Error creating shipment', description: data.error || 'Unknown error' });
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Error creating shipment' });
    }
  }

  return (
    <Button onClick={handleClick} className='my-4'>
      Create Shipment
    </Button>
  );
}

export default CreateShippment;
