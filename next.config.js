/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      lokijs: false,
      encoding: false,
      'pino-pretty': false,
    }
    return config
  },
}

module.exports = nextConfig
