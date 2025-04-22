import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
    integrations: [tailwind(), react()],
    vite: {
        resolve: {
            alias: {
                "@": "/src",
                "@components": "/src/components",
            },
        },
    },
    output: "static",
    build: {
        inlineStylesheets: "auto",
    },
    server: {
        host: true,
        port: 4321,
    },
});
