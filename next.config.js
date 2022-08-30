/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cf.shopee.tw', 'cdn-icons-png.flaticon.com'],
  },
};

module.exports = nextConfig;
