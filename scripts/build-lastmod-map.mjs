// URL -> lastmod ISO-8601 map üretir.
// Kaynak dosyanın son git commit tarihini kullanır; yoksa fs mtime; yoksa today.
// Sonuç: scripts/lastmod-map.json  (hem astro.config.mjs hem generate-sitemap.mjs bunu okur)

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'lastmod-map.json');

const todayISO = new Date().toISOString();

function gitLastCommitISO(absFile) {
  try {
    const rel = path.relative(ROOT, absFile).replace(/\\/g, '/');
    const out = execSync(`git log -1 --format=%cI -- "${rel}"`, {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (out) return out;
  } catch {}
  try {
    return fs.statSync(absFile).mtime.toISOString();
  } catch {
    return todayISO;
  }
}

function walk(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, exts, out);
    else if (exts.some(e => name.endsWith(e))) out.push(full);
  }
  return out;
}

const map = {};

// 1) Blog collection
for (const f of walk(path.join(ROOT, 'src/content/blog'), ['.md'])) {
  const slug = path.basename(f, '.md');
  map[`/blog/${slug}`] = gitLastCommitISO(f);
}

// 2) Pillars collection
const PILLAR_MAP = {
  'yonetilen-it-hizmetleri.md': '/yonetilen-it-hizmetleri',
  'kobi-siber-guvenlik.md': '/kobi-siber-guvenlik',
  'sirket-veri-yedekleme.md': '/sirket-veri-yedekleme',
  'kurumsal-network-kurulumu.md': '/kurumsal-network-kurulumu',
};
for (const f of walk(path.join(ROOT, 'src/content/pillars'), ['.md'])) {
  const url = PILLAR_MAP[path.basename(f)];
  if (url) map[url] = gitLastCommitISO(f);
}

// 3) Statik astro sayfaları (src/pages/**/*.astro, dinamik [slug] hariç)
for (const f of walk(path.join(ROOT, 'src/pages'), ['.astro'])) {
  const rel = path.relative(path.join(ROOT, 'src/pages'), f).replace(/\\/g, '/');
  if (rel.includes('[')) continue; // dinamik
  let url = '/' + rel.replace(/\.astro$/, '').replace(/\/index$/, '');
  if (url === '/index') url = '/';
  map[url] = gitLastCommitISO(f);
}

// 4) Data-driven lokasyon/hood/cross/sektor sayfaları — tek dosya değişim tarihi
//    (daha iyi bir granülerlik için lokasyon data’sı split edildiğinde buraya detay eklenebilir)
const LOCATION_DATA_FILES = [
  'src/data/locals.js',
  'src/data/locals_avrupa1.js',
  'src/data/locals_avrupa2.js',
  'src/data/neighborhoods.js',
  'src/data/cross-pages.js',
  'src/data/sectors.js',
  'src/data/district-profiles.js',
].map(p => path.join(ROOT, p));
const LOCATION_DATA_DATE = LOCATION_DATA_FILES
  .filter(fs.existsSync)
  .map(gitLastCommitISO)
  .sort()
  .pop() || todayISO;

map['__LOCATION_DEFAULT__'] = LOCATION_DATA_DATE;
map['__BUILD__'] = todayISO;

fs.writeFileSync(OUT, JSON.stringify(map, null, 2));
console.log(`[lastmod-map] ${Object.keys(map).length} entries → ${path.relative(ROOT, OUT)}`);
