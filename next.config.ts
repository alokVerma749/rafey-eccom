import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'default',
    domains: ['res.cloudinary.com', 'dummyimage.com'],
  }
};

export default nextConfig;
