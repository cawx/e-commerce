import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommercesprng.s3.eu-north-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
