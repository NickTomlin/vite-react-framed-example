import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
console.log(react.preambleCode)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        host: "./index.html",
        frame: "./frame.html"
      }
    }
  },
})
