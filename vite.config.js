import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ SIMPLIFIED - Remove problematic Rollup options
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
