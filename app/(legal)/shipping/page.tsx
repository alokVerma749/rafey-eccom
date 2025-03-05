import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-6 py-12 h-screen">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
      <p className="mb-4">
        We offer shipping to various locations worldwide. Shipping times and costs vary depending on your location and the shipping method selected at checkout.
      </p>
      <p className="mb-4">
        Orders are typically processed within 1-2 business days. Once your order has shipped, you will receive a tracking number via email.
      </p>
      <p className="mb-4">
        Please note that international orders may be subject to customs fees and import duties. These charges are the responsibility of the recipient.
      </p>
      <p className="mb-4">
        If you have any questions or concerns about your order, please contact our customer service team for assistance.
      </p>
    </div>
  );
};

export default ShippingPolicy;