// Generates tokens.css from tokens.json. `node build.mjs --check` fails if tokens.css is out of date.
import { readFileSync, writeFileSync } from "node:fs";

const { fonts, themes } = JSON.parse(readFileSync(new URL("tokens.json", import.meta.url), "utf8"));
const keys = Object.keys(themes[0].colors).join();

const rgb = (hex) => {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`${hex}: colours must be 6-digit hex`);
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" ");
};

const blocks = themes.map(({ id, name, scheme, colors }, i) => {
    if (Object.keys(colors).join() !== keys) throw new Error(`${id}: needs the same colours, in the same order, as ${themes[0].id}`);
    const vars = Object.entries(colors).map(([key, hex]) => `    --${key}: ${rgb(hex)};`);
    return `/* ${name} */\n${i ? `:root[data-theme="${id}"]` : ":root"} {\n    color-scheme: ${scheme};\n${vars.join("\n")}\n}`;
});

const css = `/* Generated from tokens.json by build.mjs. Don't edit by hand.
   Colours are "r g b" so opacity works: rgb(var(--tile) / .5). Names are from the dark design:
   in a light theme --page is the lightest colour and --white the darkest text. See DESIGN.md. */

:root {
    --font-sans: "${fonts.sans}";
    --font-mono: "${fonts.mono}";
}

${blocks.join("\n\n")}
`;

const out = new URL("tokens.css", import.meta.url);
if (process.argv.includes("--check")) {
    if (readFileSync(out, "utf8") !== css) {
        console.error("tokens.css is out of date, run: node build.mjs");
        process.exit(1);
    }
} else {
    writeFileSync(out, css);
}
