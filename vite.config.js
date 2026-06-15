import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "ananti",
  plugins: [react()],
  base: "/memo-app/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
