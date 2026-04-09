// Blog yazıları için RSS feed üretir → public/rss.xml
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://kozyatagibilisim.com';

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) return {};
    const data = {};
    m[1].split(/\r?\n/).forEach((line) => {
        const idx = line.indexOf(':');
        if (idx === -1) return;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        data[key] = val;
    });
    return data;
}

const blogDir = path.join(ROOT, 'src', 'content', 'blog');
const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')) : [];

const items = files.map((f) => {
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const fm = parseFrontmatter(raw);
    return {
        title: fm.title || f.replace('.md', ''),
        slug: fm.slug || f.replace('.md', ''),
        description: fm.meta_description || '',
    };
});

const now = new Date().toUTCString();
const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kozyatağı Bilişim — Blog &amp; Rehberler</title>
    <link>${SITE}/blog</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>İstanbul KOBİ\'leri için yönetilen IT, siber güvenlik, veri yedekleme ve kurumsal network rehberleri.</description>
    <language>tr-TR</language>
    <lastBuildDate>${now}</lastBuildDate>
${items
        .map(
            (it) => `    <item>
      <title>${escape(it.title)}</title>
      <link>${SITE}/blog/${it.slug}</link>
      <guid>${SITE}/blog/${it.slug}</guid>
      <description>${escape(it.description)}</description>
      <pubDate>${now}</pubDate>
    </item>`
        )
        .join('\n')}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(ROOT, 'public', 'rss.xml'), xml, 'utf8');
console.log(`rss.xml yazıldı: ${items.length} yazı`);
