import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(
                path.dirname(new URL(import.meta.url).pathname),
                "./src"
            ),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
            "/wp-json": {
                target: "http://localhost:8000",
                changeOrigin: true,
            },
        },
    },
});
