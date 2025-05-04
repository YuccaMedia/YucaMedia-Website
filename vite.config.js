import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 8080,
    open: '/#main-content',
    host: '127.0.0.1',
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true,
  },
});
