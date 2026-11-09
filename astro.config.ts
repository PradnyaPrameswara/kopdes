import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.KOPDES_PAGES_PREVIEW === 'true' ? 'https://pradnyaprameswara.github.io' : 'https://kopdesmerahputih.id',
  base: process.env.KOPDES_PAGES_PREVIEW === 'true' ? '/kopdes/' : '/',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
