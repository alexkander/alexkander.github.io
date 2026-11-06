# Design

- Minimalist.
- The design system will be defined later through a brainstorming session, possibly based on an existing template or site.

## References

Personal sites of software engineers reviewed as examples: [mitchellh.com](https://mitchellh.com), [leerob.com](https://leerob.com), [antfu.me](https://antfu.me), [eugeneyan.com](https://eugeneyan.com), [overreacted.io](https://overreacted.io), [jvns.ca](https://jvns.ca), [jeffgeerling.com](https://www.jeffgeerling.com), [simonwillison.net](https://simonwillison.net), [brandur.org](https://brandur.org), and [maggieappleton.com](https://maggieappleton.com).

## Patterns to follow

Common to those references, and to be kept in mind during development:

- A single narrow column (about 650px) with generous white space.
- The bio written as prose, not as CV sections.
- Posts listed with their date, not as cards.
- A single accent color.
- Navigation with 3 to 5 links.
- Pages such as `/now` or `/uses`.

## Themes

- The site has a **light theme and a dark theme**, both first-class: every component must be designed and checked in both.
- A **theme selector** lets the visitor switch between them. By default the site follows the system preference (`prefers-color-scheme`).
- The visitor's choice may be stored in `localStorage`: it is a UI preference the visitor sets explicitly, which [Privacy](privacy.md) allows. Apply it before the first paint to avoid a flash of the wrong theme.
