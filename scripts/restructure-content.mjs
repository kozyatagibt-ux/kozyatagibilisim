// Md içeriklerini yeniden yapılandırır.
// Mevcut başlıkları (#, ##, ###) korur, sadece UZUN paragraf bloklarına müdahale eder:
//   - "Adım N:", "Senaryo N:" → ### başlık
//   - Bilinen bölüm adları → ## başlık
//   - Cümleleri 3'lük gruplar halinde paragraflara böler
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const H2_PATTERNS = [
    'Giriş', 'Sonuç', 'Özet', 'Yapmamanız Gerekenler', 'Yapılması Gerekenler',
    'Ne Zaman Profesyonel Yardım Almalı', 'Sık Yapılan Hatalar', 'Sıkça Sorulan Sorular',
    'Kontrol Listesi', 'Checklist', 'Maliyet Karşılaştırması', 'Avantajlar', 'Dezavantajlar',
    'Nasıl Başlanır', 'Pratik Öneriler', 'Önemli Notlar', 'Uygulama', 'Alternatifler',
    'Maliyet Tahmini', 'AD Kurulumu İçin Neler Gerekir', 'Active Directory Ne İşe Yarar',
    'Neden Önemli', 'Nasıl Çalışır', 'Adım Adım', 'En İyi Uygulamalar',
];

const H3_REGEX = /\b(Adım\s+\d+|Senaryo\s+\d+|Aşama\s+\d+|Faz\s+\d+)\s*:/g;

// Tek bir paragraf bloğunu yeniden yapılandır
function restructureParagraph(text) {
    if (!text || text.length < 300) return text;

    let t = text.replace(/\s+/g, ' ').trim();

    // 1) Bilinen H2 başlıklarını yakala (cümle sonundan sonra geliyorsa)
    for (const h of H2_PATTERNS) {
        const re = new RegExp(`(^|[\\.\\!\\?]\\s+)(${escapeRegex(h)})(\\s+)(?=[A-ZİĞÜŞÇÖ"\\d])`, 'g');
        t = t.replace(re, (_m, pre) => `${pre.trim()}\n\n## ${h}\n\n`);
    }

    // 2) Adım N / Senaryo N → H3
    t = t.replace(H3_REGEX, (m) => `\n\n### ${m.replace(/:$/, '')}\n\n`);

    // 3) Blokları ayır, her blok için paragraf böl
    const blocks = t.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
    const out = [];
    for (const b of blocks) {
        if (b.startsWith('#')) {
            out.push(b);
            continue;
        }
        const sentences = b.match(/[^\.\!\?]+[\.\!\?]+["')\]]?(?:\s+|$)/g) || [b];
        const PER = 3;
        const paras = [];
        for (let i = 0; i < sentences.length; i += PER) {
            paras.push(sentences.slice(i, i + PER).join('').trim());
        }
        out.push(paras.join('\n\n'));
    }
    return out.join('\n\n');
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function restructureBody(body) {
    // Mevcut satırları koru, sadece her bir bloğa ayrı ayrı bak
    const lines = body.replace(/\r\n/g, '\n').split('\n');
    const result = [];
    let buf = [];
    const flush = () => {
        if (!buf.length) return;
        const blockText = buf.join(' ').trim();
        buf = [];
        if (!blockText) return;
        result.push(restructureParagraph(blockText));
    };
    for (const line of lines) {
        const stripped = line.trim();
        if (!stripped) {
            flush();
            result.push('');
            continue;
        }
        // Mevcut başlık satırı
        const hMatch = stripped.match(/^(#{1,6})\s+(.*)$/);
        if (hMatch) {
            flush();
            const hashes = hMatch[1];
            const rest = hMatch[2];
            // Patolojik durum: başlık çok uzunsa ilk 6-8 kelimeyi başlık say, kalanı paragraf yap
            if (rest.length > 100) {
                const words = rest.split(/\s+/);
                let take = 6;
                // Başlığa noktalama gelmesin
                while (take < 9 && take < words.length && !/[\.\!\?,:]$/.test(words[take - 1])) take++;
                const heading = words.slice(0, take).join(' ').replace(/[\.,:;]$/, '');
                const body = words.slice(take).join(' ');
                result.push('');
                result.push(`${hashes} ${heading}`);
                result.push('');
                if (body) buf.push(body);
                continue;
            }
            result.push('');
            result.push(stripped);
            result.push('');
            continue;
        }
        buf.push(stripped);
    }
    flush();
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function processFile(file) {
    const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const m = raw.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
    if (!m) {
        console.warn('  ! frontmatter yok:', file);
        return;
    }
    const fm = m[1];
    const body = m[2];
    const newBody = restructureBody(body);
    if (newBody.trim() === body.trim()) {
        console.log('  · değişmedi:', path.basename(file));
        return;
    }
    fs.writeFileSync(file, fm + '\n' + newBody, 'utf8');
    console.log('  ✓ güncellendi:', path.basename(file));
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.md')) processFile(path.join(dir, f));
    }
}

console.log('Blog:');
walk(path.join(ROOT, 'src', 'content', 'blog'));
console.log('Pillar:');
walk(path.join(ROOT, 'src', 'content', 'pillars'));
console.log('Tamamlandı.');
