import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { DEV_SERVER } from "./src/constants/env.js";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    port: DEV_SERVER.PORT,
    proxy: {
      "/api": {
        target: DEV_SERVER.API_PROXY,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },
});
