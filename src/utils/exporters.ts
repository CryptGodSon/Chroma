import type { Color } from '../types'
import { formatHsl, formatRgb } from './colorUtils'

export function exportCSS(colors: Color[]): string {
  const vars = colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')
  return `:root {\n${vars}\n}`
}

export function exportSCSS(colors: Color[]): string {
  return colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n')
}

export function exportFigma(colors: Color[]): string {
  const tokens: Record<string, unknown> = {}
  colors.forEach((c, i) => {
    tokens[`color-${i + 1}`] = {
      $value: c.hex,
      $type: 'color',
      $description: `${formatHsl(c.hsl)} · ${formatRgb(c.rgb)}`,
    }
  })
  return JSON.stringify({ 'chroma-palette': tokens }, null, 2)
}

export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
