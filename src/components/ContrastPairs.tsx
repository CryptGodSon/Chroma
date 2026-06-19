import type { Color } from '../types'
import { getContrastResult } from '../utils/colorUtils'

interface Props {
  colors: Color[]
}

function Badge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
      pass ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-400'
    }`}>
      {label}
    </span>
  )
}

export function ContrastPairs({ colors }: Props) {
  const pairs: Array<{ c1: Color; c2: Color; i: number; j: number }> = []
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      pairs.push({ c1: colors[i], c2: colors[j], i, j })
    }
  }
  pairs.sort((a, b) =>
    getContrastResult(b.c1, b.c2).ratio - getContrastResult(a.c1, a.c2).ratio
  )

  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-2)' }}>
        WCAG 2.1 Contrast
      </h3>
      <p className="text-[11px] font-mono mb-4" style={{ color: 'var(--text-3)' }}>
        AA ≥ 4.5 · AA Large ≥ 3.0 · AAA ≥ 7.0
      </p>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {pairs.map(({ c1, c2, i, j }) => {
          const r = getContrastResult(c1, c2)
          return (
            <div
              key={`${i}-${j}`}
              className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
              style={{ backgroundColor: 'var(--surface2)' }}
            >
              {/* Text preview */}
              <div className="relative w-10 h-6 rounded-lg overflow-hidden shrink-0 ring-1 ring-black/5">
                <div className="absolute inset-0" style={{ backgroundColor: c2.hex }} />
                <div
                  className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold"
                  style={{ color: c1.hex }}
                >
                  Aa
                </div>
              </div>

              {/* Swatches */}
              <div className="flex gap-1 shrink-0">
                <div className="w-4 h-4 rounded ring-1 ring-black/10" style={{ backgroundColor: c1.hex }} />
                <div className="w-4 h-4 rounded ring-1 ring-black/10" style={{ backgroundColor: c2.hex }} />
              </div>

              {/* Ratio */}
              <span className="font-mono text-[12px] font-medium tabular-nums" style={{ color: 'var(--text-1)' }}>
                {r.ratio.toFixed(2)}:1
              </span>

              {/* Badges */}
              <div className="flex gap-1 ml-auto">
                <Badge label="AA" pass={r.aa} />
                <Badge label="AAA" pass={r.aaa} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
