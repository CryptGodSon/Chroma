export interface Color {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  luminance: number
}

export interface ContrastResult {
  ratio: number
  aa: boolean
  aaLarge: boolean
  aaa: boolean
  aaaLarge: boolean
}

export interface Palette {
  colors: Color[]
  imageUrl: string
}

export type ThemeId = 'light' | 'white' | 'warm' | 'dark' | 'black'
