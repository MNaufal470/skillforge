/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    domains: ["utfs.io"],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
