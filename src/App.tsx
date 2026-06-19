import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { ImageDropzone } from './components/ImageDropzone'
import { ColorPalette } from './components/ColorPalette'
import { BackgroundLogos } from './components/BackgroundLogos'
import { extractColors } from './utils/colorExtractor'
import { hexToColor, vibrancyScore } from './utils/colorUtils'
import type { Palette, ThemeId } from './types'

type View = 'home' | 'palette'

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div
        className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
      />
      <p className="text-[13px] font-mono animate-pulse" style={{ color: 'var(--text-3)' }}>
        extracting colors…
      </p>
    </div>
  )
}

export default function App() {
  const [imageData, setImageData] = useState<{ img: HTMLImageElement; url: string } | null>(null)
  const [colorCount, setColorCount] = useState(6)
  const [palette, setPalette] = useState<Palette | null>(null)
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<ThemeId>('light')
  const [view, setView] = useState<View>('home')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Signature element: UI accent adapts to the dominant extracted color
  useEffect(() => {
    if (palette && palette.colors.length > 0) {
      const dominant = [...palette.colors].sort((a, b) => vibrancyScore(b) - vibrancyScore(a))[0]
      document.documentElement.style.setProperty('--accent', dominant.hex)
      const { r, g, b } = dominant.rgb
      document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
    } else {
      document.documentElement.style.setProperty('--accent', '#4F46E5')
      document.documentElement.style.setProperty('--accent-rgb', '79, 70, 229')
    }
  }, [palette])

  const runExtraction = async (img: HTMLImageElement, url: string, count: number) => {
    setLoading(true)
    setView('palette')
    await new Promise(r => setTimeout(r, 60))
    const colors = extractColors(img, count).map(c => hexToColor(c.hex))
    setPalette({ colors, imageUrl: url })
    setLoading(false)
  }

  const handleImageLoad = (img: HTMLImageElement, url: string) => {
    setImageData({ img, url })
    runExtraction(img, url, colorCount)
  }

  const handleColorCountChange = (n: number) => {
    setColorCount(n)
    if (imageData) runExtraction(imageData.img, imageData.url, n)
  }

  // Logo click: go home, but palette stays in memory
  const handleLogoClick = () => {
    if (view === 'palette') setView('home')
    else if (view === 'home') {
      // Already home — if no palette, do nothing
      // If palette exists, show it again
      if (palette) setView('palette')
    }
  }

  const handleNewPhoto = () => {
    // Clear everything and go home
    setPalette(null)
    setImageData(null)
    setView('home')
  }

  const handleResumepalette = () => {
    if (palette) setView('palette')
  }

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 relative" style={{ backgroundColor: 'var(--bg)' }}>
      <BackgroundLogos />

      <Header
        dominantColor={palette?.colors[0]}
        theme={theme}
        onThemeChange={setTheme}
        onLogoClick={handleLogoClick}
      />

      <div className="relative z-10">
      {loading ? (
        <LoadingScreen />
      ) : view === 'palette' && palette ? (
        <ColorPalette
          palette={palette}
          colorCount={colorCount}
          onColorCountChange={handleColorCountChange}
          onReset={handleNewPhoto}
        />
      ) : (
        <ImageDropzone
          onImageLoad={handleImageLoad}
          existingPalette={palette}
          onResumePalette={handleResumepalette}
        />
      )}
      </div>
    </div>
  )
}
