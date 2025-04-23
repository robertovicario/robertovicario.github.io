import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

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
