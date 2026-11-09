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
- The Products nav link is commented out in `src/layouts/Base.astro` until the first product exists.

## CV

`/cv` renders the profile data as a CV. It is not linked in the main navigation. Its print styles hide the site chrome, so printing the page to PDF from the browser produces the PDF (there is no button for it). Automated PDF generation at build time is pending.

## Privacy page

`/privacy` (`src/pages/privacy.astro`) is the public summary of [Privacy and compliance](privacy.md). Update both, and the page's "Last updated" date, whenever data processing changes.
