import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure this port is available
    proxy: {
      '/api': 'http://localhost:5000', // Redirect API calls to the backend
    },
  },
});
