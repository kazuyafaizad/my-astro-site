import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://kazuyafaizad.github.io",
  integrations: [preact(), tailwind(), partytown()]
});
