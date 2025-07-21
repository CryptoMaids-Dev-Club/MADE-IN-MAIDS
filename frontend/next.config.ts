import type { NextConfig } from 'next'
import './src/env/client.mjs'
import './src/env/server.mjs'
import analyze from '@next/bundle-analyzer'

const withBundleAnalyzer = analyze({
  enabled: false,
})

const nextConfig: NextConfig = {
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
        hostname: 'made-in-maids.s3.us-east-1.amazonaws.com',
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
}

export default withBundleAnalyzer(nextConfig)