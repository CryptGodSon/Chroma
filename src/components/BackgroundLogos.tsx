// Scattered background logos of design apps — purely decorative, low opacity

interface Logo {
  id: string
  src: string
  top: string
  left: string
  rotate: number
  size: number
}

const LOGOS: Logo[] = [
  // ── Adobe Creative Cloud ─────────────────────────────────────────
  { id: 'ps',  src: '/icons/photoshop.svg',    top: '6%',  left: '3%',  rotate: -8,  size: 52 },
  { id: 'ai',  src: '/icons/illustrator.svg',  top: '13%', left: '81%', rotate: 6,   size: 50 },
  { id: 'id',  src: '/icons/indesign.svg',     top: '70%', left: '89%', rotate: -7,  size: 48 },
  { id: 'xd',  src: '/icons/xd.svg',           top: '37%', left: '1%',  rotate: 9,   size: 50 },
  { id: 'ae',  src: '/icons/aftereffects.svg', top: '79%', left: '64%', rotate: -5,  size: 48 },
  { id: 'pr',  src: '/icons/premiere.svg',     top: '21%', left: '48%', rotate: 7,   size: 48 },
  { id: 'lr',  src: '/icons/lightroom.svg',    top: '53%', left: '77%', rotate: -4,  size: 46 },
  { id: 'an',  src: '/icons/animate.svg',      top: '86%', left: '9%',  rotate: 5,   size: 44 },
  { id: 'au',  src: '/icons/audition.svg',     top: '44%', left: '57%', rotate: -6,  size: 44 },

  // ── Other design tools ───────────────────────────────────────────
  { id: 'figma',  src: '/icons/figma.svg',            top: '10%', left: '40%', rotate: 4,   size: 44 },
  { id: 'sketch', src: '/icons/sketch.svg',           top: '60%', left: '4%',  rotate: 8,   size: 48 },
  { id: 'canva',  src: '/icons/canva.svg',            top: '27%', left: '8%',  rotate: -6,  size: 52 },
  { id: 'aff-d',  src: '/icons/affinity-designer.svg',top: '88%', left: '37%',rotate: -5,  size: 46 },
  { id: 'aff-p',  src: '/icons/affinity-photo.svg',   top: '7%',  left: '58%', rotate: 4,   size: 46 },
  { id: 'aff-u',  src: '/icons/affinity-publisher.svg',top:'64%', left: '47%', rotate: 6,   size: 44 },
  { id: 'gimp',   src: '/icons/gimp.svg',             top: '75%', left: '20%', rotate: -7,  size: 46 },
  { id: 'ink',    src: '/icons/inkscape.svg',          top: '33%', left: '68%', rotate: 6,   size: 46 },
  { id: 'blend',  src: '/icons/blender.svg',           top: '90%', left: '72%', rotate: -4,  size: 48 },
  { id: 'krita',  src: '/icons/krita.svg',             top: '48%', left: '91%', rotate: 5,   size: 44 },
  { id: 'proc',   src: '/icons/procreate.svg',         top: '17%', left: '22%', rotate: -3,  size: 44 },
]

export function BackgroundLogos() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {LOGOS.map(({ id, src, top, left, rotate, size }) => (
        <img
          key={id}
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: 'absolute',
            top,
            left,
            width: size,
            height: size,
            opacity: 0.12,
            transform: `rotate(${rotate}deg)`,
            borderRadius: 12,
          }}
        />
      ))}
    </div>
  )
}
