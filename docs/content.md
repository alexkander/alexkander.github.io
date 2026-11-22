# Content

## Profile data

`src/data/profile.ts` is the single source of truth for personal and professional data (summary, experience, skills, education, interests). It feeds both the home page and the `/cv` page, so update it there and both stay in sync.

The profile must not include a location or phone number.

## Collections

Defined in `src/content.config.ts`. Each entry is a Markdown/MDX file whose filename becomes its URL slug.

| Collection | Folder | Route |
|---|---|---|
| `posts` | `src/content/posts/` | `/posts/<slug>/` |
| `projects` | `src/content/projects/` | `/projects/<slug>/` |
| `products` | `src/content/products/` | `/products/<slug>/` |

- **Posts** require `title`, `description`, and `date`; optional `updated`, `tags`, and `draft`. Drafts render in `pnpm dev` only, and are excluded from the build and RSS.
- **Projects and products** share one schema: `title`, `description`, `start` (year), optional `end` (omit for ongoing work), `role`, `client`, `stack`, `platforms`, `url`, `repo`, `status` (`active` | `archived`), and `featured`. Archived projects are listed under "Archive"; featured or active ones appear on the home page.
- Projects and products only describe the work and link to its own website (`url`) and source (`repo`): no prices, buy buttons, or sign-up forms (see [Privacy](privacy.md#non-commercial-site)).
- The Products nav link is commented out in `src/layouts/Base.astro` until the first product exists.

## Reserved paths

These paths are served by demos from other repositories (see [Privacy](privacy.md#demos-under-a-subpath)); no post, page, or file in `public/` may use them:

- `/eclipse-weather/`

When a path is added here, add it to `demoPaths` in `src/lib/links.ts` too (see [Links](#links)).

## Links

Links that leave the pages of this repository open in a new tab (`target="_blank"`): other sites, and the demos under the same domain (see [Reserved paths](#reserved-paths)). Links to the site's own pages, feeds, anchors, and `mailto:` open in the same tab.

- In `.astro` files, use `src/components/Link.astro` for any link that leaves the site or whose destination comes from data. It sets `target`, `rel`, and the notice for screen readers; do not write them by hand.
- In content, write normal Markdown links in `.mdx` files: they go through the same component. It does not apply to `.md` files or to a raw `<a>`, so use neither for these links.

## License

Posts are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): anyone may share and adapt them, including commercially, as long as they credit the author. This covers the text and the code snippets in each post.

- Every post page ends with the license notice, and the RSS feed carries it in `<copyright>`. Both come from `postLicense` in `src/lib/content.ts`.
- Only publish material you can license this way. Third-party content in a post (images, diagrams, long quotes) keeps its own license and must be credited next to it, e.g. "Image: Name, CC BY-SA 4.0"; leave it out if its license does not allow reuse.
- The license applies to posts only. Projects, products, the profile, and the CV are not covered.

## CV

`/cv` renders the profile data as a CV. It is not linked in the main navigation. Its print styles hide the site chrome, so printing the page to PDF from the browser produces the PDF (there is no button for it). Automated PDF generation at build time is pending.

## Privacy page

`/privacy` (`src/pages/privacy.astro`) is the public summary of [Privacy and compliance](privacy.md). Update both, and the page's "Last updated" date, whenever data processing changes.
