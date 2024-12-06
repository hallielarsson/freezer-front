import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',  // Your frontend code directory
  build: {
    sourcemap: true,
    outDir: '../wwwroot',  // Output to your backend's wwwroot folder in production
    assetsDir: 'assets',  // Folder for your static assets
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5001',  // Proxy API calls to your backend during development
    },
  },
});