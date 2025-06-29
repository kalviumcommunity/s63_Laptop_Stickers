import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:6001',
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:6001',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
