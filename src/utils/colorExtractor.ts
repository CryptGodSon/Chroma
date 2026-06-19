import { hexToColor, vibrancyScore } from './colorUtils'
import type { Color } from '../types'

function euclidean(a: number[], b: number[]): number {
  return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2)
}

function samplePixels(data: Uint8ClampedArray, maxSamples = 8000): number[][] {
  const pixels: number[][] = []
  const total = data.length / 4
  const step = Math.max(1, Math.floor(total / maxSamples))
  for (let i = 0; i < total; i += step) {
    const o = i * 4
    if (data[o + 3] < 128) continue
    pixels.push([data[o], data[o + 1], data[o + 2]])
  }
  return pixels
}

function initCentroids(pixels: number[][], k: number): number[][] {
  const result: number[][] = []
  const seen = new Set<number>()

  const first = Math.floor(Math.random() * pixels.length)
  seen.add(first)
  result.push([...pixels[first]])

  for (let i = 1; i < k; i++) {
    const weights = pixels.map((p, idx) => {
      if (seen.has(idx)) return 0
      return Math.min(...result.map(c => euclidean(p, c))) ** 2
    })
    const total = weights.reduce((s, w) => s + w, 0)
    let r = Math.random() * total
    let next = 0
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j]
      if (r <= 0) { next = j; break }
    }
    seen.add(next)
    result.push([...pixels[next]])
  }
  return result
}

function runKMeans(pixels: number[][], k: number, iters = 30): number[][] {
  let centroids = initCentroids(pixels, k)

  for (let iter = 0; iter < iters; iter++) {
    const clusters: number[][][] = Array.from({ length: k }, () => [])
    for (const px of pixels) {
      let minD = Infinity, nearest = 0
      for (let i = 0; i < k; i++) {
        const d = euclidean(px, centroids[i])
        if (d < minD) { minD = d; nearest = i }
      }
      clusters[nearest].push(px)
    }

    let converged = true
    const next = centroids.map((c, i) => {
      if (clusters[i].length === 0) return c
      const sum = clusters[i].reduce((a, p) => [a[0]+p[0], a[1]+p[1], a[2]+p[2]], [0,0,0])
      const avg = sum.map(v => Math.round(v / clusters[i].length))
      if (euclidean(avg, c) > 0.5) converged = false
      return avg
    })
    centroids = next
    if (converged) break
  }
  return centroids
}

export function extractColors(img: HTMLImageElement, count: number): Color[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  const maxDim = 250
  const scale = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight, 1)
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale))
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = samplePixels(data)
  if (pixels.length < count) return []

  const centroids = runKMeans(pixels, count)
  const colors = centroids.map(([r, g, b]) => {
    const hex = '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
    return hexToColor(hex)
  })

  // Sort most vibrant first
  return colors.sort((a, b) => vibrancyScore(b) - vibrancyScore(a))
}
