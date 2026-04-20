import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    type: z.string().optional(),
    pillar: z.coerce.number().optional(),
    url: z.string().optional(),
    hedef_anahtar_kelime: z.string().optional(),
    meta_description: z.string().optional(),
    kelime_sayisi: z.string().optional(),
    pillar_linki: z.string().optional(),
    troubleshoot: z.boolean().optional(),
    error_code: z.string().optional(),
    product_family: z.string().optional(),
    // Bilinen Sorunlar Bülteni alanları
    bulten: z.boolean().optional(),
    date: z.coerce.date().optional(),
    last_updated: z.coerce.date().optional(),
    status: z.enum(['aktif', 'gecici_cozum', 'cozuldu']).optional(),
    severity: z.enum(['dusuk', 'orta', 'yuksek', 'kritik']).optional(),
    affected_versions: z.string().optional(),
    fixed_version: z.string().optional(),
    vendor_advisory: z.string().optional(),
    workaround_available: z.boolean().optional(),
    // Saha Hikayesi alanı
    hikaye: z.boolean().optional(),
  }),
});

const pillars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pillars' }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    type: z.string().optional(),
    pillar: z.coerce.number().optional(),
    url: z.string().optional(),
    hedef_anahtar_kelime: z.string().optional(),
    meta_description: z.string().optional(),
    kelime_sayisi: z.string().optional(),
  }),
});

export const collections = { blog, pillars };
