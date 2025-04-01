import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["path", "fs", "electron"], // 确保这些模块不会被打包
    },
  },
  define: {
    "process.env": {}, // 模拟 Node.js 的 process.env
    __dirname: JSON.stringify(__dirname), // 定义 __dirname
  },
});
