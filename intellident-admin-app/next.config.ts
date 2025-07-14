import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Intellident_admin_hub",
  assetPrefix: "/Intellident_admin_hub/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
