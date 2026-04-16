import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

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
        // Ana sayfa ve pillar sayfalar en yüksek öncelik
        if (item.url === 'https://kozyatagibilisim.com/' ||
            item.url.includes('/yonetilen-it-hizmetleri') ||
            item.url.includes('/kobi-siber-guvenlik') ||
            item.url.includes('/sirket-veri-yedekleme') ||
            item.url.includes('/kurumsal-network-kurulumu')) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        // Hizmet sayfaları
        else if (item.url.includes('/hizmetler/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // İlçe sayfaları
        else if (item.url.match(/-it-destegi\/?$/) && !item.url.includes('-merkez-')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // SSS, Hakkımızda, Hizmetler index
        else if (item.url.match(/\/(sss|hakkimizda|hizmetler)\/?$/)) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Blog yazıları
        else if (item.url.includes('/blog/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Çapraz sayfalar ve mahalle sayfaları
        else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    cacheDir: '/tmp/vite-cache',
  },
});
