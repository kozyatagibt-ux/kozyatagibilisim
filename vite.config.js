import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: '/tmp/vite-cache',
  build: {
    // Code splitting — büyük bağımlılıkları ayrı chunk'lara böl
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation': ['framer-motion'],
          'icons': ['lucide-react'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
})
