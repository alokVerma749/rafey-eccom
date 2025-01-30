import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'default',
    domains: ['res.cloudinary.com', 'dummyimage.com', 'lh3.googleusercontent.com'],
  }
};

export default nextConfig;
