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

## Typography

- One family for all the text, and a monospaced one for code: [Atkinson Hyperlegible Next](https://www.brailleinstitute.org/freefont/) and Atkinson Hyperlegible Mono, designed by the Braille Institute for legibility. Hierarchy comes from size and weight, not from more fonts.
- Both are variable fonts, installed from Fontsource (`@fontsource-variable/atkinson-hyperlegible-next` and `-mono`), imported in `src/layouts/Base.astro`, and set in `--font-sans` and `--font-mono` in `src/styles/global.css`. Astro bundles them, so they are served from the site itself, never from a font service (see [Privacy](privacy.md#design-rules)).
- The Latin subset of the text font is preloaded; other subsets load only when a page uses their characters.
- Licensed under the SIL Open Font License 1.1, which allows self-hosting. The copyright notices and the full license are served at `/fonts/OFL.txt` (`public/fonts/OFL.txt`); update it when a font is added or changed (see [Third-party requirements](third-party.md)).

## Mobile-first

Every implementation is mobile-first:

- Write the base styles for the narrowest screen (320px), and add wider layouts with `min-width` media queries. Do not use `max-width` queries to adapt a desktop layout down.
- Design and check each change on a phone width first, then on wider screens.
- Images get `srcset`/`sizes` (Astro's `<Picture>` or `<Image>`) so phones download only the size they show.

## Themes

- The site has a **light theme and a dark theme**, both first-class: every component must be designed and checked in both.
- The theme **follows the system preference** (`prefers-color-scheme`), with no theme selector. Nothing is stored on the visitor's device, and there is no flash of the wrong theme.
- Both themes must meet the contrast rules in [Accessibility](accessibility.md).
