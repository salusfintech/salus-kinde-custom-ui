"use server";

import React from "react";

const GRID_COLUMNS = 30;
const GRID_ROWS = 15;
const CELL = 64;
// Tiles fill the cell. The grid stroke is painted after them, so the line stays
// on top and the fill meets it without a gap from subpixel rounding.
const TILE_INSET = 0;
const WIDTH = GRID_COLUMNS * CELL;
const HEIGHT = GRID_ROWS * CELL;
const MIN_SEPARATION = 2;
const MIN_VISIBILITY = 0.22;
// The panel sits beside a fixed 36rem form and uses xMidYMid slice, so on
// common screens only the middle columns are on screen (≈7.8–22.2 at 1440x900,
// ≈5.7–24.3 at 1920x1080). Columns beyond this band are never visible.
const SCREEN_FULL_COLS: [number, number] = [7, 23];
const SCREEN_EDGE_COLS: [number, number] = [4, 26];
// One shared clock, evenly spaced, so the number of lit buttons stays steady.
// The glow window is the last 12.5% of the cycle (8 of 64 buttons).
const PULSE_COUNT = 64;
const PULSE_DURATION = 52;
const LIT_WINDOW = 8;
// Peak opacity scales with mask visibility: 0.08 at the top, fading toward 0.05.
const PEAK_MAX = 0.08;
const PEAK_FLOOR = 0.6;
// Random ± fraction applied to each button's peak so neighbours never match.
const PEAK_JITTER = 0.15;
// A console is a field of buttons, so placement is even across the visible panel.
const CORNER_BIAS = 0;
// Warm off-white, shared by the grid lines and the glowing squares.
const TILE_FILL = "#F5F2EA";
const SEED = 0x5a1506;

type GridCell = {
  col: number;
  row: number;
  weight: number;
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

// How much of a cell survives the salus-hero-fade mask (cx 50%, cy 0%, r 95%,
// objectBoundingBox units, stops 1 -> 0.55 at 55% -> 0 at 100%).
function visibility(col: number, row: number) {
  const dx = (col * CELL + CELL / 2 - WIDTH / 2) / (0.95 * WIDTH);
  const dy = (row * CELL + CELL / 2) / (0.95 * HEIGHT);
  const d = Math.hypot(dx, dy);
  if (d >= 1) return 0;
  if (d <= 0.55) return 1 - 0.45 * (d / 0.55);
  return 0.55 * (1 - (d - 0.55) / 0.45);
}

// Likelihood that a column is inside the sliced viewport on a typical screen.
function screenWeight(col: number) {
  const center = col + 0.5;
  const [fullStart, fullEnd] = SCREEN_FULL_COLS;
  const [edgeStart, edgeEnd] = SCREEN_EDGE_COLS;
  if (center >= fullStart && center <= fullEnd) return 1;
  if (center < edgeStart || center > edgeEnd) return 0;
  if (center < fullStart) return (center - edgeStart) / (fullStart - edgeStart);
  return (edgeEnd - center) / (edgeEnd - fullEnd);
}

// Placement multiplier (>= 1) that favours the top-left corner near the logo.
function cornerBias(col: number, row: number) {
  const nx = (col + 0.5) / GRID_COLUMNS;
  const ny = (row + 0.5) / GRID_ROWS;
  const d = Math.hypot(nx, ny) / Math.SQRT2;
  return 1 + CORNER_BIAS * (1 - d);
}

// Manhattan distance: a separation of 2 forbids edge-adjacent tiles but allows
// diagonal neighbours, which packs the roster denser than a Chebyshev rule.
function cellDistance(a: GridCell, b: GridCell) {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}

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

// Blue-noise roster of buttons inside the on-screen crop. Buttons share one
// clock, spaced evenly, so a steady handful stay lit.
function buildTiles(): PulseTile[] {
  const next = mulberry32(SEED);
  const pool: GridCell[] = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLUMNS; col += 1) {
      const weight = visibility(col, row) * screenWeight(col);
      if (weight >= MIN_VISIBILITY) pool.push({ col, row, weight });
    }
  }

  const roster: GridCell[] = [];
  let attempts = 0;
  while (roster.length < PULSE_COUNT && attempts < 20000) {
    attempts += 1;
    const cell = pool[Math.floor(next() * pool.length)];
    if (next() > cell.weight * cornerBias(cell.col, cell.row)) continue;
    if (roster.some((other) => cellDistance(cell, other) < MIN_SEPARATION)) continue;
    roster.push(cell);
  }

  const path = spreadOrder(roster.slice(0, PULSE_COUNT));

  return path.map((cell, index) => {
    const jitter = 1 + (next() * 2 - 1) * PEAK_JITTER;
    const peak = PEAK_MAX * (PEAK_FLOOR + (1 - PEAK_FLOOR) * cell.weight) * jitter;
    return {
      col: cell.col,
      row: cell.row,
      slot: index,
      peak: Math.round(peak * 1000) / 1000,
    };
  });
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
      <defs>
        <radialGradient cx="50%" cy="0%" id="salus-hero-fade" r="95%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="salus-hero-mask">
          <rect fill="url(#salus-hero-fade)" height="960" width="1920" />
        </mask>
      </defs>
      {PULSE_TILES.map((tile) => (
        <rect
          className="tile"
          fill={TILE_FILL}
          height={CELL - TILE_INSET * 2}
          key={`${tile.col}-${tile.row}`}
          style={tileStyle(tile, phaseOffset)}
          width={CELL - TILE_INSET * 2}
          x={tile.col * CELL + TILE_INSET}
          y={tile.row * CELL + TILE_INSET}
        />
      ))}
      <g mask="url(#salus-hero-mask)">
        <path d={GRID_LINES} fill="none" stroke={TILE_FILL} strokeOpacity={PEAK_MAX} />
      </g>
    </svg>
  );
};
