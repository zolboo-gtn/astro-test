import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  experimental: {
    i18n: {
      defaultLocale: "mn",
      locales: ["en", "ja", "mn"],
    },
  },
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel({ edgeMiddleware: true }),
});
