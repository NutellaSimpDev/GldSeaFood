import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  base: '/GldSeaFood/',
  build: {
    rollupOptions: {
      input: {
        // Sitio principal
        main: path.resolve(__dirname, 'index.html'),
        // Generador de firmas de correo -> /GldSeaFood/signature/
        signature: path.resolve(__dirname, 'signature/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
