import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import type { Palette } from '../types'

interface Props {
  onImageLoad: (img: HTMLImageElement, url: string) => void
  existingPalette: Palette | null
  onResumePalette: () => void
}

// Example palettes used in step visuals
const SUNSET   = ['#FF6B35', '#F7461A', '#C1224F', '#6B21A8', '#1E1B4B']
const OCEAN    = ['#0077B6', '#00B4D8', '#48CAE4', '#90E0EF', '#ADE8F4']
const FOREST   = ['#1B4332', '#2D6A4F', '#52B788', '#95D5B2', '#D8F3DC']
const EXAMPLE_CSS = `:root {\n  --color-1: #FF6B35;\n  --color-2: #F7461A;\n  --color-3: #C1224F;\n}`

function Swatch({ hex, large }: { hex: string; large?: boolean }) {
  return (
    <div
      className={`rounded-xl ring-1 ring-black/10 ${large ? 'h-10 flex-1' : 'h-8 flex-1'}`}
      style={{ backgroundColor: hex }}
    />
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Drop any photo',
    desc: 'A sunset, mural, coffee cup, nature shot — anything with colors worth capturing.',
    visual: (
      <div className="flex gap-2 items-end">
        {/* Faux photo thumbnails */}
        <div className="flex-1 h-14 rounded-xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, #FF9A3C 0%, #FF6B35 40%, #9B2335 80%, #3B1FCC 100%)'
        }} />
        <div className="flex-1 h-10 rounded-xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, #0077B6 0%, #48CAE4 60%, #ADE8F4 100%)'
        }} />
        <div className="flex-1 h-8 rounded-xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, #1B4332 0%, #52B788 60%, #D8F3DC 100%)'
        }} />
      </div>
    ),
  },
  {
    num: '02',
    title: 'Colors extracted instantly',
    desc: 'K-means clustering finds the dominant palette in your browser. No uploads.',
    visual: (
      <div className="flex flex-col gap-2">
        <div className="flex gap-1.5">
          {SUNSET.map(c => <Swatch key={c} hex={c} />)}
        </div>
        <div className="flex gap-1.5">
          {OCEAN.map(c => <Swatch key={c} hex={c} />)}
        </div>
        <div className="flex gap-1.5">
          {FOREST.map(c => <Swatch key={c} hex={c} />)}
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Use it in your design',
    desc: 'Copy HEX / RGB / HSL. Check WCAG contrast. Export to CSS, SCSS or Figma JSON.',
    visual: (
      <div className="flex gap-2">
        <div className="flex-1 rounded-xl overflow-hidden bg-[#0C0C0C] p-3">
          <pre className="text-[10px] font-mono text-[#7EE787] leading-relaxed">{EXAMPLE_CSS}</pre>
        </div>
        <div className="flex flex-col gap-1 w-14">
          {SUNSET.slice(0, 4).map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg px-1.5 py-1" style={{ backgroundColor: c }}>
              <span className="text-[8px] font-mono text-white/80 truncate">{c}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export function ImageDropzone({ onImageLoad, existingPalette, onResumePalette }: Props) {
  const onDrop = useCallback((files: File[]) => {
    const file = files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => onImageLoad(img, url)
    img.src = url
  }, [onImageLoad])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  return (
    <div className="flex items-center justify-center min-h-screen px-6 pt-16 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl"
      >
        <p className="text-[11px] font-mono uppercase tracking-widest mb-8 text-center" style={{ color: 'var(--text-3)' }}>
          Palette Extraction
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

          {/* ── Left: Drop zone ── */}
          <div className="flex flex-col gap-4">
            <div
              {...getRootProps()}
              className="relative rounded-3xl cursor-pointer transition-all duration-300 select-none border-2 border-dashed flex flex-col items-center justify-center py-16 px-8 gap-5 flex-1"
              style={{
                borderColor: isDragActive ? 'var(--accent)' : 'var(--border2)',
                backgroundColor: 'var(--surface)',
                transform: isDragActive ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <input {...getInputProps()} />

              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: 'var(--accent)' }} />
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ background: isDragActive ? 'var(--accent)' : 'var(--surface2)' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={isDragActive ? '#fff' : 'var(--text-3)'}
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    {isDragActive ? (
                      <path d="M4 16l4-4 4 4 4-8 4 8" />
                    ) : (
                      <>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </>
                    )}
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[16px] font-semibold leading-snug" style={{ color: 'var(--text-1)' }}>
                  {isDragActive ? 'Drop your photo' : 'Upload a photo'}
                </p>
                <p className="text-[12px] mt-1.5" style={{ color: 'var(--text-3)' }}>
                  drag & drop or click to select
                </p>
                <p className="text-[11px] font-mono mt-1" style={{ color: 'var(--text-3)' }}>
                  PNG · JPG · WEBP · GIF
                </p>
              </div>

              {/* Corner markers on drag */}
              {[
                { pos: 'top-3 left-3', tr: { borderTopStyle: 'solid' as const, borderLeftStyle: 'solid' as const, borderRadius: '6px 0 0 0' } },
                { pos: 'top-3 right-3', tr: { borderTopStyle: 'solid' as const, borderRightStyle: 'solid' as const, borderRadius: '0 6px 0 0' } },
                { pos: 'bottom-3 left-3', tr: { borderBottomStyle: 'solid' as const, borderLeftStyle: 'solid' as const, borderRadius: '0 0 0 6px' } },
                { pos: 'bottom-3 right-3', tr: { borderBottomStyle: 'solid' as const, borderRightStyle: 'solid' as const, borderRadius: '0 0 6px 0' } },
              ].map(({ pos, tr }, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 transition-opacity duration-300`}
                  style={{ opacity: isDragActive ? 1 : 0, borderColor: 'var(--accent)', borderWidth: '2px', borderStyle: 'none', ...tr }}
                />
              ))}
            </div>

            {/* Resume palette banner */}
            {existingPalette && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onResumePalette}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-150 hover:scale-[1.01] text-left"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex gap-0.5 shrink-0">
                  {existingPalette.colors.slice(0, 5).map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium" style={{ color: 'var(--text-1)' }}>
                    Resume current palette
                  </p>
                  <p className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>
                    {existingPalette.colors.length} colors · tap to go back
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-3)', flexShrink: 0 }}>
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </motion.button>
            )}
          </div>

          {/* ── Right: How it works + Privacy ── */}
          <div className="flex flex-col gap-4">
            {/* Steps with visuals */}
            <div
              className="rounded-3xl p-6 border flex-1"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h2 className="text-[12px] font-semibold uppercase tracking-wider mb-5 relative" style={{ color: 'var(--text-2)' }}>
                How it works
              </h2>
              <div className="space-y-6 relative">
                {STEPS.map((step) => (
                  <div
                    key={step.num}
                  >
                    <div className="flex gap-3 mb-2.5">
                      <span className="text-[11px] font-mono font-semibold pt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                        {step.num}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold leading-snug" style={{ color: 'var(--text-1)' }}>
                          {step.title}
                        </p>
                        <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    {/* Visual */}
                    <div className="ml-7">
                      {step.visual}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy badge */}
            <div
              className="rounded-2xl px-5 py-4 border flex items-start gap-3"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: 'var(--surface2)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--text-1)' }}>
                  Private by design
                </p>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Photos are processed entirely in your browser via the Canvas API.
                  Nothing is uploaded, stored, or sent to any server. Ever.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
