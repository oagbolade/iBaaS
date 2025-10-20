/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  // output: 'export', // Use for static deployment
  images: { unoptimized: true }, // remove when deploying, we want to optimise images in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;
