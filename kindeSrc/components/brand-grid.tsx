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
const MIN_VISIBILITY = 0.22;
// Inclusive columns that stay whole beside the 36rem form on a 1440px desktop.
// Wider screens show more of the grid; a tile outside this band can be sliced.
const SCREEN_COLS: [number, number] = [8, 21];
// One shared clock, evenly spaced, so the number of lit buttons stays steady.
// The glow window is the last 12.5% of the cycle (8 of 64 buttons).
const PULSE_COUNT = 64;
const PULSE_DURATION = 52;
const LIT_WINDOW = 8;
// Peak opacity is 0.08 at the top and fades toward 0.05 lower on the panel.
const PEAK_MAX = 0.08;
const PEAK_FLOOR = 0.6;
// Random ± fraction applied to each button's peak so neighbours never match.
const PEAK_JITTER = 0.15;
// A console is a field of buttons, so placement is even across the visible panel.
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

// Falloff from the top center. Faint cells are skipped, and the rest glow
// a little dimmer as they get lower on the panel.
function visibility(col: number, row: number) {
  const dx = (col * CELL + CELL / 2 - WIDTH / 2) / (0.95 * WIDTH);
  const dy = (row * CELL + CELL / 2) / (0.95 * HEIGHT);
  const d = Math.hypot(dx, dy);
  if (d >= 1) return 0;
  if (d <= 0.55) return 1 - 0.45 * (d / 0.55);
  return 0.55 * (1 - (d - 0.55) / 0.45);
}

function screenWeight(col: number) {
  const [start, end] = SCREEN_COLS;
  if (col >= start && col <= end) return 1;
  return 0;
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

// Tiles stay inside columns that are fully on screen, and on a checkerboard so
// two glowing squares never share an edge. The on-screen band is too narrow for
// the dart throw to reach 64.
function buildTiles(): PulseTile[] {
  const next = mulberry32(SEED);
  const pool: GridCell[] = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLUMNS; col += 1) {
      if ((col + row) % 2 !== 0) continue;
      const weight = visibility(col, row) * screenWeight(col);
      if (weight >= MIN_VISIBILITY) pool.push({ col, row, weight });
    }
  }

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    const swap = pool[i];
    pool[i] = pool[j];
    pool[j] = swap;
  }

  const path = spreadOrder(pool.slice(0, PULSE_COUNT));

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
      <path d={GRID_LINES} fill="none" stroke={TILE_FILL} strokeOpacity={PEAK_MAX} />
    </svg>
  );
};
