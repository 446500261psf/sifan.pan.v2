import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 子路径：CI 注入 BASE_PATH=/<仓库名>/
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    strictPort: true,
    headers: { 'Cache-Control': 'no-store' },
  },
})
