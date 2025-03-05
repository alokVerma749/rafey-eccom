import React from 'react';

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be in their original condition and packaging. Please contact our customer service team for assistance."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary depending on your location. Typically, orders are delivered within 5-7 business days. International shipping may take longer."
  },
  {
    question: "Do you offer custom orders?",
    answer: "Yes, we offer custom orders for ceramics, candles, and resin art pieces. Please contact us with your requirements, and we will work with you to create a unique piece."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on the carrier website."
  }
];

const FAQs = () => {
  return (
    <div className="container mx-auto px-6 py-12 h-screen">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
