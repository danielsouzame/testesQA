import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Em desenvolvimento, as chamadas para /api são encaminhadas ao backend (porta 3001).
const proxy = { '/api': 'http://localhost:3001' };

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy },
  preview: { port: 5173, proxy },
});
