# Mosaic design guide

**Mosaic** is a visual system: monochrome, minimal, with a technical edge, dark by default. Content sits on a grid of square tiles. Read this before designing a page, screen or component so new work matches what's already there. It's used by [akif.kr](https://akif.kr).

## Principles

1. **Dakota Black first.** Black page, near-black tiles, white text. That's the default and the look everything is designed in; the other [themes](#themes) are recolourings of it.
2. **Monochrome.** No accent colour. Use differences in grey, weight and size for hierarchy. Interaction is shown by inverting (dark tile turns light), not by adding colour.
3. **Squares.** Tiles are square, corners are sharp, and gaps between tiles are hairline. Use square shapes for images and decoration too.
4. **Type does the work.** Listings have no hero images. A tile is a date, a tag, a big faint number and a title.
5. **Offset on purpose.** On wide screens, content blocks can be staggered left and right. When they are, label the empty side so the gap reads as intentional.
6. **Mobile first.** Every layout collapses to a single or two-column version with no horizontal scroll at 375px.

## Colour

Every colour is a theme token. The values for every theme are in [`tokens.json`](tokens.json). Never hard-code a colour in a component, or it won't follow the theme.

- **Web:** `tokens.css` sets each token as a CSS variable (`--tile`), and `tailwind-preset.cjs` exposes them as Tailwind colours (`bg-tile`). In plain CSS use `rgb(var(--tile))`. Values are `r g b`, so `rgb(var(--page) / .72)` works too.
- **Anywhere else** (native apps, print, scripts): read `tokens.json`. Colours are 6-digit hex, every theme has the same keys, and the first theme is the default.

Values below are Dakota Black.

| Token | Key | Tailwind | Dakota Black | Use |
|---|---|---|---|---|
| Page | `page` | `bg-black` | `#000000` | Page background |
| Tile | `tile` | `bg-tile` | `#111111` | Default tile / card background |
| Tile alt 1 | `tile-2` | `bg-tile-2` | `#161616` | Every 4th tile from the 2nd (`:nth-child(4n+2)`) |
| Tile alt 2 | `tile-3` | `bg-tile-3` | `#0c0c0c` | Every 5th tile from the 3rd (`:nth-child(5n+3)`) |
| Hover | `invert` + `page` | `bg-invert` + `text-black` | `#f2f2f2` + `#000000` | Hovered or focused tile (inverted) |
| Faint number | `number` | `text-number` | `#2a2a2a` | Large decorative numbers. Goes `page` on hover |
| Heading | `white` | `text-white` | `#ffffff` | Titles, logo, active nav |
| Body | `n-200` | `neutral-200` | `#e5e5e5` | Default text |
| Secondary | `n-400` / `muted` | `neutral-400` / `rgb(var(--muted))` | `#a3a3a3` / `#888888` | Summaries, descriptions. Prose body is `n-300` |
| Muted | `n-500` | `neutral-500` | `#737373` | Mono labels, meta, inactive nav |
| Rule | `n-900` / `n-800` | `neutral-900` / `neutral-800` | `#171717` / `#262626` | Section dividers, chip borders |

`n-50` to `n-900` is a full grey scale. In Tailwind it replaces `neutral`, and `gray` maps to the same scale, so `gray-*` classes are pure greys with no blue tint.

Rotate the three tile shades through a grid so it reads as a mosaic, not a flat block. Don't add new background shades outside this set.

## Themes

Five colour schemes, taken from [NCS Workbench](https://github.com/ak-tr/NCS-Workbench/blob/main/docs/guides/themes.md) and named after BMW interior colours. Dakota Black is the default and the original Mosaic look; the others are for readability.

| Theme | `id` | Kind | After |
|---|---|---|---|
| **Dakota Black** (default) | `dakota-black` | Dark | The original look: black with grey tiles |
| Anthracite | `anthracite` | Dim | BMW Individual anthracite headliner, neutral charcoal |
| Mocha | `mocha` | Dim | Dakota / Vernasca Mocha leather, warm brown-black |
| Canberra Beige | `canberra-beige` | Light | Vernasca Canberra Beige leather, cream and sand |
| Silverstone | `silverstone` | Light | M Merino Silverstone leather, plain light grey |

- **Switching (web):** Dakota Black is on `:root`; the others apply with `data-theme="<id>"` on `<html>`. Set it before first paint so there's no flash, and remember the viewer's choice.
- **Token names are from the dark design.** In a light theme `page` (`black`) is the lightest colour and `white` the darkest text, so "invert on hover" still works: the tile goes dark, the text goes light. Design for Dakota Black and the other themes follow.
- **Contrast:** in every theme except Dakota Black, all text is at least 4.5:1 against its tile. Dakota Black keeps its original greys.
- **Still monochrome.** NCS Workbench adds blue/green/amber/red for focus and status; Mosaic doesn't.
- **Not themed:** the logo (it carries its own black square), photos, and code blocks (one dark syntax theme in every scheme).
- **Adding a theme:** add it to `tokens.json` with every key the first theme has, in the same order, then run `node build.mjs`. Add it to each project's theme picker.

## Typography

| Role | Font | Style |
|---|---|---|
| Body, titles, prose | **Onest** (`font-sans`, `--font-sans`) | Base size 16px |
| Labels, meta, nav, header, footer, numbers | **Geist Mono** (`font-mono`, `--font-mono`) | Usually 11–12px, uppercase, `tracking-wide` (0.025em) |

Both are free on Google Fonts (OFL). Load Onest at weights 100–900 and Geist Mono at 400, 500 and 700. `tokens.css` only sets the family names; each project loads the files itself.

- **Page title:** Onest light (300), `text-6xl sm:text-8xl md:text-9xl` (60 / 96 / 128px), line height 0.9, tracking -0.06em.
- **Home heading:** Onest light, `text-4xl sm:text-6xl` (36 / 60px), tracking -0.04em.
- **Article title:** Onest semibold (600), `text-4xl md:text-5xl` (36 / 48px), tracking -0.03em.
- **Tile title:** Onest 500, 15–20px (big tiles 24–44px), clamped to 4 lines.
- **Big number:** Geist Mono, tracking -0.05em, line height 1, colour `number`.
- **Mono label:** `font-mono text-xs uppercase tracking-wide text-neutral-500` (12px).

Headings default to Geist Mono. Page and article titles use Onest.

## Layout

- **Container:** `max-w-6xl` (1152px), side padding `px-4 sm:px-6` (16 / 24px).
- **Reading column:** `max-w-2xl` (672px), centred, for articles and long text.
- **Breakpoints:** the Mosaic grid switches at **720px** (3 columns down to 2). Offset/staggered layouts start at 768px (Tailwind `md`).
- **Page header:** big light title on the left, mono meta on the right (`sm:grid-cols-[1fr_auto]`), e.g. "12 posts / 2024 - 2026".

## Mosaic grid

The grid for any listing (posts, projects, notes). Build it once per project and reuse it rather than making other lists.

```text
3 columns, 2px gap, auto-flow dense
items in groups of 3:
  1st -> 2x2 square (alternates left / right each group)
  2nd, 3rd -> 1x1 squares
leftovers:
  1 -> spans the full row
  2 -> one 2-wide + one 1x1
mobile (<720px): 2 columns, 2x2 tiles go full width
```

This way the grid never has holes, whatever the item count. Pages hold 12 items, which is 4 full groups.

**Tile anatomy:**

```text
┌───────────────────────────┐
│ 4 JAN 2026      HOMELAB   │  mono label row (opacity .55)
│                           │
│ 12                        │  big faint number (counts down, newest = highest)
│                           │
│ Running Surfshark Behind… │  title (Onest)
│ A practical guide to…     │  summary, big tiles only
└───────────────────────────┘
```

Hover/focus: background goes `invert`, text and number go `page`.

## Patterns

- **Square tiles outside the grid:** an index (e.g. tags) uses the same tile look (count, big number, name) in a 2/4-column grid. Cards are `tile` backgrounds in a 2-column grid with 2px gaps.
- **Section label:** mono label with a count, e.g. `DEVELOPMENT / 06`, in a left column on wide screens (`md:grid-cols-[200px_1fr]`).
- **Gap labels:** when blocks are staggered (each about 80% wide, one right, one left), fill each empty side with a faint big number and a mono label underneath: `01 / ABOUT`, `02 / BUILDING`. On mobile, hide the number and show the label above its block.
- **Filter row:** mono uppercase links, active one `white`.
- **Links:** `white` text, underlined in `n-600` with a 3px offset; the underline goes `white` on hover. Mono action links use the same treatment in uppercase, e.g. `ALL 12 POSTS →`.
- **Chips** (tags): mono 11px uppercase, `n-800` border, square corners, border and text go `white` on hover.
- **Article header:** `← BLOG` back link, mono meta line `25 DEC 2025 / 7 MIN READ / 1,338 WORDS`, title, tag chips.
- **Pagination:** mono uppercase `← NEWER · 1 / 2 · OLDER →` above an `n-900` rule.
- **Notices** (e.g. drafts): dashed `n-700` border, mono text. No yellow/red alert colours.
- **Theme picker:** mono label `THEME / DAKOTA BLACK`. It opens a `tile` panel with an `n-800` border; rows are mono uppercase, invert on hover/focus, and a small filled square marks the current theme. Esc and clicking outside close it.

## Logo

A lowercase **a** built from square tiles on a 7x7 grid: white (`#f2f2f2`) letter tiles, faint (`#1c1c1c`) empty tiles, on black. Squares only, no font, so it stays sharp at 16px.

| File | Use |
|---|---|
| `brand/logo.svg` | Primary mark. Source for favicons and app icons |
| `brand/logo-mosaic.svg` | Alternate: empty tiles rotate through the three tile greys (`#111` / `#161616` / `#0c0c0c`). Swap it in for a wordmark on hover/focus, or use it larger as decoration |

- Keep the grid at 7x7 and the letter centred. Don't add the full stop or other glyphs.
- Don't recolour it. On a light background, use it as-is (it carries its own black square).
- If `logo.svg` changes, regenerate every favicon and app icon made from it.

## Imagery

- No hero images in listings.
- Photos of people are greyscale, with no colour on hover.
- Hero images inside articles are fine: full column width, square corners.
- Gallery images: no rounded corners.

## Copy

- **No em dashes.** Use a comma, full stop, brackets, or `/` in UI strings. Use a plain hyphen for ranges (`2024 - 2026`).
- British English, `en-GB` dates: `4 Jan 2026`.
- Labels are short and uppercase in mono; sentences stay in sentence case in Onest.

## Don't

- Add an accent colour, gradients, shadows or rounded corners (`rounded-*`, `shadow-*`).
- Hard-code a colour (`#111`, `bg-[#f2f2f2]`, Tailwind palette colours like `blue-*`). Use a theme token.
- Use `dark:` variants or per-theme overrides. Themes go through the tokens.
- Add non-square tiles to the Mosaic, or break the group-of-3 sizing.
- Add a new font. Two families only: Onest and Geist Mono.

## Accessibility

- Every hover state also applies on keyboard focus (`:focus-visible`).
- Big decorative numbers are hidden from screen readers (`aria-hidden`).
- `n-500` on black is about 4.6:1. Don't go darker than that for text people need to read. `number` is for decoration only.

## Files

| File | What |
|---|---|
| `tokens.json` | Source of truth: fonts and every theme's colours |
| `tokens.css` | Generated from `tokens.json` by `build.mjs`. CSS variables for the web |
| `tailwind-preset.cjs` | Tailwind 3 preset: colours, fonts, prose styles |
| `brand/` | Logo SVGs |
