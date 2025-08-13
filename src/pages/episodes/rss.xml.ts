import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function GET() {
  const blogPosts = await getCollection('episodes');

  return rss({
    title: 'Wedded Podcast Episodes',
    description: 'Latest podcast posts from Wedded',
    site: 'https://weddedpod.com',
    items: blogPosts.map((post: CollectionEntry<'episodes'>) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate),
      link: `/${post.slug}`,
      description: post.data.description,
      content: `
        <img src="${post.data.image}" alt="${post.data.title}" style="max-width:100%; height:auto;" />
        <p>${post.data.description}</p>
        <p><a href="https://weddedpod.com/${post.slug}">Read more →</a></p>
      `
    })),
  });
}
