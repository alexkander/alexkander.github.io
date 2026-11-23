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

# The dry run only lists what `sync --delete` would remove; a batch request deletes it.
stale=$(s3 sync dist "$bucket/" --delete --dryrun | sed -n "s|^(dryrun) delete: $bucket/||p")
if [ -n "$stale" ]; then
  while mapfile -t -n 1000 keys && [ "${#keys[@]}" -gt 0 ]; do
    batch=$(printf '%s\n' "${keys[@]}" | jq -Rn '{Objects: [inputs | {Key: .}]}')
    errors=$(aws s3api delete-objects --bucket "${bucket#s3://}" --delete "$batch" \
      --query 'length(Errors || `[]`)' --output text)
    if [ "$errors" != 0 ]; then
      echo "Could not delete $errors stale file(s)." >&2
      exit 1
    fi
    printf 'delete: %s\n' "${keys[@]}"
  done <<< "$stale"
fi

echo "Deployed $(git rev-parse --short HEAD) to $bucket"
