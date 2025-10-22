/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { unoptimized: true }, // remove when deploying, we want to optimise images in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;
