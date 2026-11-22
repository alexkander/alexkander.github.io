# Deployment

The same static build is published to two targets:

| Target | URL | Role |
|---|---|---|
| GitHub Pages | https://alexkander.github.io/ | Mirror, always available |
| Self-hosted | https://alexkander.dev/ | Canonical |

`site` in `astro.config.mjs` is `https://alexkander.dev` for both builds, so canonical URLs, the sitemap, RSS, and Open Graph tags always point to the canonical domain and the mirror does not compete with it in search results. Internal links are root-relative, so the same output works on both hosts.

Every push to `main` deploys to both targets, so publishing a post needs no other step. The footer shows the short hash of the commit each build comes from, linked to it on GitHub, so you can tell which version each target is serving.

## GitHub Pages

- The repository must be named `alexkander.github.io` (user site served at the root) and be public.
- In the repository settings, **Pages → Source** must be **GitHub Actions**.
- Do **not** configure a custom domain in Pages: it would redirect `alexkander.github.io` to `alexkander.dev`, which is self-hosted.

## Self-hosted

A workflow builds the site and uploads `dist/` to private storage, which is served through Cloudflare. Changes that only touch docs do not trigger it, but it can be run by hand.

This repository is public, so how that infrastructure works (storage, network, ingress, credentials, logs) is documented privately, not here. Follow these rules when changing the deploy:

- Endpoints, hostnames, and credentials come from GitHub **secrets**. Do not use repository variables for them: workflow logs are public, and only secrets are masked in them.
- Never print the environment, and do not enable shell tracing (`set -x`) or the AWS CLI's `--debug`.
- Upload the hashed assets before the pages, and delete stale files last, so a visitor never gets a page whose assets are missing.
- Server logs that carry IPs follow the retention stated in `/privacy` (see [Privacy](privacy.md)).

## Demos under a subpath

Demos (see [Privacy](privacy.md#demos-under-a-subpath)) are not part of this build. Each one is deployed by its own repository and served at `alexkander.dev/<name>/`. They use relative paths, because the same files are served at another path on their own GitHub Pages site.

## Rollback

Revert the change on `main` and push: both targets deploy the reverted version.
