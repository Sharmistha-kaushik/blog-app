import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ Add this import
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // 👇 This line fixes the "global is not defined" error
    global: "window",
  },
  resolve: {
    alias: {
      // sometimes helps for crypto/randombytes-related packages
      buffer: "buffer",
    },
  },
});
