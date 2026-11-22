# Public repository

This repository is public. Everything committed here, including the full git history, is visible to anyone and may be cached, forked, or indexed. Removing something later requires rewriting history and cannot undo copies already made, so review what you publish **before** committing.

## Never commit

- **Personal data**: home address, current location, phone numbers, ID documents, or family details. Contact details stay limited to what `src/data/profile.ts` already exposes.
- **Other people's data**: references, colleagues' or clients' contact details, and private conversations.
- **Secrets**: API keys, tokens, passwords, private keys, kubeconfigs, tunnel credentials, or `.env` files. Deployment secrets belong in GitHub secrets or in the private infrastructure, never in this repo.
- **Home lab internals**: internal IPs, hostnames, ports, network topology, service URLs that are not meant to be public, the names of private repositories, or how the infrastructure is built, secured, logged, and backed up. A name that does not resolve publicly is still internal.
- **Security weaknesses**: known limits of a protection, unpatched issues, or how something could be bypassed. Keep them in the private infrastructure docs.
- **Business plans and legal reasoning**: future products, pricing, company structure, tax or legal strategy, and internal compliance records. Document the resulting rule, not the reasoning behind it.
- **Confidential work information**: employer or client code, internal names, metrics, or details covered by NDAs. Describe past work at the level already public in the CV.
- **Source documents**: CV files, exports, or other private documents used as input; only the curated content in the repo is published.

## Keep in mind

- **Drafts are public too.** A post with `draft: true` is excluded from the built site, but its file is still readable in the repository. Keep unpublished private notes out of the repo.
- **Images and attachments** may contain metadata (EXIF location, device info). Strip it before committing.
- **Screenshots and logs** may leak hostnames, IPs, tokens, or personal data. Review and redact them first.
- **Commit messages and branch names** are public as well.
- **Git metadata is public.** The author name must not include a machine name, the email must be the public one, and dates must be in UTC, because the time zone hints at the location.
- **Workflow logs are public.** Use GitHub secrets, which are masked, rather than variables for anything internal.
- **Public endpoints and workflow files show how the deploy works.** Keep them to the minimum they need, with no explanatory comments about the infrastructure.

## Before committing

Review the staged diff (`git diff --staged`) with the lists above in mind. If something sensitive was already pushed, rotate any exposed secret immediately; rewriting history alone is not enough.
