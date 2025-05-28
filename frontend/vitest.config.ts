import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    env: {
      // Mock environment variables for tests
      NEXT_PUBLIC_NETWORK: 'sepolia',
      NEXT_PUBLIC_WALLET_CONNECT_ID: 'abcdef1234567890abcdef1234567890abcdef12', // 40 chars
      NEXT_PUBLIC_INFURA_API_KEY: 'test-infura-key-1234567890',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})