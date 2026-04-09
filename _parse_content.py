import re, os, json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open(r'C:\Users\Pala\Desktop\kozyatagibilisim\icerik_kutuphanesi.txt', encoding='utf-8').read()
lines = src.split('\n')

entries = []
N = len(lines)
marker_re = re.compile(r'^(PİLLAR\s+\d+|CLUSTER\s+\d+\.\d+)\s*$')
for i, ln in enumerate(lines):
    if marker_re.match(ln.strip()):
        entries.append((i, ln.strip()))
entries.append((N, 'END'))

PILLAR_OF_CLUSTER = {f'{p}.{c}': p for p in range(1,5) for c in range(1,5)}
PILLAR_SLUGS = {
    1: 'yonetilen-it-hizmetleri',
    2: 'kobi-siber-guvenlik',
    3: 'sirket-veri-yedekleme',
    4: 'kurumsal-network-kurulumu',
}

def heuristic_md(body_lines):
    out = []
    n = len(body_lines)
    j = 0

    def looks_like_heading(s):
        # Heading olamaz: çok uzun, terminal noktalama, içinde virgül/iki nokta, rakam+- dash kalıbı
        if not (4 <= len(s) <= 80): return False
        if s[-1] in '.,:;?!"\')]…—': return False
        if ',' in s: return False
        if ': ' in s: return False  # "Senaryo 1: Küçük Ofis" gibi inline label
        if ' — ' in s: return False
        if ' - ' in s: return False
        if not s[0:1].isupper() and not s[0:1].isdigit(): return False
        if ' ' not in s: return False
        # Çok küçük harfli kelime oranı yüksekse muhtemelen paragraf
        words = s.split()
        if len(words) > 12: return False
        # En az bir kelime büyük harfle başlamalı (lower-case ratio kontrolü)
        return True

    while j < n:
        ln = body_lines[j].rstrip()
        stripped = ln.strip()
        if not stripped:
            out.append('')
            j += 1
            continue
        # Numbered subsection: "1. Öngörülebilir Maliyet"
        m = re.match(r'^(\d+)\.\s+([A-ZİĞÜŞÇÖ].{3,75})$', stripped)
        if m and looks_like_heading(m.group(2)):
            k = j + 1
            while k < n and not body_lines[k].strip():
                k += 1
            if k < n and len(body_lines[k].strip()) > 100:
                out.append(f'### {stripped}')
                j += 1
                continue
        # Heading heuristic
        if looks_like_heading(stripped):
            k = j + 1
            while k < n and not body_lines[k].strip():
                k += 1
            if k < n and len(body_lines[k].strip()) > 100:
                out.append(f'## {stripped}')
                j += 1
                continue
        out.append(stripped)
        j += 1

    # Merge consecutive paragraph lines
    merged = []
    buf = []
    def flush():
        if buf:
            merged.append(' '.join(buf))
            buf.clear()
    for ln in out:
        if ln.startswith('#'):
            flush()
            merged.append('')
            merged.append(ln)
            merged.append('')
        elif not ln:
            flush()
            merged.append('')
        else:
            buf.append(ln)
    flush()
    final = []
    prev_blank = False
    for ln in merged:
        if not ln.strip():
            if prev_blank: continue
            prev_blank = True
            final.append('')
        else:
            prev_blank = False
            final.append(ln)
    return '\n'.join(final).strip() + '\n'

META_FIELDS = ['URL', 'Hedef Anahtar Kelime', 'Hedef KW', 'İkincil Kelimeler', 'İkincil KW',
               'Meta Description', 'Kelime Sayısı', 'İç Linkler', 'Niyet', 'Hedef Kitle',
               'Pillar Linki', 'CTA']

def parse_meta(meta_lines):
    meta = {}
    cur_key = None
    body_start = len(meta_lines)
    for idx, ln in enumerate(meta_lines):
        s = ln.strip()
        matched_field = None
        for f in META_FIELDS:
            if s.startswith(f + ':'):
                matched_field = f
                break
        if matched_field:
            cur_key = matched_field
            meta[cur_key] = s[len(matched_field)+1:].strip()
            continue
        # If not matched and we have a cur_key and line looks like continuation
        if cur_key and s and not re.match(r'^[A-ZİĞÜŞÇÖ][a-zA-ZİĞÜŞÇÖıiğüşçö ]{2,30}:', s):
            # Continuation only if cur key is one of the multi-line ones AND line is short-ish
            if cur_key in ('Meta Description', 'İç Linkler', 'İkincil Kelimeler', 'İkincil KW') and len(s) < 200:
                meta[cur_key] += ' ' + s
                continue
        # Body started
        body_start = idx
        break
    return meta, body_start

results = []
for k in range(len(entries) - 1):
    start, marker = entries[k]
    end = entries[k+1][0]
    block = lines[start:end]
    if not block: continue
    marker_line = block[0].strip()
    # Title may span multiple lines until "URL:" appears
    ti = 1
    title_parts = []
    while ti < len(block) and not block[ti].strip().startswith('URL:'):
        if block[ti].strip():
            title_parts.append(block[ti].strip())
        ti += 1
    title = ' '.join(title_parts)
    rest = block[ti:]
    meta, bs = parse_meta(rest)
    body = rest[bs:]
    body_md = heuristic_md(body)

    if marker_line.startswith('PİLLAR'):
        num = int(marker_line.split()[1])
        slug = PILLAR_SLUGS[num]
        ctype = 'pillar'
        pillar_num = num
    else:
        xy = marker_line.split()[1]
        pillar_num = PILLAR_OF_CLUSTER[xy]
        url = meta.get('URL', '')
        slug = url.replace('/blog/', '').strip('/')
        ctype = 'cluster'

    results.append({
        'type': ctype,
        'slug': slug,
        'title': title,
        'pillar': pillar_num,
        'meta': meta,
        'body': body_md,
    })

out_dir = r'C:\Users\Pala\Desktop\kozyatagibilisim\src\content'
os.makedirs(os.path.join(out_dir, 'pillars'), exist_ok=True)
os.makedirs(os.path.join(out_dir, 'blog'), exist_ok=True)

def slugify_key(k):
    repl = {'ı':'i','ç':'c','ş':'s','ğ':'g','ü':'u','ö':'o','İ':'i','Ç':'c','Ş':'s','Ğ':'g','Ü':'u','Ö':'o'}
    out = ''.join(repl.get(ch, ch) for ch in k)
    return out.lower().replace(' ', '_')

for r in results:
    fm = ['---']
    fm.append(f'slug: {r["slug"]}')
    safe_title = r["title"].replace('"', "'")
    fm.append(f'title: "{safe_title}"')
    fm.append(f'type: {r["type"]}')
    fm.append(f'pillar: {r["pillar"]}')
    for kk, vv in r['meta'].items():
        key = slugify_key(kk)
        v = vv.replace('"', "'").replace('\n', ' ').strip()
        fm.append(f'{key}: "{v}"')
    fm.append('---')
    fm.append('')
    content = '\n'.join(fm) + '\n' + r['body']
    sub = 'pillars' if r['type'] == 'pillar' else 'blog'
    path = os.path.join(out_dir, sub, r['slug'] + '.md')
    open(path, 'w', encoding='utf-8').write(content)

print(f'Wrote {len(results)} files')
for r in results:
    print(f"  {r['type']:7s} P{r['pillar']} /{r['slug']:45s} {r['title'][:60]}")
