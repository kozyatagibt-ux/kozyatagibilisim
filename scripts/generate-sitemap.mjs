// Build sırasında veya manuel çalıştırılan sitemap üreticisi.
// Tüm statik route'ları + içerik dosyalarını gezip public/sitemap.xml'i yazar.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://kozyatagibilisim.com';
const today = new Date().toISOString().split('T')[0];

const STATIC = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
    { loc: '/hizmetler', changefreq: 'monthly', priority: '0.9' },
    { loc: '/sss', changefreq: 'monthly', priority: '0.6' },
    { loc: '/hakkimizda', changefreq: 'monthly', priority: '0.6' },
    // Pillars
    { loc: '/yonetilen-it-hizmetleri', changefreq: 'monthly', priority: '0.9' },
    { loc: '/kobi-siber-guvenlik', changefreq: 'monthly', priority: '0.9' },
    { loc: '/sirket-veri-yedekleme', changefreq: 'monthly', priority: '0.9' },
    { loc: '/kurumsal-network-kurulumu', changefreq: 'monthly', priority: '0.9' },
    // Yerel — genel
    { loc: '/istanbul-yonetilen-it-hizmetleri', changefreq: 'monthly', priority: '0.7' },
    { loc: '/anadolu-yakasi-kurumsal-bilisim', changefreq: 'monthly', priority: '0.7' },
    // Yerel — Anadolu Yakası ilçeler
    { loc: '/atasehir-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/kadikoy-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/maltepe-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/umraniye-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/uskudar-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/kartal-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/pendik-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/tuzla-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/cekmekoy-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/sancaktepe-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/sultanbeyli-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/beykoz-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/kozyatagi-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/kavacik-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/icerenkoy-it-destegi', changefreq: 'monthly', priority: '0.7' },
    // Yerel — Avrupa Yakası ilçeler
    { loc: '/levent-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/maslak-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/sisli-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/mecidiyekoy-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/besiktas-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/beyoglu-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/kagithane-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/sariyer-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/bakirkoy-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/bahcelievler-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/bagcilar-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/gunesli-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/beylikduzu-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/esenyurt-it-destegi', changefreq: 'monthly', priority: '0.7' },
    { loc: '/avcilar-it-destegi', changefreq: 'monthly', priority: '0.7' },
    // Sektörler
    { loc: '/sektorler', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/muhasebe-ofisi-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/hukuk-burosu-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/saglik-klinik-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/e-ticaret-it-altyapisi', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/lojistik-depo-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/egitim-kurumu-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/restoran-otel-it', changefreq: 'monthly', priority: '0.8' },
    { loc: '/sektorler/insaat-santiye-it', changefreq: 'monthly', priority: '0.8' },
    // Hizmetler
    { loc: '/hizmetler/sunucu-sanallastirma', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/kimlik-yonetimi', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/dosya-paylasim', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/ag-guvenligi-firewall', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/kurumsal-eposta', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/network-altyapi', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/son-kullanici-destek', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/felaket-kurtarma-yedekleme', changefreq: 'monthly', priority: '0.8' },
    { loc: '/hizmetler/it-saglik-kontrolu-denetim', changefreq: 'monthly', priority: '0.8' },
];

// Blog yazılarını dosya sisteminden topla
const blogDir = path.join(ROOT, 'src', 'content', 'blog');
const blogPosts = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''))
    : [];

const urls = [
    ...STATIC,
    ...blogPosts.map((slug) => ({ loc: `/blog/${slug}`, changefreq: 'monthly', priority: '0.7' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map(
            (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join('\n')}
</urlset>
`;

const outPath = path.join(ROOT, 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`sitemap.xml yazıldı: ${urls.length} URL`);
