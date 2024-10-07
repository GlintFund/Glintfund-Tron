import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // environment("all", { prefix: "VITE_" }),
    environment("all", { prefix: "REACT_APP_" }),
  ],
});
