// Next.js configuration for hazo_ui dev app
// Allows importing from the parent hazo_ui library during development

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['hazo_ui'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'hazo_ui': require('path').resolve(__dirname, '../src/index.ts'),
    };
    return config;
  },
};

module.exports = nextConfig;

