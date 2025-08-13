import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const site = 'https://weddedpod.com';
const asDate = (d: Date | string) => (typeof d === 'string' ? new Date(d) : d);

export async function GET() {
  const now = new Date();

  // Include everything in DEV; in PROD exclude drafts + future-dated posts
  const posts = (await getCollection(
    'blog',
    ({ data }: { data: CollectionEntry<'blog'>['data'] }) => {
      if (import.meta.env.DEV) return true;
      const isDraft = !!data.draft;
      const postDate = asDate(data.pubDate);
      const isFuture = postDate.getTime() > now.getTime();
      return !isDraft && !isFuture;
    }
  )) as CollectionEntry<'blog'>[];

  const sorted = posts
    .filter(p => p.data.pubDate)
    .sort((a, b) => asDate(b.data.pubDate).getTime() - asDate(a.data.pubDate).getTime());

  return rss({
    title: 'Wedded Blog',
    description: 'Latest blog posts from Wedded',
    site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: asDate(post.data.pubDate),
      link: `/${post.slug}`, // keep legacy path
      description: post.data.description,
      content: `
        <p><img src="${site}${post.data.image}" alt="${post.data.title}" style="max-width:100%; height:auto;" /></p>
        <p>${post.data.description}</p>
        <p><a href="${site}/${post.slug}">Read more →</a></p>
      `,
    })),
  });
}
