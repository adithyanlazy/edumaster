import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'edumaster/index.html'),
        admin: resolve(__dirname, 'edumaster-admin/admin.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: '/edumaster/index.html'
  }
})
