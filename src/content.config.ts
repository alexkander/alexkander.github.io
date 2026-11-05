import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drafts are rendered in dev but excluded from production builds.
    draft: z.boolean().default(false),
  }),
});

// Shared by projects and products.
const work = z.object({
  title: z.string(),
  description: z.string(),
  // Year range; omit `end` for ongoing work.
  start: z.number().int(),
  end: z.number().int().optional(),
  role: z.string().optional(),
  client: z.string().optional(),
  stack: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  url: z.url().optional(),
  repo: z.url().optional(),
  status: z.enum(['active', 'archived']).default('active'),
  featured: z.boolean().default(false),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: work,
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: work,
});

export const collections = { posts, projects, products };
