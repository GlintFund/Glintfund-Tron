import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import environment from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), environment("all", { prefix: "VITE_" })],
  server: {
    open: true, // automatically open in the browser
  },
});
