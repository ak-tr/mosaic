# Mosaic

A monochrome, square-tiled design system. The guide is [DESIGN.md](DESIGN.md).

## Use it

**Web (Tailwind 3):**

```bash
pnpm add github:ak-tr/mosaic
```

```css
/* global.css, before @tailwind. Load Onest and Geist Mono yourself. */
@import "mosaic/tokens.css";
```

```js
// tailwind.config.cjs
module.exports = {
    presets: [require("mosaic/tailwind-preset.cjs")],
    // ...
};
```

To try local changes before pushing: `pnpm link ../mosaic` in the project.

**Anything else:** read [`tokens.json`](tokens.json) (hex colours per theme, first theme is the default), or copy it in.

**Agents:** add a line to the project's `CLAUDE.md` / `AGENTS.md`, e.g. "Follow the Mosaic design guide in `node_modules/mosaic/DESIGN.md`" (or link to this repo).

## Change it

Edit `tokens.json`, then run `node build.mjs` to regenerate `tokens.css`. Commit both. `node build.mjs --check` fails if they're out of sync.
