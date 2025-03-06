// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { ViteToml } from 'vite-plugin-toml';

// https://astro.build/config
export default defineConfig({
  site: "https://bestmeditationapps.com",
  integrations: [
    vue(),
    tailwind(),
    mdx(),
    icon(),
    sitemap()
  ],
  vite: {
    plugins: [ViteToml()]
  }
});