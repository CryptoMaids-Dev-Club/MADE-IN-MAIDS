/** @type {import('next').NextConfig} */
import './src/env/client.mjs'
import './src/env/server.mjs'
import analyze from '@next/bundle-analyzer'

const withBundleAnalyzer = analyze({
  enabled: false,
  defaultSizes: 'gzip',
})

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/top',
        permanent: true,
      },
    ]
  },
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
        hostname: 'firebasestorage.googleapis.com',
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
