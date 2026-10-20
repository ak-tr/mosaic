# Mosaic

The design system used across projects. `DESIGN.md` is the guide, `tokens.json` the values.

- `tokens.json` is the source of truth. Never edit `tokens.css` by hand: run `node build.mjs` and commit both.
- When a token value changes, update the Dakota Black column in `DESIGN.md` to match.
- Keep it project-neutral: no file paths, page names or code from a project that uses Mosaic. Those belong in that project's own docs.
- No dependencies. `build.mjs` is plain Node.
- Follow the copy rules in `DESIGN.md` here too (no em dashes, British English).
