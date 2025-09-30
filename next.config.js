/** @type {import('next').NextConfig} */
// const domain = '/ibaas-ui';
const domain = '';

const nextConfig = {
  trailingSlash: true,
  // basePath: domain,
  // assetPrefix: domain,
  output: 'export', // Use for deployment
  images: { unoptimized: true }, // remove when deploying, we want to optimise images in production
  env: {
    DOMAIN: domain
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;
