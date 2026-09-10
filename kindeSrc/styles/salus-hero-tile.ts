/** Seamless 6x6 of the 64px Salus marketing hero cells (#EEF2F6 / #CDD5DF). */
const TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="384" viewBox="0 0 384 384" fill="none">
  <rect x="128" y="0" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <rect x="320" y="64" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <rect x="0" y="128" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <rect x="192" y="192" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <rect x="64" y="256" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <rect x="256" y="320" width="64" height="64" fill="#EEF2F6" fill-opacity="0.1"/>
  <path stroke="#CDD5DF" stroke-opacity="0.22" d="M64 0V384M128 0V384M192 0V384M256 0V384M320 0V384M0 64H384M0 128H384M0 192H384M0 256H384M0 320H384"/>
</svg>`;

export const SALUS_HERO_TILE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(TILE_SVG)}`;
