# Privacy and compliance

How this site handles personal data, which legal framework it follows, and what must be checked before adding features. The public-facing summary is the `/privacy` page (`src/pages/privacy.astro`); this document is the internal reference and must be kept in sync with it.

> This is an engineering guideline, not legal advice. When a feature falls outside what is covered here (accounts, anything commercial or high-risk), get advice from a data protection professional before shipping it.

## Legal framework

The site follows the **EU framework as its compliance baseline**. It is among the strictest regimes and the site is reachable by visitors from the EU, so complying with it covers most other jurisdictions as well.

| Regulation | What it governs here | Key points |
|---|---|---|
| **GDPR** (Regulation (EU) 2016/679) | Any processing of visitors' personal data, including IP addresses | Principles (art. 5), lawful basis (art. 6), transparency (arts. 12–14), data subject rights (arts. 15–22), privacy by design and by default (art. 25), processors (art. 28), records of processing (art. 30), security (art. 32), breach notification (arts. 33–34), international transfers (arts. 44–49) |
| **National GDPR implementation laws** | Local additions to the GDPR in the operator's member state | Check them when adding features that involve consent, minors, or marketing |
| **ePrivacy Directive** (2002/58/EC), art. 5(3), as implemented nationally | Storing or reading anything on the visitor's device: cookies, `localStorage`, `sessionStorage`, IndexedDB, fingerprinting, tracking pixels | Requires prior consent unless strictly necessary for a service the visitor explicitly requested. It covers any script that makes the browser send information, not only cookies (EDPB Guidelines 2/2023), so **being cookieless does not by itself avoid consent**. Some national authorities exempt audience measurement under strict conditions, and analytics here must stay within them (see [Analytics](#analytics)). Analytics with cookies or device storage always count as requiring consent here |
| **ePrivacy Directive**, art. 13, and national e-commerce laws | Commercial email (newsletters, promotional messages) | Prior opt-in consent and an easy unsubscribe in every message |

Other regimes to keep in mind as the site grows:

- **US state privacy laws** (e.g. CCPA/CPRA): apply above revenue or data-volume thresholds that a personal site does not meet. Re-evaluate if the site starts processing data at scale.
- **UK GDPR, Brazil's LGPD, and others**: largely aligned with the GDPR baseline; no extra work is needed unless a feature targets those markets specifically.

Professional obligations toward employers and clients (NDAs, intellectual property) are covered in [Public repository](public-repository.md).

## Design rules

These rules avoid the need for a consent banner and minimize the data processed. Breaking any of them requires updating this document and the `/privacy` page first.

1. **No cookies or device storage** (`localStorage`, `sessionStorage`, IndexedDB) except strictly necessary ones. The only item stored today is the analytics opt-out flag, set only when the visitor asks for it. A new preference explicitly set by the visitor would be acceptable, but needs the `/privacy` page updated first; anything used for tracking or measurement is not. The theme follows the system preference and stores nothing (see [Design](design.md#themes)).
2. **No third-party requests by default.** Fonts, scripts, styles, and images are self-hosted and served from the same origin. The only exception is the self-hosted analytics at `stats.alexkander.dev`: a subdomain run by the operator, not a third party. Adding a third-party request (CDN, embed, widget, font service) requires a review against this document, because it sends the visitor's IP address to that third party. Demos served under a subpath may use the third parties their own privacy page documents (see [Demos under a subpath](#demos-under-a-subpath)).
3. **Embeds are click-to-load.** Videos, social posts, maps, and similar embeds load only after the visitor clicks, and use privacy-enhanced modes where available (e.g. `youtube-nocookie.com`).
4. **Analytics must be cookieless, self-hosted, and limited to audience measurement** (see [Analytics](#analytics)), loaded only in production builds.
5. **No personal data in URLs**, query strings, or analytics events.
6. **Data minimization.** Collect only what a feature needs, keep it only as long as needed, and never reuse it for another purpose.
7. **Strip metadata** (EXIF, including GPS location) from images before committing them, except the author, copyright, and license of the operator's own photos.
8. **The site stays non-commercial** (see [Non-commercial site](#non-commercial-site)).
9. **Demos under a subpath follow their own rules** (see [Demos under a subpath](#demos-under-a-subpath)).

## Records of processing

The site processes personal data for hosting (GitHub Pages and the self-hosted target, through Cloudflare), analytics, and replies to email. The `/privacy` page describes each of them.

The record of processing activities (GDPR art. 30), the evidence about providers, and the registers are kept privately, outside this repository. When a feature changes what is processed, tell the operator to update them in the same change.

Limits that the code and the deployment must respect, as stated in `/privacy`:

- Server logs that carry IPs: 14 days maximum.
- Analytics: 17 months maximum, plus up to 8 months in backups, so never more than 25 in total. The IP is never stored.

## Feature checklist

Before merging any feature that collects, stores, or transmits personal data (or touches the visitor's device storage), go through this list:

1. **Data**: which personal data is processed, and is all of it necessary?
2. **Purpose and lawful basis**: why, and under which GDPR art. 6 basis? If the basis is consent, the feature must not run before consent is given, and consent must be as easy to withdraw as to give.
3. **Device storage and access**: does it set cookies, use browser storage, or run a script that sends information from the device? If it is not strictly necessary, it needs prior consent (ePrivacy art. 5(3)), which means a consent banner. Prefer a design that avoids it.
4. **Third parties**: does it involve a new service? Check whether that service is a processor (needs a data processing agreement) or an independent controller, where it stores data, and the transfer mechanism (EU-US Data Privacy Framework, Standard Contractual Clauses, or an adequacy decision).
5. **Retention**: define how long data is kept and how it is deleted.
6. **Security**: access control, encryption in transit, secrets kept out of the repo (see [Public repository](public-repository.md)), and backups that respect retention.
7. **Risk**: if the feature involves large-scale processing, special categories of data, minors, or profiling, a Data Protection Impact Assessment (art. 35) may be required. Stop and get advice.
8. **Documentation**: update this document, the `/privacy` page, and its "Last updated" date in the same change, and the private [records of processing](#records-of-processing).

## Feature-specific requirements

### Analytics

- Analytics stays within the audience measurement exemption: only for this site's own statistics, not shared, not combined with other data, and no identifier shared between sites. Any other use requires prior consent.
- Measure only: page, referrer, device type, browser, screen size, approximate location, and clicks on outbound links. Language, operating system, query strings, and URL fragments are **not** recorded: `src/components/Analytics.astro` leaves them out of what it sends, and stops the server from deriving the operating system. Adding any other data requires a review of this section first.
- Do not enable Umami features that go beyond that: `identify`, session replays, heatmaps, or error tracking. Use the aggregated reports, not the individual sessions.
- The visit identifier rotates every day (set on the server), so the same visitor gets a different one each day. It is a pseudonymous hash: do not describe it as anonymous or irreversible.
- Use a cookieless, self-hosted tool that does not store raw IP addresses. Implemented with self-hosted Umami, loaded by `src/components/Analytics.astro` in production builds and only on the canonical host.
- Lawful basis (GDPR, separate from the ePrivacy exemption above): legitimate interest, which requires documenting it in the `/privacy` page and offering a way to object.
- Retention: 17 months maximum, plus up to 8 months in backups.
- Respect `Do Not Track` and Global Privacy Control signals: the tracker is not loaded at all when either is set, or when the visitor opted out on `/privacy` (the `umami.disabled` flag in `localStorage`, which the Umami tracker also checks).
- Outbound link clicks record only the destination domain.
- The location lookup uses MaxMind's GeoLite data. Its EULA requires attribution (shown in the Analytics section of `/privacy`), using each new release promptly, and destroying old copies within 30 days of a new release; the Umami deployment must keep the database updated.
- Location is stored as country and region only, derived from the IP at the moment of the visit. The city is never stored (enforced on the server).
- No cross-site tracking, no fingerprinting, no advertising features, and no sharing with third parties.
- Any analytics tool that uses cookies or device storage requires a consent banner and must not load before consent.

### Contact form

- Only the fields needed to reply (email and message; name optional).
- Show a short privacy notice next to the form linking to `/privacy`.
- Do not add the sender to any mailing list.
- If it uses a third-party form service, treat it as a processor (see the checklist).

### Newsletter

- Explicit opt-in consent with double opt-in (confirmation email).
- An unsubscribe link in every email; unsubscribing deletes or suppresses the address.
- Keep proof of consent (timestamp, source).
- The email service provider is a processor: it needs a data processing agreement and a valid transfer mechanism.

### Comments

- Third-party comment systems (e.g. Giscus via GitHub) identify the visitor to that third party: load them click-to-load and disclose them in `/privacy`.
- Moderate content and honor deletion requests.

### Non-commercial site

This site is a personal, non-commercial profile. On this site:

- Projects and products are described and linked to their own websites, nothing more: no prices, buy or sign-up buttons, checkout, or calls to action to hire.
- No ads, affiliate links, sponsored posts, donation links, or booking.
- The privacy policy, legal notice, and terms of each product live on its own website and never mix with `/privacy`.

Get professional advice before changing any of these rules.

### Demos under a subpath

Free tools and demos built for posts can be served under a path of this domain (`alexkander.dev/<name>/`) instead of on their own domain. Each one is its own static app in its own repository, published to that path (see [Deployment](deployment.md#demos-under-a-subpath)).

| Path | Repository | Privacy page |
|---|---|---|
| `/eclipse-weather/` | `alexkander/eclipse-weather` | `/eclipse-weather/privacy.html` |

- **Free and non-commercial**, like the rest of the site. Anything paid belongs on its own domain.
- **Its own privacy page and records.** The demo documents what it processes, its third-party requests, and its device storage in its own repository and privacy page, linked from the app. The `/privacy` page only mentions that demos exist and have their own notice.
- **Shared origin.** A demo runs on the same origin as this site, so it shares the visitor's browser storage:
  - The analytics opt-out flag (`umami.disabled`) applies to both, which is intended: demos must use that same key and respect it, DNT, and GPC.
  - Demos must namespace their own storage (e.g. an IndexedDB or key prefix named after the demo), and their "delete local data" actions must delete only their own keys, never `localStorage.clear()` or the opt-out flag.
  - Clearing the site data in the browser also clears the demos' data; their privacy pages must say so.
  - No service workers, which would control the whole scope they register; any exception needs a review of this document.
- **Analytics**: a demo may load the self-hosted Umami with its own website ID, with the canonical host check set to `alexkander.dev`.
- **Reserved path**: no post or page of this site may use a demo's path (see [Content](content.md#reserved-paths)).
- **Embedding**: posts link to the demo. Embedding it in an `<iframe>` counts as an embed and must be click-to-load when the demo makes third-party requests on load.

## Requests and incidents

- Visitors exercise their rights by emailing the address in the `/privacy` page. Requests are free of charge and answered within **one month** (art. 12(3)).
- If personal data or a secret is exposed (including in this repository), tell the operator immediately, and rotate the secret. The procedure, including the notification deadlines, is kept privately.

## Review

Review this document and the `/privacy` page whenever a feature that processes personal data is added, a service provider changes, or the applicable rules change.
