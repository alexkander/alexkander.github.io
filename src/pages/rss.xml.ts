import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { profile } from '../data/profile';
import { getPublishedPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).filter((post) => !post.data.draft);
  return rss({
    title: profile.name,
    description: profile.tagline,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/posts/${post.id}/`,
    })),
  });
}
