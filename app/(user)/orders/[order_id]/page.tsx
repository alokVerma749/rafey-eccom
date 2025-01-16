'use client'

import React, { useState } from 'react';

// Define types for orderDetails and response data
interface OrderDetails {
  pickup_address: string;
  delivery_address: string;
  weight: number;
  cod_amount?: number; // Optional for cash on delivery
}

interface ShipmentCreateResponse {
  awb: string;
  message: string;
  // Add other relevant fields based on the API response
}

interface TrackingDetails {
  status: string;
  location: string;
  // Add other relevant fields based on the API response
}

function Page() {
  const [awbNumber,] = useState<string>('');

  const createShipment = async (orderDetails: OrderDetails) => {
    try {
      const response = await fetch('/api/delhivery/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ packageDetails: orderDetails }),
      });

      if (!response.ok) throw new Error('Failed to create shipment');
      const data: ShipmentCreateResponse = await response.json();
      console.log('Shipment created:', data);

      // Save AWB number (data.awb) to your database or state

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const trackShipment = async (awbNumber: string) => {
    try {
      const response = await fetch(`/api/delhivery/track-shipment?awbNumber=${awbNumber}`);
      if (!response.ok) throw new Error('Failed to track shipment');
      const data: TrackingDetails = await response.json();
      console.log('Tracking details:', data);

      // Update the UI with the tracking status (data.status)

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div>
      <h1>Shipment Page</h1>
      <button onClick={() => createShipment({ pickup_address: 'Pickup Address', delivery_address: 'Delivery Address', weight: 2.5 })}>
        Create Shipment
      </button>
      <button onClick={() => trackShipment(awbNumber)}>
        Track Shipment
      </button>
    </div>
  );
}

export default Page;
