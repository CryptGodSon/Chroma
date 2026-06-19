import { motion } from 'framer-motion'
import type { Palette } from '../types'
import { ColorCard } from './ColorCard'
import { ContrastPairs } from './ContrastPairs'
import { ExportPanel } from './ExportPanel'

interface Props {
  palette: Palette
  colorCount: number
  onColorCountChange: (n: number) => void
  onReset: () => void
}

export function ColorPalette({ palette, colorCount, onColorCountChange, onReset }: Props) {
  const { colors, imageUrl } = palette

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-1 ring-black/10 shrink-0">
            <img src={imageUrl} alt="Source" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold leading-snug" style={{ color: 'var(--text-1)' }}>
              Extracted Palette
            </h2>
            <p className="text-[12px] font-mono" style={{ color: 'var(--text-3)' }}>
              {colors.length} dominant colors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Color count selector */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>n =</span>
            {[4, 5, 6, 8].map(n => (
              <button
                key={n}
                onClick={() => onColorCountChange(n)}
                className="w-6 h-6 rounded-lg text-[11px] font-mono font-medium transition-all duration-150"
                style={colorCount === n
                  ? { backgroundColor: 'var(--accent)', color: '#fff' }
                  : { color: 'var(--text-2)' }
                }
              >
                {n}
              </button>
            ))}
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[12px] font-medium transition-all duration-150"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            New photo
          </button>
        </div>
      </div>

      {/* Color strip */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="h-16 rounded-2xl overflow-hidden flex mb-8 shadow-sm"
      >
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 transition-[flex] duration-300 hover:flex-[2] cursor-pointer relative group"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          >
            <span
              className="absolute bottom-1 left-0 right-0 text-center text-[9px] font-mono opacity-0 group-hover:opacity-70 transition-opacity duration-150"
              style={{ color: color.luminance > 0.179 ? '#000' : '#fff' }}
            >
              {color.hex}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Color cards */}
      <div className={`grid gap-4 mb-10 ${
        colors.length <= 4 ? 'grid-cols-2 sm:grid-cols-4' :
        colors.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' :
        'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
      }`}>
        {colors.map((color, i) => (
          <ColorCard key={color.hex + i} color={color} index={i} />
        ))}
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          className="rounded-2xl p-6 border shadow-sm"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <ContrastPairs colors={colors} />
        </div>
        <div
          className="rounded-2xl p-6 border shadow-sm"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <ExportPanel colors={colors} />
        </div>
      </div>
    </div>
  )
}
