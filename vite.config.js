import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5200,
    strictPort: true, // Exit if port 5200 is in use
  },
  plugins: [react()],
});
