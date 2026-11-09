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

The built `dist/` is uploaded to a bucket on the home lab's S3 storage (Garage), whose web endpoint serves it. Every push to `main` deploys, so publishing a post works the same on both targets.

1. **Upload**: `scripts/deploy-s3.sh` builds the site and syncs `dist/` to the `alexkander.dev` bucket through the S3 API at `https://s3.home.alexkander.dev` (region `garage`, reachable from the tailnet). It syncs in three passes, so a visitor never gets a page whose assets are not there yet: the hashed assets in `_astro/` first (with `Cache-Control: public, max-age=31536000, immutable`), then the pages, then a pass with `--delete` that removes files the build dropped.
2. **Serving**: Garage's web endpoint serves `index.html` for directories, redirects `/dir` to `/dir/`, and uses `404.html` as the error page. `Cache-Control` comes from each object's metadata. It does not compress: Cloudflare does. It logs no requests or IPs.
3. **Exposure**: the home lab ingress routes `alexkander.dev` (and `www.alexkander.dev`, redirected to it with a 301) through a Cloudflare Tunnel; no ports are opened, and Cloudflare provides HTTPS, compression, and CDN caching.
4. **Logs**: the ingress keeps its raw access log, which carries IPs, in a file rotated daily with 14 kept. It strips `X-Forwarded-For` and `Cf-Connecting-Ip` from this site's lines before shipping them to Loki, which keeps them for 14 days. Any log that carries IPs must be kept for at most 14 days, as stated in the `/privacy` page (see [Privacy](privacy.md)).

The home lab side (bucket, its key, the web endpoint, ingress route, DNS) lives in the `infrahomelab` repository (`docs/s3.md`).

> **Migration in progress.** The site used to be served by a container (forge image + Flux, from the `production` branch, built from `Dockerfile`, `docker/nginx.conf`, `deploy/`, and `scripts/deploy-homelab.sh`). Flux keeps serving `alexkander.dev` from `production` until the home lab switches the route to the bucket; those files and the branch are removed after that.

### Deploying

- **Automatic**: `.github/workflows/deploy-homelab.yml` runs the script on every push to `main` that changes more than docs. It joins the tailnet with `tailscale/github-action` (workload identity federation, from the repository variables `TS_OAUTH_CLIENT_ID` and `TS_AUDIENCE`; no Tailscale secret) and uses the bucket key from the repository secrets `GARAGE_ACCESS_KEY_ID` and `GARAGE_SECRET_ACCESS_KEY` (read and write on this bucket only); without them it is skipped.
- **From GitHub**: run the workflow by hand (`workflow_dispatch`), e.g. `gh workflow run deploy-homelab.yml`.
- **Locally**: `pnpm deploy:homelab`, with `main` pushed and checked out, a clean working tree, the machine on the tailnet, the AWS CLI installed, and `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` set to the bucket key.

### Rollback

Re-run the workflow on an earlier commit. `workflow_dispatch` takes a branch or tag, not a commit, so push one first: `git push origin <commit>:refs/heads/rollback`, then `gh workflow run deploy-homelab.yml --ref rollback`, and delete the branch afterwards. Alternatively, check out that commit and run `CI=1 scripts/deploy-s3.sh` locally (`CI=1` skips the `origin/main` check). Either way the commit must already use the bucket deploy. The next push to `main` deploys `main` again, so fix or revert the change there too.
