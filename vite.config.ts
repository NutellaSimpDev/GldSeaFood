import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig(() => {
  // Solo compilar la herramienta interna de firmas para GitHub Pages
  const isGh = process.argv.some(arg => arg.includes('/GldSeaFood/')) || process.env.VITE_BASE === '/GldSeaFood/';

  const input: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
  };

  if (isGh) {
    // Generador de firmas de correo solo disponible en GitHub Pages -> /GldSeaFood/signature/
    input.signature = path.resolve(__dirname, 'signature/index.html');
  }

  return {
    plugins: [react()],
    base: process.env.VITE_BASE || '/',
    build: {
      rollupOptions: {
        input,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
})
