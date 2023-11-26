import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      c: path.resolve(__dirname, './src/components/'),
      a: path.resolve(__dirname, './src/assets/'),
      q: path.resolve(__dirname, './src/queries/'),
      t: path.resolve(__dirname, './src/types/'),
      h: path.resolve(__dirname, './src/hooks/'),
      p: path.resolve(__dirname, './src/pages/Page/'),
      r: path.resolve(__dirname, './src/router/'),
      s: path.resolve(__dirname, './src/store/'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['@apollo/client', 'graphql'], // Add any other dependencies here
  },
})
