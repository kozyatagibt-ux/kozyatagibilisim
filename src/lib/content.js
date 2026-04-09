// Markdown içerik yükleyici. Vite glob ile build-time'da tüm .md dosyalarını içeri alır.
// Basit bir frontmatter parser kullanıyoruz (gray-matter bağımlılığı olmadan).

const pillarFiles = import.meta.glob('../content/pillars/*.md', { query: '?raw', import: 'default', eager: true });
const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

function parseFrontmatter(rawInput) {
    const raw = rawInput.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { data: {}, content: raw };
    const fmText = m[1];
    const content = m[2];
    const data = {};
    fmText.split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx === -1) return;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (/^\d+$/.test(val)) val = parseInt(val, 10);
        data[key] = val;
    });
    return { data, content };
}

function loadAll(files) {
    return Object.entries(files).map(([path, raw]) => {
        const { data, content } = parseFrontmatter(raw);
        return { ...data, content, path };
    });
}

export const pillars = loadAll(pillarFiles).sort((a, b) => (a.pillar || 0) - (b.pillar || 0));
export const blogPosts = loadAll(blogFiles).sort((a, b) => (a.pillar || 0) - (b.pillar || 0));

export const PILLAR_META = {
    1: {
        slug: 'yonetilen-it-hizmetleri',
        title: 'Yönetilen IT Hizmetleri',
        short: 'Yönetilen IT',
        color: 'cyan',
    },
    2: {
        slug: 'kobi-siber-guvenlik',
        title: 'KOBİ Siber Güvenlik',
        short: 'Siber Güvenlik',
        color: 'emerald',
    },
    3: {
        slug: 'sirket-veri-yedekleme',
        title: 'Şirket Veri Yedekleme',
        short: 'Veri Yedekleme',
        color: 'blue',
    },
    4: {
        slug: 'kurumsal-network-kurulumu',
        title: 'Kurumsal Network Kurulumu',
        short: 'Network',
        color: 'orange',
    },
    5: {
        slug: null,
        title: 'Yavaşlık & Performans Sorunları',
        short: 'Performans',
        color: 'yellow',
    },
    6: {
        slug: null,
        title: 'Bağlantı & Cihaz Sorunları',
        short: 'Bağlantı',
        color: 'rose',
    },
    7: {
        slug: null,
        title: 'Güvenlik & Tehdit Rehberleri',
        short: 'Güvenlik',
        color: 'red',
    },
    8: {
        slug: null,
        title: 'Office & Windows Sorunları',
        short: 'Office',
        color: 'violet',
    },
    9: {
        slug: null,
        title: 'Veri Kaybı & Dosya Kurtarma',
        short: 'Veri Kurtarma',
        color: 'amber',
    },
};

export function getPillar(slug) {
    return pillars.find((p) => p.slug === slug);
}

export function getBlogPost(slug) {
    return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post, limit = 3) {
    return blogPosts
        .filter((p) => p.slug !== post.slug && p.pillar === post.pillar)
        .slice(0, limit);
}

export function getPostsForPillar(pillarNum) {
    return blogPosts.filter((p) => p.pillar === pillarNum);
}
