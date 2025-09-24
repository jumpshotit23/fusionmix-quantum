import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ FIXED CONFIG - Explicit build settings
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: './index.html'
    }
  },
  publicDir: 'public'
})
