# Public repository

This repository is public. Everything committed here, including the full git history, is visible to anyone and may be cached, forked, or indexed. Removing something later requires rewriting history and cannot undo copies already made, so review what you publish **before** committing.

## Never commit

- **Personal data**: home address, current location, phone numbers, ID documents, or family details. Contact details stay limited to what `src/data/profile.ts` already exposes.
- **Other people's data**: references, colleagues' or clients' contact details, and private conversations.
- **Secrets**: API keys, tokens, passwords, private keys, kubeconfigs, Cloudflare Tunnel credentials, or `.env` files. Home lab deployment secrets belong in the cluster (e.g. sealed or external secrets), never in this repo.
- **Home lab internals**: internal IPs, hostnames, network topology, or service URLs that are not meant to be public.
- **Confidential work information**: employer or client code, internal names, metrics, or details covered by NDAs. Describe past work at the level already public in the CV.
- **Source documents**: CV files, exports, or other private documents used as input; only the curated content in the repo is published.

## Keep in mind

- **Drafts are public too.** A post with `draft: true` is excluded from the built site, but its file is still readable in the repository. Keep unpublished private notes out of the repo.
- **Images and attachments** may contain metadata (EXIF location, device info). Strip it before committing.
- **Screenshots and logs** may leak hostnames, IPs, tokens, or personal data. Review and redact them first.
- **Commit messages and branch names** are public as well.

## Before committing

Review the staged diff (`git diff --staged`) with the lists above in mind. If something sensitive was already pushed, rotate any exposed secret immediately; rewriting history alone is not enough.
