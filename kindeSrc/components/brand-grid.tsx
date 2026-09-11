"use server";

import React from "react";

const HIGHLIGHTS: [number, number][] = [
  [0, 384],
  [0, 576],
  [64, 256],
  [128, 448],
  [128, 640],
  [128, 768],
  [192, 128],
  [192, 320],
  [256, 512],
  [320, 64],
  [320, 832],
  [384, 256],
  [448, 384],
  [448, 576],
  [512, 192],
  [512, 704],
  [512, 896],
  [576, 64],
  [576, 512],
  [640, 768],
  [704, 192],
  [704, 640],
  [1152, 192],
  [1152, 640],
  [1216, 768],
  [1280, 64],
  [1280, 512],
  [1344, 192],
  [1344, 704],
  [1344, 896],
  [1408, 384],
  [1408, 576],
  [1472, 256],
  [1536, 64],
  [1536, 832],
  [1600, 512],
  [1664, 128],
  [1664, 320],
  [1728, 448],
  [1728, 640],
  [1728, 768],
  [1792, 256],
  [1856, 384],
  [1856, 576],
];

const GRID_LINES =
  "M64 0V960M128 0V960M192 0V960M256 0V960M320 0V960M384 0V960M448 0V960M512 0V960M576 0V960M640 0V960M704 0V960M768 0V960M832 0V960M896 0V960M960 0V960M1024 0V960M1088 0V960M1152 0V960M1216 0V960M1280 0V960M1344 0V960M1408 0V960M1472 0V960M1536 0V960M1600 0V960M1664 0V960M1728 0V960M1792 0V960M1856 0V960M0 64H1920M0 128H1920M0 192H1920M0 256H1920M0 320H1920M0 384H1920M0 448H1920M0 512H1920M0 576H1920M0 640H1920M0 704H1920M0 768H1920M0 832H1920M0 896H1920";

export const BrandGrid = () => {
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
      <g mask="url(#salus-hero-mask)">
        <path d={GRID_LINES} fill="none" stroke="#CDD5DF" strokeOpacity="0.28" />
        {HIGHLIGHTS.map(([x, y]) => (
          <rect
            fill="#EEF2F6"
            fillOpacity="0.12"
            height="64"
            key={`${x}-${y}`}
            width="64"
            x={x}
            y={y}
          />
        ))}
      </g>
    </svg>
  );
};
