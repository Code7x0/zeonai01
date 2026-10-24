#!/usr/bin/env node
/**
 * Rebuild hero Lottie as "HARNESSING THE / POWER OF AI".
 *
 * Keeps the ORIGINAL Line ribbon path + trim + stroke + Null timing.
 * No letter-path stretch — clean Barlow outlines only.
 * Letters sandwich around the Line so the ribbon loops through the type
 * (overlay on some glyphs is fine / intended).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/sites/aidigital/images/lottie-desktop.json");
const FONT = path.join(
  ROOT,
  "public/sites/aidigital/fonts/BarlowSemiCondensed-Black.ttf",
);
const OUT = path.join(
  ROOT,
  "public/sites/aidigital/images/lottie-harnessing.json",
);

const LINES = ["HARNESSING THE", "POWER OF AI"];
const CAP = 95;
const GROUP_SCALE = 184;
const TRACK = 10;
const SPACE = 32;
/** Tight enough that both rows sit inside the original ribbon loops. */
const LINE_GAP = 168;

function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}

function fontContours(glyph, fontSize) {
  const pathObj = glyph.getPath(0, 0, fontSize);
  const contours = [];
  let cur = null;
  const flush = () => {
    if (cur?.v.length) {
      contours.push({ ...cur, c: true });
      cur = null;
    }
  };
  for (const cmd of pathObj.commands) {
    if (cmd.type === "M") {
      flush();
      cur = { v: [[cmd.x, cmd.y]], i: [[0, 0]], o: [[0, 0]] };
    } else if (cmd.type === "L") {
      cur.o[cur.o.length - 1] = [0, 0];
      cur.v.push([cmd.x, cmd.y]);
      cur.i.push([0, 0]);
      cur.o.push([0, 0]);
    } else if (cmd.type === "Q") {
      const p0 = cur.v.at(-1);
      const q = [cmd.x1, cmd.y1];
      const p1 = [cmd.x, cmd.y];
      const cp1 = [
        p0[0] + (2 / 3) * (q[0] - p0[0]),
        p0[1] + (2 / 3) * (q[1] - p0[1]),
      ];
      const cp2 = [
        p1[0] + (2 / 3) * (q[0] - p1[0]),
        p1[1] + (2 / 3) * (q[1] - p1[1]),
      ];
      cur.o[cur.o.length - 1] = [cp1[0] - p0[0], cp1[1] - p0[1]];
      cur.v.push(p1);
      cur.i.push([cp2[0] - p1[0], cp2[1] - p1[1]]);
      cur.o.push([0, 0]);
    } else if (cmd.type === "C") {
      const p0 = cur.v.at(-1);
      const p1 = [cmd.x, cmd.y];
      cur.o[cur.o.length - 1] = [cmd.x1 - p0[0], cmd.y1 - p0[1]];
      cur.v.push(p1);
      cur.i.push([cmd.x2 - p1[0], cmd.y2 - p1[1]]);
      cur.o.push([0, 0]);
    } else if (cmd.type === "Z") {
      flush();
    }
  }
  flush();
  return contours;
}

function center(contours) {
  let minx = Infinity,
    maxx = -Infinity,
    miny = Infinity,
    maxy = -Infinity;
  for (const c of contours)
    for (const p of c.v) {
      minx = Math.min(minx, p[0]);
      maxx = Math.max(maxx, p[0]);
      miny = Math.min(miny, p[1]);
      maxy = Math.max(maxy, p[1]);
    }
  const cx = (minx + maxx) / 2;
  const cy = (miny + maxy) / 2;
  return contours.map((c) => ({
    i: c.i.map((t) => [...t]),
    o: c.o.map((t) => [...t]),
    v: c.v.map(([x, y]) => [x - cx, y - cy]),
    c: true,
  }));
}

function signedArea(c) {
  let a = 0;
  const v = c.v;
  for (let i = 0; i < v.length; i++) {
    const j = (i + 1) % v.length;
    a += v[i][0] * v[j][1] - v[j][0] * v[i][1];
  }
  return a / 2;
}

function normalizeWinding(contours) {
  if (!contours.length) return contours;
  let outerIdx = 0;
  let best = 0;
  contours.forEach((c, i) => {
    const a = Math.abs(signedArea(c));
    if (a > best) {
      best = a;
      outerIdx = i;
    }
  });
  return contours.map((c, i) => {
    const a = signedArea(c);
    const wantNeg = i === outerIdx;
    if ((wantNeg && a < 0) || (!wantNeg && a > 0)) return c;
    const v = [...c.v].reverse();
    const inn = [...c.i].reverse();
    const out = [...c.o].reverse();
    return { v, i: out, o: inn, c: true };
  });
}

function makeGroup(contours) {
  const pathItems = contours.map((c, idx) => ({
    ind: 0,
    ty: "sh",
    ix: idx + 1,
    ks: { a: 0, k: c, ix: 2 },
    nm: `Path ${idx + 1}`,
    mn: "ADBE Vector Shape - Group",
    hd: false,
  }));

  return {
    ty: "gr",
    it: [
      ...pathItems,
      {
        ty: "fl",
        c: { a: 0, k: [0, 0.023529411765, 0.874509803922, 1], ix: 4 },
        o: { a: 0, k: 100, ix: 5 },
        r: 2,
        bm: 0,
        nm: "Fill 1",
        mn: "ADBE Vector Graphic - Fill",
        hd: false,
      },
      {
        ty: "tr",
        p: { a: 0, k: [0, 0], ix: 2 },
        a: { a: 0, k: [0, 0], ix: 1 },
        s: { a: 0, k: [GROUP_SCALE, GROUP_SCALE], ix: 3 },
        r: { a: 0, k: 0, ix: 6 },
        o: { a: 0, k: 100, ix: 7 },
        sk: { a: 0, k: 0, ix: 4 },
        sa: { a: 0, k: 0, ix: 5 },
        nm: "Transform",
      },
    ],
    nm: "Letter",
    np: pathItems.length + 3,
    cix: 2,
    bm: 0,
    ix: 1,
    mn: "ADBE Vector Group",
    hd: false,
  };
}

/** Soft X-spread only (source Null behavior) — no glyph morph. */
function makeLayer({ ind, nm, parent, x, y, spreadDx, group, ip, front }) {
  return {
    ddd: front ? 0 : 1,
    ind,
    ty: 4,
    nm,
    parent,
    sr: 1,
    ks: {
      o: { a: 0, k: 100, ix: 11 },
      rx: { a: 0, k: 0, ix: 8 },
      ry: { a: 0, k: 0, ix: 9 },
      rz: { a: 0, k: 0, ix: 10 },
      or: { a: 0, k: [0, 0, 0], ix: 7 },
      p: {
        a: 1,
        k: [
          {
            i: { x: 0, y: 0 },
            o: { x: 0.333, y: 0.333 },
            t: Math.max(3, ip),
            s: [x, y, 0],
            to: [0, 0, 0],
            ti: [0, 0, 0],
          },
          {
            i: { x: 0, y: 1 },
            o: { x: 0.333, y: 0 },
            t: 36,
            s: [x, y, 0],
            to: [0, 0, 0],
            ti: [0, 0, 0],
          },
          {
            i: { x: 0.3, y: 0.3 },
            o: { x: 0.333, y: 0.333 },
            t: 76,
            s: [x + spreadDx, y, 0],
            to: [0, 0, 0],
            ti: [0, 0, 0],
          },
          {
            i: { x: 0, y: 1 },
            o: { x: 1, y: 0 },
            t: 201,
            s: [x + spreadDx, y, 0],
            to: [0, 0, 0],
            ti: [0, 0, 0],
          },
          { t: 241, s: [x, y, 0] },
        ],
        ix: 2,
      },
      a: { a: 0, k: [0, 0, 0], ix: 1 },
      s: { a: 0, k: [100, 100, 100], ix: 6 },
    },
    ao: 0,
    shapes: [group],
    ip,
    op: 263,
    st: 0,
    bm: 0,
  };
}

// ---- main ----
const source = JSON.parse(fs.readFileSync(SRC, "utf8"));
const font = opentype.parse(fs.readFileSync(FONT).buffer);
const fontSize = (CAP / 700) * font.unitsPerEm;
const scale = GROUP_SCALE / 100;

const cache = {};
function glyph(ch) {
  if (cache[ch]) return cache[ch];
  const g = font.charToGlyph(ch);
  const contours = normalizeWinding(center(fontContours(g, fontSize)));
  const advance = (g.advanceWidth / font.unitsPerEm) * fontSize * scale;
  cache[ch] = { contours, advance };
  return cache[ch];
}

function measure(text) {
  let total = 0;
  for (const ch of text) {
    if (ch === " ") total += SPACE;
    else total += glyph(ch).advance + TRACK;
  }
  return total - TRACK;
}

const lineSpans = LINES.map(measure);
const placed = [];
let li = 0;

LINES.forEach((text, lineIdx) => {
  const span = lineSpans[lineIdx];
  const y = (lineIdx - (LINES.length - 1) / 2) * LINE_GAP;
  let cursor = -span / 2;
  for (const ch of text) {
    if (ch === " ") {
      cursor += SPACE;
      continue;
    }
    const g = glyph(ch);
    const w = g.advance;
    const x = cursor + w / 2;
    placed.push({
      ch,
      x,
      y,
      spreadDx: x * 0.16,
      group: makeGroup(g.contours),
      li,
    });
    cursor += w + TRACK;
    li++;
  }
});

const layers = source.assets[0].layers;
const null2 = deepClone(layers.find((l) => l.nm === "Null 2"));
const null1 = deepClone(layers.find((l) => l.nm === "Null 1"));
/** Original Line — path, trim, stroke, position untouched. */
const line = deepClone(layers.find((l) => l.nm === "Line"));

null2.ind = 1;
null1.ind = 2;
null1.parent = 1;
line.parent = 2;
null2.ks.p.k = [1126.5, 540, 0];

let nextInd = 10;
const front = []; // listed before Line → ribbon loops behind these
const back = []; // listed after Line → ribbon overlays these

placed.forEach((p, idx) => {
  const ip = 3 + idx * 2;
  const layer = makeLayer({
    ind: nextInd++,
    nm: `${p.ch} ${idx}`,
    parent: 2,
    x: p.x,
    y: p.y,
    spreadDx: p.spreadDx,
    group: p.group,
    ip,
    front: idx % 2 === 0,
  });
  // Alternate so the original ribbon weaves through the phrase.
  if (idx % 2 === 0) front.push(layer);
  else back.push(layer);
});
line.ind = nextInd++;

const out = deepClone(source);
out.nm = "Harnessing";
out.w = 2223;
out.h = 900;
out.assets = [
  {
    id: "comp_0",
    layers: [...front, line, ...back, null1, null2],
  },
];
if (out.layers?.[0]) {
  out.layers[0].w = 2253;
  out.layers[0].h = 1080;
  out.layers[0].ks.p.k = [1111.5, 470, 0];
  out.layers[0].ks.a.k = [1126.5, 540, 0];
}
out.meta = {
  g: "reletter-v15-clean",
  d: LINES.join(" / "),
  a: "",
  k: "",
  tc: "",
};
fs.writeFileSync(OUT, JSON.stringify(out));
console.log(
  `Wrote ${path.relative(ROOT, OUT)} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB) ` +
    `lines=${LINES.join(" / ")} letters=${placed.length} morph=0 originalLine=yes`,
);
