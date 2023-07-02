import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react(), tsconfigPaths(), eslintPlugin()],
  resolve: {
    alias: {
      buffer: 'buffer',
      util: 'util/',
    },
  },
})
