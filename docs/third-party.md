# Third-party requirements

Everything this site takes from others (libraries, fonts, icons, images, data, services, and tools) must be used within its license and terms. This applies to what is committed, what is bundled into the build, and what the deployment uses.

## Before adding something

1. **Read its license and terms.** Check that they allow this use: a public repository, a self-hosted site, and the content licenses in [Content](content.md#license).
2. **List what they require**, for example attribution, keeping copyright and license notices, renaming a modified version, keeping data up to date, or not reselling it on its own.
3. **Meet those requirements in the same change**, and add a row to the table below.
4. **If the license is unclear, or does not allow the use, do not use it.** Prefer permissive licenses (MIT, Apache 2.0, BSD, OFL, CC0, CC BY), and ask the author before adding code under a copyleft license (GPL, AGPL) to what the site ships.

Review the table when a dependency is updated to a new major version, replaced, or removed.

## Current requirements

| What | License or terms | Requirement | Where it is met |
|---|---|---|---|
| Atkinson Hyperlegible Next and Mono (fonts) | SIL Open Font License 1.1 | Keep the copyright and license with every copy of the fonts; do not sell them on their own; rename a modified version | `public/fonts/OFL.txt`, served at `/fonts/OFL.txt`; update it when a font is added or changed (see [Design](design.md#typography)) |
| MaxMind GeoLite data (analytics location) | GeoLite End User License Agreement | Attribution; use each new release promptly and destroy old copies within 30 days | Attribution in the Analytics section of `/privacy`; updates in the analytics deployment (see [Privacy](privacy.md#analytics)) |
| Third-party content in posts (images, diagrams, quotes) | Its own license | Credit next to it, as its license requires | See [Content](content.md#license) |
