import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __configDir = path.dirname(fileURLToPath(import.meta.url));
let lastmodMap = {};
try {
  lastmodMap = JSON.parse(fs.readFileSync(path.join(__configDir, 'scripts/lastmod-map.json'), 'utf8'));
} catch {
  // prebuild henüz koşmamışsa boş map ile devam et
}
const BUILD_ISO = lastmodMap.__BUILD__ || new Date().toISOString();
const LOCATION_ISO = lastmodMap.__LOCATION_DEFAULT__ || BUILD_ISO;
const LOCATION_RE = /-(it-destegi|sunucu-kurulumu|active-directory-kurulumu|dosya-paylasim-nas|firewall-kurulumu|kurumsal-eposta|network-kurulumu|bilgisayar-destek|veri-yedekleme|it-denetim)\/?$/;

function resolveLastmod(url) {
  try {
    const u = new URL(url);
    let p = u.pathname.replace(/\/$/, '');
    if (!p) p = '/';
    if (lastmodMap[p]) return lastmodMap[p];
    if (LOCATION_RE.test(p)) return LOCATION_ISO;
    return BUILD_ISO;
  } catch {
    return BUILD_ISO;
  }
}

export default defineConfig({
  site: 'https://kozyatagibilisim.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/tesekkurler') && !page.includes('/404'),
      serialize(item) {
        // changefreq ve priority tamamen kaldırıldı — Google bunları görmezden geliyor.
        // Sadece lastmod kullanıyoruz (ISO 8601).
        item.lastmod = resolveLastmod(item.url);
        delete item.changefreq;
        delete item.priority;
        return item;
      },
    }),
  ],
  vite: {
    cacheDir: '/tmp/vite-cache',
  },
});
