/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build', // Change build output directory
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig; 