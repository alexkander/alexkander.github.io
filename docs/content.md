# Content

## Profile data

`src/data/profile.ts` is the single source of truth for personal data: name, tagline, contact links, and the texts written in the first person: `intro` on the home page, and `about` and `offWork` on `/about`.

The profile must not include a location or phone number.

The photo on the home page is `src/assets/profile.jpg` (a square crop, stripped of metadata, 672 px: three times the size it is shown at), described by `photoAlt`. Astro generates the optimized AVIF and WebP versions at build time. It is part of the profile, so it is not covered by the photo license (see [License](#license)).

## Collections

Defined in `src/content.config.ts`. Each entry is a Markdown/MDX file whose filename becomes its URL slug.

| Collection | Folder | Route |
|---|---|---|
| `posts` | `src/content/posts/` | `/posts/<slug>/` |
| `projects` | `src/content/projects/` | None (see below) |
| `products` | `src/content/products/` | `/products/<slug>/` |

- **Posts** require `title`, `description`, and `date`; optional `updated`, `tags`, and `draft`. Drafts render in `pnpm dev` only, and are excluded from the build and RSS.
- **Projects and products** share one schema: `title`, `description`, `start` (year), optional `end` (omit for ongoing work), `role`, `client`, `stack`, `platforms`, `url`, `repo`, `status` (`active` | `archived`), and `featured`. Archived entries are listed under "Archive".
- **Projects have no pages**: they were removed from the site until further notice. The collection is kept so they can come back.
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

| Content | License | In short |
|---|---|---|
| Text of the posts | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) | Share and adapt with credit, for non-commercial purposes |
| Code snippets in the posts | [MIT](https://opensource.org/license/mit) | Any use, keeping the copyright notice |
| Photos by the author | [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) | Share unmodified with credit, for non-commercial purposes |
| Demos | Apache 2.0, with a `NOTICE` file | Any use, keeping the license and the credit in `NOTICE` |
| Profile, projects, products, and the code of this site | None | All rights reserved |

Any other use, such as a commercial one of a text or a photo, needs the author's permission, requested by email.

- **Notices**: every post page ends with the license notice, and the RSS feed carries it in `<copyright>`. Both come from `licenses` in `src/lib/content.ts`. When a license changes, update that file, this section, and `README.md` in the same change.
- **Photos**: show the credit and the license next to each photo, e.g. "Photo: Alexander Rondón, CC BY-NC-ND 4.0", linking the license. Also write the author, the copyright, and the license in the file's metadata (IPTC/XMP), after stripping everything else (see [Public repository](public-repository.md#keep-in-mind)). Image processing at build time may drop that metadata, so the visible credit is always required.
- **Demos**: the license lives in each demo's own repository: the full text in `LICENSE`, and in `NOTICE` the name of the demo, the author, and a link to `alexkander.dev`. It covers only the demo's own code; third-party data, maps, and libraries keep their licenses and credits.
- **Third-party content** in a post (images, diagrams, long quotes) keeps its own license and must be credited next to it, e.g. "Image: Name, CC BY-SA 4.0"; leave it out if its license does not allow reuse. Do not adapt ShareAlike material into a text, because it would have to be published under its license instead.
- **Contributions** from other people are accepted only if the author can license them under the terms above.

## Privacy page

`/privacy` (`src/pages/privacy.astro`) is the public summary of [Privacy and compliance](privacy.md). Update both, and the page's "Last updated" date, whenever data processing changes.
