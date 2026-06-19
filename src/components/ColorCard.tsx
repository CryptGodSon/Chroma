import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Color } from '../types'
import { getTextColor, formatHsl, formatRgb } from '../utils/colorUtils'

interface Props {
  color: Color
  index: number
}

export function ColorCard({ color, index }: Props) {
  const [copied, setCopied] = useState<string | null>(null)
  const textColor = getTextColor(color)

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1800)
  }

  const rows = [
    { label: 'HEX', value: color.hex },
    { label: 'RGB', value: formatRgb(color.rgb) },
    { label: 'HSL', value: formatHsl(color.hsl) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      {/* Swatch */}
      <button
        onClick={() => copy(color.hex, 'HEX')}
        className="relative w-full group overflow-hidden"
        style={{ backgroundColor: color.hex, height: '120px' }}
        title="Copy HEX"
      >
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
        >
          <span className="text-[11px] font-mono font-medium" style={{ color: textColor }}>
            {copied === 'HEX' ? '✓ Copied' : 'Copy HEX'}
          </span>
        </div>
        <span
          className="absolute bottom-2 left-3 text-[10px] font-mono opacity-50"
          style={{ color: textColor }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </button>

      {/* Values */}
      <div className="p-2 space-y-0.5">
        {rows.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => copy(value, label)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors duration-100 text-left"
            style={{ ['--tw-bg-opacity' as string]: '1' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span className="text-[10px] font-mono w-7 shrink-0" style={{ color: 'var(--text-3)' }}>{label}</span>
            <span className="text-[11px] font-mono flex-1 truncate" style={{ color: 'var(--text-1)' }}>
              {copied === label
                ? <span className="text-emerald-500">✓ Copied</span>
                : value}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
