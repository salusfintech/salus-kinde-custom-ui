"use server";

import React from "react";

const GRID_ROWS = 15;
const CELL = 64;
// Tiles fill the cell. The grid stroke is painted after them, so the line stays
// on top and the fill meets it without a gap from subpixel rounding.
const TILE_INSET = 0;
const MIN_SEPARATION = 2;
// Inclusive columns that stay whole beside the 36rem form on a 1440px desktop.
// Wider screens show more of the grid; a tile outside this band can be sliced.
const SCREEN_COLS: [number, number] = [8, 21];
// One shared clock, evenly spaced, so the number of lit buttons stays steady.
// The glow window is the last 12.5% of the cycle (8 of 64 buttons).
const PULSE_COUNT = 64;
const PULSE_DURATION = 52;
const LIT_WINDOW = 8;
// Every square peaks at the same opacity as the grid line.
const PEAK_MAX = 0.08;
const BRAND_BLUE = "#0015d6";
// Warm off-white, shared by the grid lines and the glowing squares.
const TILE_FILL = "#F5F2EA";
const SEED = 0x5a1506;

type GridCell = {
  col: number;
  row: number;
};

type PulseTile = {
  col: number;
  row: number;
  slot: number;
  peak: number;
};

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Opaque stroke of TILE_FILL at PEAK_MAX over the brand blue. A translucent
// stroke painted over a lit square would add a second coat and brighten the edge.
function lineStroke() {
  const channel = (hex: string, offset: number) => Number.parseInt(hex.slice(offset, offset + 2), 16);
  const mix = (foreground: number, background: number) =>
    Math.round(background + (foreground - background) * PEAK_MAX)
      .toString(16)
      .padStart(2, "0");
  return `#${[1, 3, 5].map((offset) => mix(channel(TILE_FILL, offset), channel(BRAND_BLUE, offset))).join("")}`;
}

const LINE_STROKE = lineStroke();

// Order buttons so the ones that glow together (a sliding window of LIT_WINDOW)
// are spread across the panel, including across the loop point.
function spreadOrder(cells: GridCell[]): GridCell[] {
  if (cells.length === 0) return [];
  const count = cells.length;
  const remaining = cells.slice();
  const path: GridCell[] = [remaining.shift() as GridCell];
  while (remaining.length > 0) {
    const index = path.length;
    const recent: GridCell[] = [];
    for (let earlier = 0; earlier < path.length; earlier += 1) {
      const backward = index - earlier;
      const forward = earlier - index + count;
      if ((backward > 0 && backward < LIT_WINDOW) || (forward > 0 && forward < LIT_WINDOW)) {
        recent.push(path[earlier]);
      }
    }
    let bestIndex = 0;
    let bestScore = -1;
    for (let i = 0; i < remaining.length; i += 1) {
      const cell = remaining[i];
      let nearest = Infinity;
      for (const prev of recent) {
        const distance = Math.hypot(cell.col - prev.col, cell.row - prev.row);
        if (distance < nearest) nearest = distance;
      }
      if (nearest > bestScore) {
        bestScore = nearest;
        bestIndex = i;
      }
    }
    path.push(remaining.splice(bestIndex, 1)[0]);
  }
  return path;
}

// Scattered tiles in the columns that stay fully on screen. The bottom row is
// left empty so a square does not cover the copyright line. Packs are drawn
// until 64 fit without two squares sharing an edge, then the most crowded
// extras are dropped.
function buildTiles(): PulseTile[] {
  const next = mulberry32(SEED);
  const pool: GridCell[] = [];
  const [startCol, endCol] = SCREEN_COLS;
  for (let row = 0; row < GRID_ROWS - 1; row += 1) {
    for (let col = startCol; col <= endCol; col += 1) {
      pool.push({ col, row });
    }
  }

  let roster: GridCell[] = [];
  for (let attempt = 0; attempt < 1000 && roster.length < PULSE_COUNT; attempt += 1) {
    const packed: GridCell[] = [];
    const order = pool.slice();
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(next() * (i + 1));
      const swap = order[i];
      order[i] = order[j];
      order[j] = swap;
    }
    for (const cell of order) {
      const blocked = packed.some(
        (other) => Math.abs(cell.col - other.col) + Math.abs(cell.row - other.row) < MIN_SEPARATION,
      );
      if (!blocked) packed.push(cell);
    }
    if (packed.length > roster.length) roster = packed;
  }

  while (roster.length > PULSE_COUNT) {
    let crowded = 0;
    let crowdedDistance = Infinity;
    for (let index = 0; index < roster.length; index += 1) {
      const cell = roster[index];
      let nearest = Infinity;
      for (let otherIndex = 0; otherIndex < roster.length; otherIndex += 1) {
        if (otherIndex === index) continue;
        const other = roster[otherIndex];
        const distance = Math.hypot(cell.col - other.col, cell.row - other.row);
        if (distance < nearest) nearest = distance;
      }
      if (nearest < crowdedDistance) {
        crowdedDistance = nearest;
        crowded = index;
      }
    }
    roster.splice(crowded, 1);
  }

  const path = spreadOrder(roster.slice(0, PULSE_COUNT));

  return path.map((cell, index) => ({
    col: cell.col,
    row: cell.row,
    slot: index,
    peak: PEAK_MAX,
  }));
}

const PULSE_TILES = buildTiles();

function tileStyle(tile: PulseTile, phaseOffset: number) {
  const phase = (tile.slot / PULSE_COUNT + phaseOffset) % 1;
  return {
    "--delay": `${-Math.round(phase * PULSE_DURATION * 100) / 100}s`,
    "--dur": `${PULSE_DURATION}s`,
    "--peak": `${tile.peak}`,
  } as React.CSSProperties;
}

const GRID_LINES =
  "M64 0V960M128 0V960M192 0V960M256 0V960M320 0V960M384 0V960M448 0V960M512 0V960M576 0V960M640 0V960M704 0V960M768 0V960M832 0V960M896 0V960M960 0V960M1024 0V960M1088 0V960M1152 0V960M1216 0V960M1280 0V960M1344 0V960M1408 0V960M1472 0V960M1536 0V960M1600 0V960M1664 0V960M1728 0V960M1792 0V960M1856 0V960M0 64H1920M0 128H1920M0 192H1920M0 256H1920M0 320H1920M0 384H1920M0 448H1920M0 512H1920M0 576H1920M0 640H1920M0 704H1920M0 768H1920M0 832H1920M0 896H1920";

export const BrandGrid = () => {
  const phaseOffset = Math.random();
  return (
    <svg
      aria-hidden="true"
      className="brand-grid"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 960"
    >
      {PULSE_TILES.map((tile) => (
        <rect
          className={tile.slot < LIT_WINDOW ? "tile is-rest" : "tile"}
          fill={TILE_FILL}
          height={CELL - TILE_INSET * 2}
          key={`${tile.col}-${tile.row}`}
          style={tileStyle(tile, phaseOffset)}
          width={CELL - TILE_INSET * 2}
          x={tile.col * CELL + TILE_INSET}
          y={tile.row * CELL + TILE_INSET}
        />
      ))}
      <path d={GRID_LINES} fill="none" stroke={LINE_STROKE} />
      <defs>
        <radialGradient cx="50%" cy="0%" id="salus-hero-veil" r="95%">
          <stop offset="0%" stopColor={BRAND_BLUE} stopOpacity="0" />
          <stop offset="55%" stopColor={BRAND_BLUE} stopOpacity="0.45" />
          <stop offset="100%" stopColor={BRAND_BLUE} stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect fill="url(#salus-hero-veil)" height="960" width="1920" />
    </svg>
  );
};
