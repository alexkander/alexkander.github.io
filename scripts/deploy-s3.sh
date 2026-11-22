#!/usr/bin/env bash
# Builds the site and uploads dist/ to its bucket (docs/deployment.md → Self-hosted).
set -euo pipefail

bucket=s3://alexkander.dev

: "${AWS_ENDPOINT_URL:?is not set}"
: "${AWS_ACCESS_KEY_ID:?is not set}"
: "${AWS_SECRET_ACCESS_KEY:?is not set}"
export AWS_DEFAULT_REGION=garage

cd "$(git rev-parse --show-toplevel)"

# Locally, only deploy what is on origin/main, as CI does.
if [ -z "${CI:-}" ]; then
  git fetch --quiet origin main
  if [ -n "$(git status --porcelain)" ]; then
    echo "The working tree is not clean." >&2
    exit 1
  fi
  if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
    echo "HEAD is not origin/main." >&2
    exit 1
  fi
fi

pnpm install --frozen-lockfile
pnpm build

s3() { aws s3 "$@"; }

# Three passes, so a visitor never gets a page whose assets are not there yet:
# hashed assets first, then the pages, then delete what the build dropped.
# (dist/_astro only exists when the build emits hashed assets.)
if [ -d dist/_astro ]; then
  s3 sync dist/_astro "$bucket/_astro" --cache-control "public, max-age=31536000, immutable"
fi
s3 sync dist "$bucket/" --exclude "_astro/*"
s3 sync dist "$bucket/" --delete

echo "Deployed $(git rev-parse --short HEAD) to $bucket"
