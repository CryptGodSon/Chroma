import type { Color, ThemeId } from '../types'

interface Props {
  dominantColor?: Color
  theme: ThemeId
  onThemeChange: (t: ThemeId) => void
  onLogoClick: () => void
}

const THEMES: { id: ThemeId; label: string; bg: string; ring: string }[] = [
  { id: 'light',  label: 'Light',  bg: '#F7F7F7', ring: '#D4D4D4' },
  { id: 'white',  label: 'White',  bg: '#FFFFFF', ring: '#D4D4D4' },
  { id: 'warm',   label: 'Warm',   bg: '#F5EDE0', ring: '#C8B49A' },
  { id: 'dark',   label: 'Dark',   bg: '#141414', ring: '#444444' },
  { id: 'black',  label: 'Black',  bg: '#000000', ring: '#333333' },
]

export function Header({ dominantColor, theme, onThemeChange, onLogoClick }: Props) {
  const accent = dominantColor?.hex ?? 'var(--accent)'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3.5 border-b backdrop-blur-md"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg) 88%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Left: Logo — click to go home */}
      <button
        onClick={onLogoClick}
        className="flex items-center gap-3 group"
        title="Home"
      >
        <div
          className="w-7 h-7 rounded-full transition-all duration-700 shrink-0 group-hover:scale-110"
          style={{
            background: dominantColor
              ? `conic-gradient(from 0deg, ${accent}, #EC4899, #10B981, ${accent})`
              : 'conic-gradient(from 0deg, #4F46E5, #EC4899, #10B981, #4F46E5)',
          }}
        />
        <div className="text-left">
          <span className="text-[15px] font-semibold leading-none" style={{ color: 'var(--text-1)' }}>
            Chroma
          </span>
          <p className="text-[10px] font-mono mt-0.5 leading-none" style={{ color: 'var(--text-3)' }}>
            colors from the real world
          </p>
        </div>
      </button>

      {/* Right: Theme swatcher + GitHub */}
      <div className="flex items-center gap-4">
        {/* Theme swatches */}
        <div className="flex items-center gap-1.5">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              title={t.label}
              className="relative w-5 h-5 rounded-full transition-all duration-150 hover:scale-110"
              style={{
                backgroundColor: t.bg,
                boxShadow: theme === t.id
                  ? `0 0 0 2px var(--bg), 0 0 0 3.5px var(--accent)`
                  : `0 0 0 1px ${t.ring}`,
              }}
            >
              {theme === t.id && (
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    fontSize: '8px',
                    fontWeight: 700,
                    color: t.bg === '#000000' || t.bg === '#141414' ? '#fff' : '#000',
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5" style={{ backgroundColor: 'var(--border2)' }} />

        {/* GitHub button */}
        <a
          href="https://github.com/CryptGodSon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-150 hover:scale-[1.02] group"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
          }}
        >
          <img
            src="https://github.com/CryptGodSon.png?size=32"
            alt="CryptGodSon"
            className="w-5 h-5 rounded-full ring-1 ring-black/10"
          />
          <span className="text-[12px] font-medium hidden sm:block" style={{ color: 'var(--text-1)' }}>
            CryptGodSon
          </span>
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="hidden sm:block transition-opacity opacity-40 group-hover:opacity-70"
            style={{ color: 'var(--text-2)' }}
          >
            <path d="M7 7h10v10"/><path d="M7 17L17 7"/>
          </svg>
        </a>
      </div>
    </header>
  )
}
