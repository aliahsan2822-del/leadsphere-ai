'use client';

import { useState } from 'react';

const images = [
  {
    id: 1,
    caption: 'Aerial View — The Full Complex',
    unsplash: 'https://images.unsplash.com/photo-1548625361-58a9d86b734e?w=800&q=80',
    span: 'double',
  },
  {
    id: 2,
    caption: 'The Golden Dome at Dusk',
    unsplash: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&q=80',
    span: 'single',
  },
  {
    id: 3,
    caption: 'Grand Esplanade',
    unsplash: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    span: 'single',
  },
  {
    id: 4,
    caption: 'Interior Nave & Stained Glass',
    unsplash: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=600&q=80',
    span: 'single',
  },
  {
    id: 5,
    caption: 'Columns & Colonnade',
    unsplash: 'https://images.unsplash.com/photo-1485521540674-65e4d8e5a6c6?w=600&q=80',
    span: 'single',
  },
];

export default function GallerySection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className="bsl-gallery-full">
      <div className="bsl-gallery-header">
        <p className="bsl-section-eyebrow">Visual Journey</p>
        <h2 className="bsl-section-title">The <em>Basilica</em> in Images</h2>
        <div className="bsl-divider" style={{ margin: '0 auto' }} />
      </div>

      <div className="bsl-gallery-grid">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="bsl-gallery-item"
            style={i === 0 ? { gridRow: 'span 2' } : {}}
            onMouseEnter={() => setHovered(img.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Real photo or fallback gradient */}
            <GalleryImage img={img} large={i === 0} />

            {/* Overlay */}
            <div className="bsl-gallery-overlay" style={{ opacity: hovered === img.id ? 1 : 0 }}>
              <span className="bsl-gallery-caption">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GalleryImage({ img, large }: { img: typeof images[0]; large: boolean }) {
  return (
    <>
      {/* Gradient backdrop */}
      <div
        className={`bsl-gallery-img bsl-img-${img.id}`}
        style={{ minHeight: large ? '440px' : '200px' }}
      />
      {/* SVG scene overlay */}
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.7,
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <SceneForImage id={img.id} />
      </svg>
    </>
  );
}

function SceneForImage({ id }: { id: number }) {
  switch (id) {
    case 1:
      // Aerial view
      return (
        <>
          <defs>
            <radialGradient id={`sky1`} cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a2535" />
              <stop offset="100%" stopColor="#07080F" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill={`url(#sky1)`} />
          {/* Stars */}
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={Math.random() * 400} cy={Math.random() * 120} r="0.8" fill="white" opacity={0.4 + Math.random() * 0.5} />
          ))}
          {/* Moon */}
          <circle cx="340" cy="40" r="18" fill="#f0e8d0" opacity="0.9" />
          <circle cx="350" cy="35" r="15" fill="#1a2535" opacity="0.9" />
          {/* Ground */}
          <rect y="200" width="400" height="100" fill="#0a0d08" />
          {/* Basilica top-down */}
          <ellipse cx="200" cy="220" rx="80" ry="55" fill="rgba(212,168,67,0.12)" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
          <ellipse cx="200" cy="220" rx="30" ry="22" fill="rgba(212,168,67,0.3)" />
          <circle cx="200" cy="218" r="8" fill="#D4A843" />
          {/* Esplanade paths */}
          {[-1, 0, 1].map(i => (
            <line key={i} x1={200 + i * 25} y1="275" x2={200 + i * 15} y2="242" stroke="rgba(212,168,67,0.2)" strokeWidth="1" />
          ))}
          {/* Trees */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i}
              cx={100 + (i % 10) * 22}
              cy={195 + Math.floor(i / 10) * 15}
              r="5"
              fill={`rgba(20,40,15,${0.8 + Math.random() * 0.2})`}
            />
          ))}
        </>
      );

    case 2:
      // Golden dome at dusk
      return (
        <>
          <defs>
            <linearGradient id="dusk2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a0a05" />
              <stop offset="40%" stopColor="#3d1a08" />
              <stop offset="100%" stopColor="#0d0a07" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#dusk2)" />
          {/* Sun glow */}
          <circle cx="200" cy="280" r="120" fill="rgba(212,100,20,0.12)" />
          <circle cx="200" cy="280" r="60" fill="rgba(212,140,20,0.18)" />
          {/* Dome silhouette */}
          <path d="M140,200 Q140,120 200,105 Q260,120 260,200 Z" fill="#D4A843" opacity="0.9" />
          <rect x="150" y="196" width="100" height="20" fill="#D4A843" opacity="0.7" />
          {/* Cross */}
          <rect x="197" y="80" width="6" height="28" rx="3" fill="#D4A843" />
          <rect x="186" y="90" width="28" height="5" rx="2" fill="#D4A843" />
          {/* Glow ring */}
          <ellipse cx="200" cy="200" rx="65" ry="8" fill="rgba(212,168,67,0.3)" />
          {/* Body */}
          <rect x="110" y="220" width="180" height="80" fill="#1a1206" opacity="0.95" />
        </>
      );

    case 3:
      // Grand Esplanade
      return (
        <>
          <defs>
            <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0f1a" />
              <stop offset="100%" stopColor="#15202e" />
            </linearGradient>
            <linearGradient id="floor3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1812" />
              <stop offset="100%" stopColor="#0d0c08" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#sky3)" />
          <rect y="160" width="400" height="140" fill="url(#floor3)" />
          {/* Perspective lines */}
          {[-3, -2, -1, 0, 1, 2, 3].map(i => (
            <line key={i}
              x1={200 + i * 60} y1="160"
              x2={200 + i * 10} y2="300"
              stroke="rgba(212,168,67,0.1)" strokeWidth="1"
            />
          ))}
          {/* Basilica facade in distance */}
          <rect x="140" y="80" width="120" height="90" fill="#1e1a10" />
          <path d="M150,80 Q200,30 250,80 Z" fill="rgba(212,168,67,0.6)" />
          <circle cx="200" cy="55" r="20" fill="rgba(212,168,67,0.5)" />
          {/* Lampposts */}
          {[80, 160, 240, 320].map(x => (
            <g key={x}>
              <line x1={x} y1="160" x2={x} y2="230" stroke="rgba(212,168,67,0.4)" strokeWidth="2" />
              <circle cx={x} cy="157" r="4" fill="#D4A843" opacity="0.8" />
              <circle cx={x} cy="157" r="12" fill="rgba(212,168,67,0.1)" />
            </g>
          ))}
        </>
      );

    case 4:
      // Interior stained glass
      return (
        <>
          <defs>
            <radialGradient id="interior4" cx="50%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#2a1a05" />
              <stop offset="100%" stopColor="#070507" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#interior4)" />
          {/* Vaulted ceiling lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <path key={i}
              d={`M${i * 100},300 Q${i * 100 + 50},50 ${i * 100 + 100},300`}
              stroke="rgba(212,168,67,0.2)" strokeWidth="1" fill="none"
            />
          ))}
          {/* Stained glass windows */}
          {[60, 160, 260, 360].map((x, i) => (
            <g key={i}>
              <rect x={x - 20} y="30" width="40" height="100" rx="20 20 0 0"
                fill={`rgba(${[200 + i * 10, 120, 50 + i * 20]},0.25)`}
              />
              <rect x={x - 20} y="30" width="40" height="100" rx="20 20 0 0"
                fill="none" stroke="rgba(212,168,67,0.4)" strokeWidth="1"
              />
              {/* Cross bars */}
              <line x1={x - 20} y1="80" x2={x + 20} y2="80" stroke="rgba(212,168,67,0.4)" strokeWidth="1" />
              <line x1={x} y1="30" x2={x} y2="130" stroke="rgba(212,168,67,0.4)" strokeWidth="1" />
            </g>
          ))}
          {/* Altar glow */}
          <ellipse cx="200" cy="280" rx="100" ry="20" fill="rgba(212,168,67,0.15)" />
          <rect x="175" y="240" width="50" height="40" fill="rgba(30,24,10,0.9)" />
          <circle cx="200" cy="235" r="5" fill="#D4A843" />
        </>
      );

    case 5:
      // Columns
      return (
        <>
          <defs>
            <linearGradient id="col5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d0e15" />
              <stop offset="100%" stopColor="#07080d" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#col5)" />
          {/* Colonnade perspective */}
          {[0, 1, 2, 3, 4].map(i => {
            const x = 40 + i * 80;
            const scale = 1 - i * 0.12;
            const w = 28 * scale;
            const h = 240 * scale;
            return (
              <g key={i}>
                {/* Column shaft */}
                <rect x={x - w / 2} y={300 - h} width={w} height={h}
                  fill={`rgba(245,240,232,${0.15 - i * 0.02})`}
                  rx="4"
                />
                {/* Capital */}
                <rect x={x - w / 2 - 4} y={300 - h - 10} width={w + 8} height="12"
                  fill={`rgba(212,168,67,${0.5 - i * 0.06})`}
                  rx="2"
                />
                {/* Base */}
                <rect x={x - w / 2 - 4} y="292" width={w + 8} height="8"
                  fill={`rgba(212,168,67,${0.3 - i * 0.04})`}
                />
                {/* Fluting lines */}
                {[0, 1, 2].map(j => (
                  <line key={j}
                    x1={x - w / 2 + (j + 1) * w / 4} y1={300 - h + 10}
                    x2={x - w / 2 + (j + 1) * w / 4} y2={290}
                    stroke={`rgba(212,168,67,${0.12 - i * 0.01})`} strokeWidth="1"
                  />
                ))}
              </g>
            );
          })}
          {/* Floor reflection */}
          <rect y="280" width="400" height="20" fill="rgba(212,168,67,0.04)" />
        </>
      );

    default:
      return null;
  }
}
