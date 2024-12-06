/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media-input132134-dev.s3.amazonaws.com"], // Add your image domain here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
