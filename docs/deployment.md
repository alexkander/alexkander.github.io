# Deployment

The same static build is published to two targets:

| Target | URL | Role |
|---|---|---|
| GitHub Pages | https://alexkander.github.io/ | Mirror, always available |
| Home lab (self-hosted) | https://alexkander.dev/ | Canonical |

`site` in `astro.config.mjs` is `https://alexkander.dev` for both builds, so canonical URLs, the sitemap, RSS, and Open Graph tags always point to the canonical domain and the mirror does not compete with it in search results. Internal links are root-relative, so the same output works on both hosts.

## GitHub Pages

- The repository must be named `alexkander.github.io` (user site served at the root) and be public.
- `.github/workflows/deploy-pages.yml` builds with `withastro/action` and deploys with `actions/deploy-pages` on every push to `main` (or manually via `workflow_dispatch`).
- In the repository settings, **Pages → Source** must be **GitHub Actions**.
- Do **not** configure a custom domain in Pages: it would redirect `alexkander.github.io` to `alexkander.dev`, and `alexkander.dev` is served by the home lab.

## Home lab

Pending implementation.

1. **Build**: GitHub Actions builds the static site and packages it into a lightweight Docker image (static file server), pushed to GHCR.
2. **Deploy**: the image runs on the home lab **k3s** cluster, reconciled by **Flux** (GitOps).
3. **Exposure**: a **Cloudflare Tunnel** (`cloudflared`) routes `alexkander.dev` to the cluster; no ports are opened, and Cloudflare provides HTTPS and CDN caching.
4. **Logs**: web server access logs must be kept for at most 14 days, as stated in the `/privacy` page (see [Privacy](privacy.md)).
