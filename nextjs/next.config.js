/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: "secret",
  },
  images: {
    minimumCacheTTL: 600,
  },
};

module.exports = nextConfig;
