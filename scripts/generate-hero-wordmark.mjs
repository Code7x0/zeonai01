#!/usr/bin/env node
/**
 * Rebuilds hero-wordmark.json from Barlow Semi Condensed Black.
 *
 * Mirrors the AI Digital Lottie technique:
 * - Glyph outlines (not live text)
 * - Stretched bar path variants for H/A/E/F/T
 * - Front/back letter assignment so a ribbon can sandwich between layers
 * - Source Line path remapped into the new phrase's viewBox
 *
 * Usage: node scripts/generate-hero-wordmark.mjs
 * Requires: opentype.js (npm i -D opentype.js)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

const ROOT = path.resolve(import.meta.dirname, "..");
const FONT = path.join(
  ROOT,
  "public/sites/aidigital/fonts/BarlowSemiCondensed-Black.ttf",
);
const LOTTIE = path.join(
  ROOT,
  "public/sites/aidigital/images/lottie-desktop.json",
);
const OUT = path.join(
  ROOT,
  "src/components/sites/aidigital/data/hero-wordmark.json",
);

const PHRASE = "HARNESSING THE POWER OF AI";
const SIZE = 100;

const BANDS = {
  E: [
    [-58, -38],
    [-34, -18],
    [-12, 2],
  ],
  F: [
    [-58, -38],
    [-34, -18],
  ],
  T: [[-58, -38]],
  H: [[-34, -18]],
  A: [[-22, -6]],
};

const STRETCH_AMOUNT = { E: 95, F: 80, T: 120, H: 70, A: 75 };

function cloneCmds(cmds) {
  return cmds.map((c) => ({ ...c }));
}

function round(n) {
  return Math.round(n * 100) / 100;
}

function toD(cmds) {
  return cmds
    .map((c) => {
      if (c.type === "M") return `M${round(c.x)} ${round(c.y)}`;
      if (c.type === "L") return `L${round(c.x)} ${round(c.y)}`;
      if (c.type === "Q")
        return `Q${round(c.x1)} ${round(c.y1)} ${round(c.x)} ${round(c.y)}`;
      if (c.type === "C")
        return `C${round(c.x1)} ${round(c.y1)} ${round(c.x2)} ${round(c.y2)} ${round(c.x)} ${round(c.y)}`;
      if (c.type === "Z") return "Z";
      return "";
    })
    .join("");
}

function stretchHorizontal(cmds, amount, { keepLeftRatio = 0.4, bands }) {
  const out = cloneCmds(cmds);
  const xs = out.filter((c) => c.x != null).map((c) => c.x);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const pivot = xMin + (xMax - xMin) * keepLeftRatio;

  const inBand = (y) => bands.some(([lo, hi]) => y >= lo && y <= hi);
  const pushX = (x, y) => {
    if (x == null || x <= pivot || !inBand(y)) return x;
    const t = (x - pivot) / (xMax - pivot + 0.001);
    return x + amount * Math.max(0, t);
  };

  for (const c of out) {
    if (c.x != null) c.x = pushX(c.x, c.y);
    if (c.x1 != null) c.x1 = pushX(c.x1, c.y1);
    if (c.x2 != null) c.x2 = pushX(c.x2, c.y2);
  }
  return out;
}

function findShapes(items, ty, out = []) {
  for (const it of items || []) {
    if (it.ty === ty) out.push(it);
    if (it.it) findShapes(it.it, ty, out);
    if (it.shapes) findShapes(it.shapes, ty, out);
  }
  return out;
}

const font = opentype.parse(fs.readFileSync(FONT).buffer);
const unique = [...new Set(PHRASE.replace(/ /g, ""))];
const glyphs = {};

for (const ch of unique) {
  const g = font.charToGlyph(ch);
  const pathObj = g.getPath(0, 0, SIZE);
  const bb = pathObj.getBoundingBox();
  const cmds = cloneCmds(pathObj.commands);
  const entry = {
    advance: +(g.advanceWidth / font.unitsPerEm * SIZE).toFixed(3),
    bb: {
      x1: +bb.x1.toFixed(2),
      y1: +bb.y1.toFixed(2),
      x2: +bb.x2.toFixed(2),
      y2: +bb.y2.toFixed(2),
    },
    normal: toD(cmds),
  };
  if (STRETCH_AMOUNT[ch]) {
    entry.stretched = toD(
      stretchHorizontal(cmds, STRETCH_AMOUNT[ch], {
        keepLeftRatio: ch === "T" || ch === "A" ? 0.35 : 0.4,
        bands: BANDS[ch],
      }),
    );
  }
  glyphs[ch] = entry;
}

const letters = [];
let cursor = 0;
for (const ch of PHRASE) {
  if (ch === " ") {
    cursor += 28;
    continue;
  }
  const stretch = !!STRETCH_AMOUNT[ch];
  const preferFront = letters.length % 2 === 0;
  letters.push({
    ch,
    x: +cursor.toFixed(2),
    advance: glyphs[ch].advance,
    stretch,
    layers: stretch ? ["back", "front"] : [preferFront ? "front" : "back"],
  });
  cursor += glyphs[ch].advance + 1.2;
}

const totalWidth = cursor;
const lottie = JSON.parse(fs.readFileSync(LOTTIE, "utf8"));
const line = lottie.assets[0].layers.find((l) => l.nm === "Line");
const sh = findShapes(line.shapes, "sh")[0];
const verts = sh.ks.k.v;
const ins = sh.ks.k.i;
const outs = sh.ks.k.o;
const xs = verts.map((v) => v[0]);
const ys = verts.map((v) => v[1]);
const minx = Math.min(...xs);
const maxx = Math.max(...xs);
const miny = Math.min(...ys);
const maxy = Math.max(...ys);
const x0 = -50;
const x1 = totalWidth + 50;
const y0 = -100;
const y1 = 30;
const scaleX = (x1 - x0) / (maxx - minx);
const scaleY = (y1 - y0) / (maxy - miny);
const mapX = (x) => x0 + ((x - minx) / (maxx - minx)) * (x1 - x0);
const mapY = (y) => y0 + ((y - miny) / (maxy - miny)) * (y1 - y0);

let d = "";
for (let i = 0; i < verts.length - 1; i++) {
  const v = [mapX(verts[i][0]), mapY(verts[i][1])];
  const next = [mapX(verts[i + 1][0]), mapY(verts[i + 1][1])];
  const cp1 = [v[0] + outs[i][0] * scaleX, v[1] + outs[i][1] * scaleY];
  const cp2 = [
    next[0] + ins[i + 1][0] * scaleX,
    next[1] + ins[i + 1][1] * scaleY,
  ];
  if (i === 0) d += `M${round(v[0])} ${round(v[1])}`;
  d += `C${round(cp1[0])} ${round(cp1[1])} ${round(cp2[0])} ${round(cp2[1])} ${round(next[0])} ${round(next[1])}`;
}

const out = {
  meta: {
    phrase: PHRASE,
    size: SIZE,
    baseline: 0,
    capTop: -70,
    color: "#0009DC",
    lime: "#AEF33E",
    totalWidth: +totalWidth.toFixed(2),
    duration: 8.533,
    spread: 110,
    viewBox: `-160 -105 ${totalWidth + 320} 140`,
  },
  glyphs,
  letters,
  ribbon: {
    d,
    strokeWidth: 14,
  },
};

fs.writeFileSync(OUT, JSON.stringify(out));
console.log(`Wrote ${path.relative(ROOT, OUT)} (${letters.length} letters, w=${totalWidth.toFixed(1)})`);
