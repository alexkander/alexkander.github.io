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

Profile data lives in `src/data/profile.ts` instead of a collection.

Publishing a post means adding an `.mdx` file to its collection and pushing. A git-based CMS (Keystatic or Decap) may be added later without changing the storage model.

## Analytics

Traffic is measured with self-hosted, cookieless Umami (`src/components/Analytics.astro`), only in production builds and only on `alexkander.dev`. Requirements are in [Privacy](privacy.md#analytics).

## Planned features

- RSS feed, sitemap, tags.
- Syntax highlighting (Shiki).
- Open Graph images for posts.

## Out of scope

- **Anything commercial**: prices, checkout, ads, sponsorships, or booking. The site is a non-commercial personal profile (see [Privacy](privacy.md#non-commercial-site)).
- **i18n**: the site is English-only.
