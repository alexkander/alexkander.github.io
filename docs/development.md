# Development

Requires Node.js (see `engines` in `package.json`) and pnpm.

| Command | Description |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server (draft posts are visible) |
| `pnpm build` | Build the static site into `dist/` (drafts excluded) |
| `pnpm preview` | Serve the production build locally |
| `pnpm check` | Type-check `.astro` and `.ts` files |

When an agent starts the dev server, use background mode: `pnpm astro dev --background`, and manage it with `pnpm astro dev stop | status | logs`.

There are no tests yet; `pnpm check` and `pnpm build` are the verification steps.

- `astro check` does not support TypeScript 7, so `typescript` is pinned to v6.
- The build warns about empty collections (`projects`, `products`); this is expected until their first entries are added.

Astro docs: https://docs.astro.build
