#!/usr/bin/env bash
# Builds the site and uploads dist/ to the home lab's Garage bucket
# (docs/deployment.md → Home lab). Needs AWS_ACCESS_KEY_ID and
# AWS_SECRET_ACCESS_KEY set to the bucket's key, and the tailnet.
set -euo pipefail

endpoint=https://s3.home.alexkander.dev
bucket=s3://alexkander.dev

: "${AWS_ACCESS_KEY_ID:?set AWS_ACCESS_KEY_ID to the bucket key}"
: "${AWS_SECRET_ACCESS_KEY:?set AWS_SECRET_ACCESS_KEY to the bucket key}"
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

s3() { aws --endpoint-url "$endpoint" s3 "$@"; }

# Three passes, so a visitor never gets a page whose assets are not there yet:
# hashed assets first, then the pages, then delete what the build dropped.
s3 sync dist/_astro "$bucket/_astro" --cache-control "public, max-age=31536000, immutable"
s3 sync dist "$bucket/" --exclude "_astro/*"
s3 sync dist "$bucket/" --delete

echo "Deployed $(git rev-parse --short HEAD) to $bucket"
