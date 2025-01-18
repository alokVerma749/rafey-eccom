import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>
        At Wonders Tapestry, we value your privacy and are committed to protecting your personal 
        information. This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, and payment details 
        when you interact with our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p>
        The information we collect is used to provide and improve our services, process transactions, 
        and send you important updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p>
        We implement various security measures to ensure your personal information is safe. However, 
        no method of transmission over the internet is 100% secure.
      </p>

      <p className="mt-6">Last updated: 01/01/2025</p>
    </div>
  );
};

export default PrivacyPolicy;
