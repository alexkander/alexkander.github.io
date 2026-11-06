#!/usr/bin/env bash
# Deploys origin/main to the home lab (docs/deployment.md → Home lab): builds and pushes
# forge.home.alexkander.dev/alexkander/alexkander.github.io:<version>-<sha7> (never `latest`),
# then merges main into the production branch with that tag pinned in deploy/kustomization.yaml.
# Flux applies production. Runs in the deploy-homelab workflow and locally (needs the tailnet,
# `docker login forge.home.alexkander.dev` and push access to the repository).
set -euo pipefail

IMAGE=forge.home.alexkander.dev/alexkander/alexkander.github.io
cd "$(git rev-parse --show-toplevel)"

git fetch --quiet origin main
sha=$(git rev-parse origin/main)
if [ -z "${CI:-}" ] && [ "$(git rev-parse HEAD)" != "$sha" ]; then
  echo "HEAD is not origin/main: push or pull first" >&2
  exit 1
fi
if [ -n "$(git status --porcelain)" ]; then
  echo "the working tree is not clean" >&2
  exit 1
fi

version=$(git show "$sha:package.json" | node -p 'JSON.parse(require("fs").readFileSync(0)).version')
tag="$version-${sha::7}"

if docker manifest inspect "$IMAGE:$tag" >/dev/null 2>&1; then
  echo "image $IMAGE:$tag already exists"
else
  docker build --provenance=false --sbom=false -t "$IMAGE:$tag" .
  docker push "$IMAGE:$tag"
fi

worktree=$(mktemp -d)
trap 'git worktree remove --force "$worktree"' EXIT
if git fetch --quiet origin production 2>/dev/null; then
  git worktree add --quiet --detach "$worktree" origin/production
  # deploy/kustomization.yaml is the only file production changes: take main's and pin it below.
  git -C "$worktree" merge --quiet --no-ff --no-commit -m "Merge main into production" "$sha" >/dev/null 2>&1 || true
  git -C "$worktree" checkout "$sha" -- deploy/kustomization.yaml
  if [ -n "$(git -C "$worktree" diff --name-only --diff-filter=U)" ]; then
    echo "merging main into production conflicts" >&2
    exit 1
  fi
  if git -C "$worktree" rev-parse --quiet --verify MERGE_HEAD >/dev/null; then
    git -C "$worktree" commit --quiet --no-edit
  fi
else
  git worktree add --quiet --detach "$worktree" "$sha"
fi

sed -i "s/^\(    newTag: \).*/\1$tag/" "$worktree/deploy/kustomization.yaml"
if git -C "$worktree" diff HEAD --quiet; then
  echo "production already pins $tag"
else
  git -C "$worktree" commit --quiet -am "chore(deploy): release $tag"
fi
git -C "$worktree" push --quiet origin HEAD:refs/heads/production
echo "production pins $IMAGE:$tag; Flux applies it within 5 minutes"
