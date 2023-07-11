/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cryptomaids-art.s3.ap-northeast-1.amazonaws.com'], //ここにドメインを指定
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

module.exports = withBundleAnalyzer(nextConfig)
