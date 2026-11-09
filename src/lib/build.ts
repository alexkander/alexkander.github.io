import { execSync } from 'node:child_process';

export const repositoryUrl = 'https://github.com/alexkander/alexkander.github.io';

/** The commit the site was built from: GitHub Actions' GITHUB_SHA, or the local HEAD. */
function buildCommit(): string | undefined {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return undefined;
  }
}

export const commit = buildCommit();
