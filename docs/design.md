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

## Mobile-first

Every implementation is mobile-first:

- Write the base styles for the narrowest screen (320px), and add wider layouts with `min-width` media queries. Do not use `max-width` queries to adapt a desktop layout down.
- Design and check each change on a phone width first, then on wider screens.
- Images get `srcset`/`sizes` (Astro's `<Picture>` or `<Image>`) so phones download only the size they show.

## Themes

- The site has a **light theme and a dark theme**, both first-class: every component must be designed and checked in both.
- The theme **follows the system preference** (`prefers-color-scheme`), with no theme selector. Nothing is stored on the visitor's device, and there is no flash of the wrong theme.
- Both themes must meet the contrast rules in [Accessibility](accessibility.md).
