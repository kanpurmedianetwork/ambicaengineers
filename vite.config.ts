import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/inquiry': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: () => '/macros/s/AKfycbySFZPp9xl2X8FXJS4zb9J2PMl1Sp01TjWlQSTNJvf7vWMFFZ3YI2wQOWkRWGH3jLkq-g/exec',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
