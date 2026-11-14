# Privacy and compliance

How this site handles personal data, which legal framework it follows, and what must be checked before adding features. The public-facing summary is the `/privacy` page (`src/pages/privacy.astro`); this document is the internal reference and must be kept in sync with it.

> This is an engineering guideline, not legal advice. When a feature falls outside what is covered here (monetization, paid services, accounts, anything high-risk), get advice from a data protection professional before shipping it.

## Legal framework

The site follows the **EU framework as its compliance baseline**. It is among the strictest regimes and the site is reachable by visitors from the EU, so complying with it covers most other jurisdictions as well.

| Regulation | What it governs here | Key points |
|---|---|---|
| **GDPR** (Regulation (EU) 2016/679) | Any processing of visitors' personal data, including IP addresses | Principles (art. 5), lawful basis (art. 6), transparency (arts. 12–14), data subject rights (arts. 15–22), privacy by design and by default (art. 25), processors (art. 28), records of processing (art. 30), security (art. 32), breach notification (arts. 33–34), international transfers (arts. 44–49) |
| **National GDPR implementation laws** | Local additions to the GDPR in the operator's member state | Check them when adding features that involve consent, minors, or marketing |
| **ePrivacy Directive** (2002/58/EC), art. 5(3), as implemented nationally | Storing or reading anything on the visitor's device: cookies, `localStorage`, `sessionStorage`, IndexedDB, fingerprinting, tracking pixels | Requires prior consent unless strictly necessary for a service the visitor explicitly requested. See EDPB Guidelines 2/2023 on its technical scope. Some national authorities consider analytics cookies **not** exempt, so analytics cookies always count as requiring consent here |
| **ePrivacy Directive**, art. 13, and national e-commerce laws | Commercial email (newsletters, promotional messages) | Prior opt-in consent and an easy unsubscribe in every message |
| **E-Commerce Directive** (2000/31/EC), art. 5, as implemented nationally | Information about the site operator | Sites carrying out an **economic activity** (paid services, ads, sales) must publish identification data, which may include a postal address and tax ID. Review before any monetization (see [Monetization](#monetization-and-paid-services)) |

Other regimes to keep in mind as the site grows:

- **US state privacy laws** (e.g. CCPA/CPRA): apply above revenue or data-volume thresholds that a personal site does not meet. Re-evaluate if the site starts selling products or processing data at scale.
- **UK GDPR, Brazil's LGPD, and others**: largely aligned with the GDPR baseline; no extra work is needed unless a feature targets those markets specifically.

Professional obligations toward employers and clients (NDAs, intellectual property) are covered in [Public repository](public-repository.md).

## Design rules

These rules keep the site out of consent-banner territory and minimize the data processed. Breaking any of them requires updating this document and the `/privacy` page first.

1. **No cookies or device storage** (`localStorage`, `sessionStorage`, IndexedDB) except strictly necessary ones. A stored preference explicitly set by the visitor (e.g. a theme toggle, or the analytics opt-out flag) is acceptable; anything used for tracking or measurement is not.
2. **No third-party requests by default.** Fonts, scripts, styles, and images are self-hosted and served from the same origin. The only exception is the self-hosted analytics at `stats.alexkander.dev`: a subdomain run by the operator on the home lab, not a third party. Adding a third-party request (CDN, embed, widget, font service) requires a review against this document, because it sends the visitor's IP address to that third party.
3. **Embeds are click-to-load.** Videos, social posts, maps, and similar embeds load only after the visitor clicks, and use privacy-enhanced modes where available (e.g. `youtube-nocookie.com`).
4. **Analytics must be cookieless, aggregated, and self-hosted** (see [Analytics](#analytics)), loaded only in production builds.
5. **No personal data in URLs**, query strings, or analytics events.
6. **Data minimization.** Collect only what a feature needs, keep it only as long as needed, and never reuse it for another purpose.
7. **Strip metadata** (EXIF, including GPS location) from images before committing them.

## Records of processing

This table is the record of processing activities (GDPR art. 30). Every feature that processes personal data adds or updates a row here **and** in the `/privacy` page.

| Activity | Status | Personal data | Purpose | Lawful basis | Recipients / processors | Transfers outside the EU | Retention |
|---|---|---|---|---|---|---|---|
| Hosting on GitHub Pages (`alexkander.github.io`) | Active | IP address, user agent, requested URL (server logs) | Serve the site, security | Legitimate interest (art. 6.1.f) | GitHub, Inc. | United States, under the EU-US Data Privacy Framework | Per GitHub's privacy statement |
| Hosting on the home lab (`alexkander.dev`) via Cloudflare | Active | IP address, user agent, requested URL | Serve the site, security, caching | Legitimate interest (art. 6.1.f) | Cloudflare, Inc. (processor) | United States, under the EU-US Data Privacy Framework | Home lab server logs: max. 14 days (the web server that serves the site logs no requests or IPs; the ingress's raw access log is rotated daily with 14 kept, and its copy in Loki has no IPs and is kept 14 days). Cloudflare: per its policy |
| Email contact | Active | Name, email address, message content | Reply to the visitor | Visitor's request / legitimate interest (art. 6.1.b/f) | Email provider | Depends on the email provider | As long as the conversation requires |
| Analytics (Umami, self-hosted at `stats.alexkander.dev`, `alexkander.dev` only) | Active | Pages viewed, referrer, outbound link domains, country/region/city (GeoLite2 lookup in the instance), browser, OS, device, screen, language, and a session hash (website + IP + user agent + monthly rotating salt). The IP is used in memory only and never stored. No cookies or device storage | Understand how the site is used | Legitimate interest (art. 6.1.f); objection via DNT, GPC, or the opt-out on `/privacy` | Cloudflare, Inc. (processor, tunnel/proxy, as for hosting); everything else is self-hosted | Only through Cloudflare, under the EU-US Data Privacy Framework | 24 months, deleted by a nightly job; deleted rows remain in backups up to ~6 months. The `stats.alexkander.dev` access log follows the home lab hosting row (max. 14 days, no IPs in Loki) |

## Feature checklist

Before merging any feature that collects, stores, or transmits personal data (or touches the visitor's device storage), go through this list:

1. **Data**: which personal data is processed, and is all of it necessary?
2. **Purpose and lawful basis**: why, and under which GDPR art. 6 basis? If the basis is consent, the feature must not run before consent is given, and consent must be as easy to withdraw as to give.
3. **Device storage**: does it set cookies or use browser storage? If it is not strictly necessary, it needs prior consent (ePrivacy art. 5(3)), which means a consent banner. Prefer a design that avoids it.
4. **Third parties**: does it involve a new service? Check whether that service is a processor (needs a data processing agreement) or an independent controller, where it stores data, and the transfer mechanism (EU-US Data Privacy Framework, Standard Contractual Clauses, or an adequacy decision).
5. **Retention**: define how long data is kept and how it is deleted.
6. **Security**: access control, encryption in transit, secrets kept out of the repo (see [Public repository](public-repository.md)), and backups that respect retention.
7. **Risk**: if the feature involves large-scale processing, special categories of data, minors, or profiling, a Data Protection Impact Assessment (art. 35) may be required. Stop and get advice.
8. **Documentation**: update the [records of processing](#records-of-processing) table, the `/privacy` page, and its "Last updated" date in the same change.

## Feature-specific requirements

### Analytics

- Use a cookieless, self-hosted tool that does not store raw IP addresses and only reports aggregated data. Implemented with Umami on the home lab k3s cluster (deployment in the `infrahomelab` repository), loaded by `src/components/Analytics.astro` in production builds and only on the canonical host.
- Lawful basis: legitimate interest, which requires documenting it in the `/privacy` page and offering a way to object.
- Retention: 24 months maximum for aggregated data.
- Respect `Do Not Track` and Global Privacy Control signals: the tracker is not loaded at all when either is set, or when the visitor opted out on `/privacy` (the `umami.disabled` flag in `localStorage`, which the Umami tracker also checks).
- Outbound link clicks record only the destination domain.
- Location is stored down to the city (Umami's default), as a deliberate decision under data minimization: it is derived from the IP at the moment of the visit, the IP is never stored, and without cookies or IPs a city alone does not identify a visitor. It also shows where interest in the site comes from. Keep the `/privacy` page listing it; if the city stops being useful, drop it and update both documents.
- The collect endpoint (`POST /api/send`) only accepts browser requests whose `Origin` is in an allowlist kept in the `infrahomelab` repository (currently `https://alexkander.dev`); measuring another site means adding its origin there. This stops other sites' pages from sending events, not scripted clients, which can forge `Origin`.
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

### Booking consultations

- Booking is a separate service (e.g. self-hosted Cal.com), not part of this site. If it is self-hosted, the operator is the controller for booking data (name, email, meeting details), and it needs its own privacy notice.
- Calendar integrations (e.g. Google Calendar) are processors with data transfers outside the EU.

### Monetization and paid services

Paid consultations, sponsorships, ads, or product sales turn the site into an economic activity. Before launching any of them:

- Review the operator-information obligations of the applicable e-commerce law (legal notice with identification data), which may require publishing a postal address and tax ID.
- Ads almost always involve third-party cookies and tracking, which requires a consent management platform. Avoid them.
- Get professional advice.

## Data subject requests

Visitors can exercise their rights (access, rectification, erasure, restriction, objection, portability) by emailing the address in the `/privacy` page.

- Reply within **one month** (art. 12(3)); this can be extended by two months for complex requests, as long as the visitor is told within the first month.
- Verify the requester's identity when the request concerns stored data.
- Requests are free of charge.

## Personal data breaches

If personal data is exposed (e.g. a leaked database, compromised server, or secret in the repo):

1. Contain it: revoke access, rotate secrets, and take the affected service offline if needed.
2. Assess the risk to the people affected.
3. If there is a risk to their rights, notify the competent supervisory authority **within 72 hours** of becoming aware of it (art. 33).
4. If the risk is high, inform the affected people without undue delay (art. 34).
5. Record every breach, even those not notified (art. 33(5)).

## Review

Review this document and the `/privacy` page whenever a feature that processes personal data is added, a service provider changes, or the applicable rules change.
