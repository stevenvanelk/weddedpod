import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function GET() {
  const blogPosts = await getCollection('blog');

  return rss({
    title: 'Wedding Photo Hangover Blog',
    description: 'Latest blog posts from Wedding Photo Hangover',
    site: 'https://weddinghangover.com',
    items: blogPosts.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      link: `/${post.slug}`,
      description: post.data.description,
      content: `
        <img src="${post.data.image}" alt="${post.data.title}" style="max-width:100%; height:auto;" />
        <p>${post.data.description}</p>
        <p><a href="https://weddinghangover.com/${post.slug}">Read more →</a></p>
      `
    })),
  });
}
