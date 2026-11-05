# Architecture

## Stack

- **Astro** with **TypeScript**, built as a fully static site (SSG).
- **React** islands only where interactivity is needed; pages ship zero JS by default.
- Styling is undecided until the design system is defined (see [Design](design.md)).

## Content

Content lives in the repo as Markdown/MDX, managed with Astro content collections (typed frontmatter schemas; details in [Content](content.md)):

| Collection | Purpose |
|---|---|
| `posts` | Blog posts: things learned about software development, AI, homelabs, self-hosting, and updates on current work |
| `projects` | Projects built or in progress |
| `products` | Products built or maintained |

Profile data (experience, skills, etc.) lives in `src/data/profile.ts` instead of a collection.

Publishing a post means adding an `.mdx` file to its collection and pushing. A git-based CMS (Keystatic or Decap) may be added later without changing the storage model.

## Planned features

- RSS feed, sitemap, tags.
- Syntax highlighting (Shiki).
- Open Graph images for posts.
- CV generated from the repo: a `/cv` page and a downloadable PDF built from the same profile data as the rest of the site, so both stay in sync.

## Out of scope

- **Booking consultations** is not part of the site. It is handled by a separate service (e.g. self-hosted Cal.com), and the site only links to it.
- **i18n**: the site is English-only.
