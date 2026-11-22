# Accessibility

The site targets **WCAG 2.2 level AA**, the standard behind the European harmonized standard EN 301 549. Every page and component must meet it, in both the light and the dark theme.

> This is an engineering guideline, not legal advice.

## Legal framework

| Regulation | Applies here? |
|---|---|
| **European Accessibility Act** (Directive (EU) 2019/882), as implemented nationally | No: it covers products and services offered commercially (e-commerce, banking, e-books, transport…), and microenterprises are exempt for services. A personal, non-commercial site is outside its scope |
| **Web Accessibility Directive** (Directive (EU) 2016/2102), as implemented nationally | No: it covers public sector bodies only |

The site follows WCAG 2.2 AA voluntarily, so it stays accessible and needs no rework if its situation changes.

## Rules

### Structure and semantics

- Every page has `lang="en"`, a descriptive `<title>`, and exactly one `<h1>`. When the design does not show a heading, keep it with the `visually-hidden` class (`src/styles/global.css`) instead of removing it or using `display: none`.
- Headings follow their order (`h1` → `h2` → `h3`) without skipping levels.
- Use landmarks: `header`, `nav` (with an `aria-label`), `main`, `footer`. The layout (`src/layouts/Base.astro`) provides them.
- The first focusable element is the "Skip to content" link, which jumps to `<main id="main">`.
- The navigation marks the current page with `aria-current`.
- Use native elements (`<a>` for navigation, `<button>` for actions) before ARIA.
- Text in another language is marked with `lang` (e.g. `<span lang="es">`).

### Text alternatives

- Every informative image has an `alt` that conveys its content; decorative images use `alt=""`.
- Icons are decorative (`aria-hidden="true"`), and the link or button that wraps them carries the accessible name (`aria-label`). An `aria-label` must contain the visible text, if there is any.
- Videos need captions, and audio needs a transcript.

### Color and contrast

- Text contrast is at least **4.5:1** (3:1 for text 24px and up, or 19px bold), and borders, focus rings, and icons that convey meaning reach **3:1**. Check every new color in both themes.
- Color is never the only way to convey information. Links in text keep their underline.

### Keyboard and focus

- Everything works with the keyboard alone, in a logical order, and without keyboard traps.
- The focus is always visible (`:focus-visible` in `src/styles/global.css`). Never remove outlines without a replacement.
- Interactive targets are at least **24×24 CSS pixels** (WCAG 2.5.8), or have enough spacing around them.

### Motion and layout

- Animations respect `prefers-reduced-motion` (handled globally in `src/styles/global.css`). Nothing flashes more than three times per second.
- The layout works at 320px wide and at 200% zoom, with no horizontal scroll for text.
- Dynamic status messages use `aria-live` (e.g. the analytics opt-out on `/privacy`).

### Content

- Links that open in a new tab say so to screen readers with "(opens in a new tab)"; `src/components/Link.astro` adds it (see [Content](content.md#links)).
- Link text describes the destination ("Read the privacy policy", not "click here").
- Posts use real headings, lists, and tables, not formatting that only looks like them.
- Code blocks scroll horizontally instead of overflowing, and their highlighting colors meet the contrast rules.
- Embeds (click-to-load, see [Privacy](privacy.md)) need a keyboard-accessible control and a descriptive label.

## Verification

- **Automated**: `pnpm lint:html` runs [html-validate](https://html-validate.org) with its `recommended` and `a11y` presets (`.htmlvalidate.json`) over the built `dist/`. It catches missing `alt`, unlabeled controls and links, invalid ARIA, duplicate IDs, and heading problems. Run it after `pnpm build` and before pushing.
- **Manual, before merging a visual change**:
  1. Navigate the changed pages with the keyboard only (Tab, Shift+Tab, Enter, Space): the focus is visible and the order is logical.
  2. Run the Lighthouse accessibility audit or the axe DevTools extension in both themes (switch the system theme, or emulate `prefers-color-scheme` in DevTools → Rendering).
  3. Check the contrast of any new color (DevTools color picker).
  4. Zoom to 200% and resize to 320px wide.
  5. For new interactive components, test with a screen reader (Orca on Linux, VoiceOver on macOS, NVDA on Windows).

Static validation cannot check contrast, focus order, or how something sounds in a screen reader, so the manual steps are not optional for visual or interactive changes.
