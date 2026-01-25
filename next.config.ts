import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/beyondbooking/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/beyondbooking' : '',
};

export default nextConfig;
