import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-and-conditions p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p>
        Welcome to Wonders Tapestry! These terms and conditions outline the rules and regulations 
        for the use of our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p>
        By accessing this website, you agree to be bound by these terms and conditions. If you do not 
        agree with any part, you may not use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
      <p>
        The content on this site is the intellectual property of Wonders Tapestry. Unauthorized use 
        of content may lead to legal action.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Governing Law</h2>
      <p>
        These terms will be governed by and construed in accordance with the laws of India.
      </p>

      <p className="mt-6">Last updated: 01/01/2025</p>
    </div>
  );
};

export default TermsAndConditions;
