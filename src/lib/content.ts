import { getCollection, type CollectionEntry } from 'astro:content';

/** Licenses of the published content (docs/content.md → License). */
export const licenses = {
  text: { name: 'CC BY-NC 4.0', url: 'https://creativecommons.org/licenses/by-nc/4.0/' },
  code: { name: 'MIT', url: 'https://opensource.org/license/mit' },
  photos: { name: 'CC BY-NC-ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' },
} as const;

export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getWork<C extends 'projects' | 'products'>(collection: C) {
  const entries = await getCollection(collection);
  // Ongoing work first, then most recent.
  return entries.sort((a, b) => (b.data.end ?? Infinity) - (a.data.end ?? Infinity) || b.data.start - a.data.start);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function formatYears(start: number, end?: number): string {
  if (end === undefined) return `${start} – present`;
  return start === end ? `${start}` : `${start} – ${end}`;
}
