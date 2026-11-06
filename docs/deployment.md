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

Deployed with Flux, following the home lab's convention for apps (`infrahomelab` repo, `docs/flux-apps.md`), with one difference: every push to `main` deploys, so publishing a post works the same on both targets.

1. **Image**: `Dockerfile` builds the site and serves `dist/` with an unprivileged nginx on port 8080 (`docker/nginx.conf`). It is pushed to `ghcr.io/alexkander/alexkander.github.io:<version>-<sha7>` (private), `<version>` being `package.json`'s.
2. **Release**: `scripts/deploy-homelab.sh` builds and pushes the image for `origin/main`, merges `main` into the `production` branch, and pins the tag in `deploy/kustomization.yaml` there. On `main`, `newTag` is always `unreleased`; never commit to `production` by hand except for a rollback.
3. **Deploy**: Flux applies `production`'s `deploy/` (Deployment and a NodePort Service, port 30980) to the `personal-website` namespace within 5 minutes. The namespace enforces Pod Security `restricted`, and the Deployment has no `replicas`.
4. **Exposure**: the home lab ingress routes `alexkander.dev` (the only hostname; there is no `www`) to the NodePort through a Cloudflare Tunnel; no ports are opened, and Cloudflare provides HTTPS and CDN caching.
5. **Logs**: nginx logs no client IP addresses. Access logs that carry IPs (ingress) must be kept for at most 14 days, as stated in the `/privacy` page (see [Privacy](privacy.md)).

The home lab side (Flux registration, pull secret, NodePort firewall, ingress route, DNS) lives in the `infrahomelab` repository.

### Deploying

- **Automatic**: `.github/workflows/deploy-homelab.yml` runs the script on every push to `main` that changes more than docs.
- **From GitHub**: run the workflow by hand (`workflow_dispatch`), e.g. `gh workflow run deploy-homelab.yml`.
- **Locally**: `pnpm deploy:homelab`, with `main` pushed and checked out, a clean working tree, `docker login ghcr.io` done with a token that has `write:packages`, and `yq` installed.

### Rollback

On `production`, `git revert` the `chore(deploy): release …` commit (or set an older tag in `deploy/kustomization.yaml`) and push. The next deploy overrides it, so fix or revert the change on `main` too. Never roll back with `kubectl`: Flux undoes it.
