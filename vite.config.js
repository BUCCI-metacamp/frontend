import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  // base: "/frontend/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
})

    // "predeploy": "npm run build",
    // "deploy": "gh-pages -d build",
    // "homepage": "https://bucci-metacamp.github.io/frontend/",