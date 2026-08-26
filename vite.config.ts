import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["aliens-storable-consumer.ngrok-free.dev"],
    // Local-only: proxies to scripts/dev-api-server.mjs (`npm run dev:api`),
    // which runs the api/ Vercel functions over plain Node http so the real
    // forms work against real endpoints in dev. Vercel serves api/ natively
    // in production, so this proxy is inert there.
    proxy: {
      "/api": "http://localhost:3101",
    },
  },
});
