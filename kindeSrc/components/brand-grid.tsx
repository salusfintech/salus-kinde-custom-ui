"use server";

import React from "react";

const CELL = 64;
const PULSE_COUNT = 64;
const PULSE_DURATION = 52;
const LIT_WINDOW = 8;
const PEAK_MAX = 0.08;
const BRAND_BLUE = "#0015d6";
const TILE_FILL = "#F5F2EA";
// Opaque blend of TILE_FILL at PEAK_MAX over BRAND_BLUE. A translucent stroke
// painted over a lit square would add a second coat and brighten the edge.
const LINE_STROKE = "#1427d8";

// Frozen from seed 0x5a1506: 64 squares, columns 8–21, rows 0–13, no two
// sharing an edge. Searching for this on the request exceeds Kinde's
// instruction limit before the page finishes rendering.
const PULSE_TILES: { col: number; row: number; slot: number }[] = [
  { col: 15, row: 10, slot: 0 }, { col: 9, row: 0, slot: 1 }, { col: 20, row: 0, slot: 2 }, { col: 8, row: 8, slot: 3 },
  { col: 21, row: 13, slot: 4 }, { col: 15, row: 4, slot: 5 }, { col: 20, row: 7, slot: 6 }, { col: 11, row: 12, slot: 7 },
  { col: 16, row: 12, slot: 8 }, { col: 8, row: 1, slot: 9 }, { col: 21, row: 1, slot: 10 }, { col: 9, row: 7, slot: 11 },
  { col: 12, row: 0, slot: 12 }, { col: 14, row: 5, slot: 13 }, { col: 21, row: 8, slot: 14 }, { col: 9, row: 12, slot: 15 },
  { col: 17, row: 13, slot: 16 }, { col: 16, row: 1, slot: 17 }, { col: 20, row: 3, slot: 18 }, { col: 8, row: 6, slot: 19 },
  { col: 12, row: 9, slot: 20 }, { col: 16, row: 6, slot: 21 }, { col: 21, row: 11, slot: 22 }, { col: 8, row: 11, slot: 23 },
  { col: 15, row: 13, slot: 24 }, { col: 15, row: 0, slot: 25 }, { col: 21, row: 4, slot: 26 }, { col: 9, row: 3, slot: 27 },
  { col: 19, row: 1, slot: 28 }, { col: 15, row: 7, slot: 29 }, { col: 20, row: 10, slot: 30 }, { col: 9, row: 9, slot: 31 },
  { col: 13, row: 13, slot: 32 }, { col: 14, row: 1, slot: 33 }, { col: 19, row: 5, slot: 34 }, { col: 8, row: 4, slot: 35 },
  { col: 12, row: 5, slot: 36 }, { col: 17, row: 11, slot: 37 }, { col: 18, row: 8, slot: 38 }, { col: 10, row: 8, slot: 39 },
  { col: 13, row: 11, slot: 40 }, { col: 17, row: 0, slot: 41 }, { col: 18, row: 4, slot: 42 }, { col: 20, row: 12, slot: 43 },
  { col: 11, row: 3, slot: 44 }, { col: 13, row: 7, slot: 45 }, { col: 17, row: 9, slot: 46 }, { col: 10, row: 6, slot: 47 },
  { col: 10, row: 11, slot: 48 }, { col: 14, row: 12, slot: 49 }, { col: 18, row: 2, slot: 50 }, { col: 19, row: 13, slot: 51 },
  { col: 13, row: 2, slot: 52 }, { col: 17, row: 5, slot: 53 }, { col: 19, row: 9, slot: 54 }, { col: 10, row: 4, slot: 55 },
  { col: 15, row: 2, slot: 56 }, { col: 17, row: 7, slot: 57 }, { col: 19, row: 11, slot: 58 }, { col: 13, row: 4, slot: 59 },
  { col: 18, row: 12, slot: 60 }, { col: 14, row: 3, slot: 61 }, { col: 18, row: 10, slot: 62 }, { col: 18, row: 6, slot: 63 },
];

const GRID_LINES =
  "M64 0V960M128 0V960M192 0V960M256 0V960M320 0V960M384 0V960M448 0V960M512 0V960M576 0V960M640 0V960M704 0V960M768 0V960M832 0V960M896 0V960M960 0V960M1024 0V960M1088 0V960M1152 0V960M1216 0V960M1280 0V960M1344 0V960M1408 0V960M1472 0V960M1536 0V960M1600 0V960M1664 0V960M1728 0V960M1792 0V960M1856 0V960M0 64H1920M0 128H1920M0 192H1920M0 256H1920M0 320H1920M0 384H1920M0 448H1920M0 512H1920M0 576H1920M0 640H1920M0 704H1920M0 768H1920M0 832H1920M0 896H1920";

// One SVG string, not one React element per square. Kinde's page runtime
// stops inside React's element setup once the instruction budget is spent.
function gridMarkup(phaseOffset: number) {
  let tiles = "";
  for (let index = 0; index < PULSE_TILES.length; index += 1) {
    const tile = PULSE_TILES[index];
    const phase = (tile.slot / PULSE_COUNT + phaseOffset) % 1;
    const delay = -Math.round(phase * PULSE_DURATION * 100) / 100;
    const className = tile.slot < LIT_WINDOW ? "tile is-rest" : "tile";
    tiles += `<rect class="${className}" fill="${TILE_FILL}" height="${CELL}" width="${CELL}" x="${tile.col * CELL}" y="${tile.row * CELL}" style="--delay:${delay}s;--dur:${PULSE_DURATION}s;--peak:${PEAK_MAX}"/>`;
  }

  return `${tiles}<path d="${GRID_LINES}" fill="none" stroke="${LINE_STROKE}"/><defs><radialGradient cx="50%" cy="0%" id="salus-hero-veil" r="95%"><stop offset="0%" stop-color="${BRAND_BLUE}" stop-opacity="0"/><stop offset="55%" stop-color="${BRAND_BLUE}" stop-opacity="0.45"/><stop offset="100%" stop-color="${BRAND_BLUE}" stop-opacity="1"/></radialGradient></defs><rect fill="url(#salus-hero-veil)" height="960" width="1920"/>`;
}

export const BrandGrid = () => {
  const phaseOffset = Math.random();
  return (
    <svg
      aria-hidden="true"
      className="brand-grid"
      dangerouslySetInnerHTML={{ __html: gridMarkup(phaseOffset) }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 960"
    />
  );
};
