/** @type {import('next').NextConfig} */
import './src/env/client.mjs'
import './src/env/server.mjs'
import analyze from '@next/bundle-analyzer'

const withBundleAnalyzer = analyze({
  enabled: false,
  defaultSizes: 'gzip',
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cryptomaids-art.s3.ap-northeast-1.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cryptomaids-metadata.s3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'made-in-maids.s3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'maidsstakingpolygon.onrender.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'placehold.jp', // for testing
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
      },
    ],
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

export default withBundleAnalyzer(nextConfig)
