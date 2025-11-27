/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,

  experimental: {
    turbo: false,
  },

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;