import * as si from 'simple-icons'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dir, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

// ── 1. Icons from simple-icons ──────────────────────────────────────
const SI_APPS = [
  { key: 'siFigma',    bg: '#1E1E1E', fg: '#FFFFFF', out: 'figma'    },
  { key: 'siSketch',   bg: '#FDB300', fg: '#FFFFFF', out: 'sketch'   },
  { key: 'siGimp',     bg: '#5C5543', fg: '#EEEEEE', out: 'gimp'     },
  { key: 'siInkscape', bg: '#0D0D0D', fg: '#EEEEEE', out: 'inkscape' },
  { key: 'siBlender',  bg: '#E87D0D', fg: '#FFFFFF', out: 'blender'  },
  { key: 'siKrita',    bg: '#0B2333', fg: '#3DAEE9', out: 'krita'    },
]

for (const app of SI_APPS) {
  const icon = si[app.key]
  if (!icon) { console.warn(`⚠  Not found: ${app.key}`); continue }
  const pad = 16
  const scale = (100 - pad * 2) / 24
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="${app.bg}"/>
  <g transform="translate(${pad} ${pad}) scale(${scale.toFixed(4)})" fill="${app.fg}">
    <path d="${icon.path}"/>
  </g>
</svg>`
  writeFileSync(join(outDir, `${app.out}.svg`), svg, 'utf8')
  console.log(`✓  ${app.out}.svg  (simple-icons)`)
}

// ── 2. Adobe apps — brand square + 2-letter abbreviation ────────────
// This IS how Adobe app icons actually look (dark bg + colored letters)
const ADOBE_APPS = [
  { label: 'Ps', bg: '#001E36', fg: '#31A8FF', out: 'photoshop'   },
  { label: 'Ai', bg: '#300000', fg: '#FF9A00', out: 'illustrator' },
  { label: 'Id', bg: '#49021F', fg: '#FF3366', out: 'indesign'    },
  { label: 'Xd', bg: '#470137', fg: '#FF61F6', out: 'xd'          },
  { label: 'Ae', bg: '#00005B', fg: '#9999FF', out: 'aftereffects'},
  { label: 'Pr', bg: '#00005B', fg: '#EA77FF', out: 'premiere'    },
  { label: 'Lr', bg: '#001D26', fg: '#31A8FF', out: 'lightroom'   },
  { label: 'An', bg: '#000B1A', fg: '#FF8000', out: 'animate'     },
  { label: 'Au', bg: '#001924', fg: '#00E4BB', out: 'audition'    },
]

for (const app of ADOBE_APPS) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="${app.bg}"/>
  <text
    x="50" y="64"
    text-anchor="middle"
    font-family="'Adobe Clean', 'Arial', sans-serif"
    font-size="38"
    font-weight="700"
    fill="${app.fg}"
    letter-spacing="-1"
  >${app.label}</text>
</svg>`
  writeFileSync(join(outDir, `${app.out}.svg`), svg, 'utf8')
  console.log(`✓  ${app.out}.svg  (Adobe)`)
}

// ── 3. Canva ─────────────────────────────────────────────────────────
// Canva uses a rounded square with a stylised "C" built from arcs
const canvaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cv" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7D2AE7"/>
      <stop offset="100%" stop-color="#00C4CC"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="18" fill="url(#cv)"/>
  <text
    x="50" y="67"
    text-anchor="middle"
    font-family="'Arial Rounded MT Bold','Arial',sans-serif"
    font-size="52"
    font-weight="800"
    fill="white"
  >C</text>
</svg>`
writeFileSync(join(outDir, 'canva.svg'), canvaSvg, 'utf8')
console.log('✓  canva.svg')

// ── 4. Affinity suite ────────────────────────────────────────────────
const AFFINITY = [
  { name: 'Affinity\nDesigner', bg: '#1B72BE', letter: 'D', out: 'affinity-designer' },
  { name: 'Affinity\nPhoto',    bg: '#B32B2B', letter: 'P', out: 'affinity-photo'    },
  { name: 'Affinity\nPublisher',bg: '#C27900', letter: 'U', out: 'affinity-publisher'},
]

for (const app of AFFINITY) {
  // Affinity icons: dark gradient square with a white triangle/diamond shape + letter
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="${app.bg}"/>
  <polygon points="50,18 85,78 15,78" fill="white" opacity="0.25"/>
  <text
    x="50" y="67"
    text-anchor="middle"
    font-family="'Arial',sans-serif"
    font-size="36"
    font-weight="800"
    fill="white"
  >${app.letter}</text>
</svg>`
  writeFileSync(join(outDir, `${app.out}.svg`), svg, 'utf8')
  console.log(`✓  ${app.out}.svg  (Affinity)`)
}

// ── 5. Procreate ─────────────────────────────────────────────────────
const procSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="#1C1C1E"/>
  <circle cx="50" cy="50" r="28" stroke="white" stroke-width="4" fill="none"/>
  <circle cx="50" cy="50" r="10" fill="white"/>
  <circle cx="50" cy="50" r="4" fill="#1C1C1E"/>
</svg>`
writeFileSync(join(outDir, 'procreate.svg'), procSvg, 'utf8')
console.log('✓  procreate.svg')

console.log(`\nAll icons written to public/icons/`)
