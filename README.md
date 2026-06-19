<div align="center">

<img src="https://raw.githubusercontent.com/CryptGodSon/Chroma/main/public/favicon.svg" width="64" alt="Chroma logo" />

# Chroma

**Extract beautiful color palettes from any photo — instantly, in your browser.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-cryptgodson.github.io%2FChroma-6366f1?style=for-the-badge&logo=github)](https://cryptgodson.github.io/Chroma/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## What is Chroma?

Drop a photo of a sunset, a mural, a coffee cup — anything with colors worth capturing. Chroma extracts the dominant palette using **K-means++ clustering**, gives you HEX, RGB and HSL codes, checks **WCAG contrast ratios**, and lets you export to CSS, SCSS or Figma JSON.

Everything happens in your browser. Nothing is uploaded. Ever.

---

## Features

- **Color extraction** — K-means++ clustering on canvas pixel data, up to 8 colors
- **WCAG contrast analysis** — AA / AAA compliance for every color pair
- **One-click copy** — HEX, RGB, HSL — click any value to copy it
- **Export** — CSS custom properties, SCSS variables, Figma Design Tokens JSON
- **5 themes** — Light, White, Warm, Dark, Black
- **Dynamic accent** — UI adapts to the most vibrant color in your palette
- **Private by design** — Canvas API only, zero server contact

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Color Algorithm | K-means++ (custom implementation) |
| File Input | react-dropzone |
| Icons | Lucide React |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/CryptGodSon/Chroma.git
cd Chroma

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build
```

---

## How It Works

1. **Drop a photo** — any PNG, JPG, WEBP or GIF
2. **Canvas scales it** to 250×250px for fast processing
3. **K-means++** clusters pixels into N dominant colors
4. Colors are **sorted by vibrancy** (saturation × proximity to 50% lightness)
5. WCAG **luminance** is computed for every color pair
6. Results are displayed with copy-on-click and export options

---

## Privacy

Photos are processed entirely client-side via the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). No image data, pixel data, or metadata ever leaves your device.

---

<div align="center">

Made by [CryptGodSon](https://github.com/CryptGodSon)

</div>
