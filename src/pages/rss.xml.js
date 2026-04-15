import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');

  // Slug'a göre sırala (tutarlı sıralama)
  posts.sort((a, b) => (a.data.slug || a.id).localeCompare(b.data.slug || b.id));

  return rss({
    title: 'Kozyatağı Bilişim — Blog & Rehberler',
    description: "İstanbul KOBİ'leri için yönetilen IT, siber güvenlik, veri yedekleme ve kurumsal network rehberleri.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.meta_description || '',
      link: `/blog/${post.data.slug || post.id}`,
      pubDate: new Date('2026-04-15'),
    })),
    customData: '<language>tr-TR</language>',
  });
}
