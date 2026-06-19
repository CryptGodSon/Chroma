import { useState } from 'react'
import type { Color } from '../types'
import { exportCSS, exportSCSS, exportFigma, downloadText } from '../utils/exporters'

interface Props {
  colors: Color[]
}

type Format = 'css' | 'scss' | 'figma'

const FORMATS: { id: Format; label: string; ext: string }[] = [
  { id: 'css', label: 'CSS', ext: 'css' },
  { id: 'scss', label: 'SCSS', ext: 'scss' },
  { id: 'figma', label: 'Figma JSON', ext: 'json' },
]

export function ExportPanel({ colors }: Props) {
  const [format, setFormat] = useState<Format>('css')
  const [copied, setCopied] = useState(false)

  const content = format === 'css' ? exportCSS(colors)
    : format === 'scss' ? exportSCSS(colors)
    : exportFigma(colors)

  const copy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const ext = FORMATS.find(f => f.id === format)!.ext
    downloadText(content, `chroma-palette.${ext}`)
  }

  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-2)' }}>
        Export
      </h3>
      <p className="text-[11px] font-mono mb-4" style={{ color: 'var(--text-3)' }}>
        ready to paste into your project
      </p>

      {/* Format tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-3" style={{ backgroundColor: 'var(--surface2)' }}>
        {FORMATS.map(f => (
          <button
            key={f.id}
            onClick={() => setFormat(f.id)}
            className="flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150"
            style={format === f.id
              ? { backgroundColor: 'var(--surface)', color: 'var(--text-1)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
              : { color: 'var(--text-3)' }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Code block — always dark regardless of theme */}
      <div className="relative rounded-xl overflow-hidden">
        <pre className="bg-[#0C0C0C] text-[#D4D4D4] p-4 text-[11px] font-mono leading-relaxed max-h-52 overflow-y-auto overflow-x-auto">
          {content}
        </pre>
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={copy}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-mono text-white transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            onClick={download}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[11px] font-mono text-white transition-colors"
          >
            ↓ Download
          </button>
        </div>
      </div>
    </div>
  )
}
