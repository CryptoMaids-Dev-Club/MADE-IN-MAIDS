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
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cryptomaids-art.s3.ap-northeast-1.amazonaws.com', port: '' },
      { protocol: 'https', hostname: 'cryptomaids-metadata.s3.amazonaws.com', port: '' },
      { protocol: 'https', hostname: 'made-in-maids.s3.amazonaws.com', port: '' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', port: '' },
      { protocol: 'https', hostname: 'maidsstakingpolygon.onrender.com', port: '' },
      { protocol: 'https', hostname: 'placehold.jp', port: '' }, // for testing
      { protocol: 'https', hostname: 'ipfs.io', port: '' },
    ],
  },
  turbopack: {
    resolveAlias: {
      fs: { browser: './empty.ts' },
      net: { browser: './empty.ts' },
      tls: { browser: './empty.ts' },
      lokijs: { browser: './empty.ts' },
      encoding: { browser: './empty.ts' },
      'pino-pretty': { browser: './empty.ts' },
    },
  },
}

export default withBundleAnalyzer(nextConfig)
