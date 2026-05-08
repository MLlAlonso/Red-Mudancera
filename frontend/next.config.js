/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,

  experimental: {
    turbo: false,
  },

  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "no-cache",
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;