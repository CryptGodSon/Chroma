import type { Color, ContrastResult } from '../types'

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

export function rgbToHsl(rgb: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / delta + 2) / 6; break
      case b: h = ((r - g) / delta + 4) / 6; break
    }
  }
  return { h, s, l }
}

function linearize(v: number): number {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b)
}

export function hexToColor(hex: string): Color {
  const rgb = hexToRgb(hex)!
  return {
    hex,
    rgb,
    hsl: rgbToHsl(rgb),
    luminance: relativeLuminance(rgb),
  }
}

export function getContrastResult(c1: Color, c2: Color): ContrastResult {
  const lighter = Math.max(c1.luminance, c2.luminance)
  const darker = Math.min(c1.luminance, c2.luminance)
  const ratio = (lighter + 0.05) / (darker + 0.05)
  return {
    ratio,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  }
}

export function getTextColor(color: Color): string {
  return color.luminance > 0.179 ? '#0C0C0C' : '#FFFFFF'
}

export function formatHsl(hsl: { h: number; s: number; l: number }): string {
  return `hsl(${Math.round(hsl.h * 360)} ${Math.round(hsl.s * 100)}% ${Math.round(hsl.l * 100)}%)`
}

export function formatRgb(rgb: { r: number; g: number; b: number }): string {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`
}

export function vibrancyScore(color: Color): number {
  return color.hsl.s * (1 - Math.abs(color.hsl.l - 0.5) * 2)
}
