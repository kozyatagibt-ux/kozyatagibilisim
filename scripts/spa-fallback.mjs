// GitHub Pages için SPA fallback: dist/index.html → dist/404.html
// Böylece /blog, /yonetilen-it-hizmetleri gibi URL'ler doğrudan açıldığında
// 404 yerine SPA yüklenir ve react-router doğru route'u render eder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '..', 'dist');
const src = path.join(dist, 'index.html');
const dst = path.join(dist, '404.html');

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log('SPA fallback: 404.html oluşturuldu');
} else {
    console.warn('dist/index.html bulunamadı, fallback atlandı');
}
