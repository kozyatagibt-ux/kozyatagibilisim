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
