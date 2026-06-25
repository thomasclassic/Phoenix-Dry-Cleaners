
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/create-checkout-session': {
        target: 'http://localhost:4242/api/create-checkout-session',
        changeOrigin: true,
      },
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
