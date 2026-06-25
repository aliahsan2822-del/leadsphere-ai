'use client';

const timeline = [
  { year: '1985', event: 'Construction begins under the patronage of President Félix Houphouët-Boigny, who funded the basilica personally.' },
  { year: '1989', event: 'Main structure completed — a 30,000-tonne dome clad in Carrara marble rises above the Ivorian savanna.' },
  { year: '1990', event: 'Pope John Paul II consecrates the Basilica on September 10 during his apostolic journey to Côte d\'Ivoire.' },
  { year: '1993', event: 'Listed on the UNESCO World Heritage Tentative List as an exceptional example of modern religious architecture.' },
  { year: 'Today', event: 'Welcomes over 300,000 pilgrims and visitors each year. Africa\'s most visited religious monument.' },
];

export default function HistorySection() {
  return (
    <section id="history" style={{ background: 'var(--dark-bg)' }}>
      <div className="bsl-section">
        <div className="bsl-history-wrap">
          {/* Text column */}
          <div className="bsl-history-text">
            <p className="bsl-section-eyebrow">A Monument of Faith</p>
            <h2 className="bsl-section-title">Built to <em>Endure</em><br />for Centuries</h2>
            <div className="bsl-divider" />

            <p>
              At the heart of Yamoussoukro — the political capital of Côte d&apos;Ivoire —
              stands an extraordinary vision made stone and glass. The Basilica of Our Lady
              of Peace was gifted to the Roman Catholic Church by President Félix Houphouët-Boigny,
              the founding father of modern Côte d&apos;Ivoire.
            </p>
            <p>
              Designed by Lebanese architect Pierre Fakhoury, the basilica draws clear
              inspiration from St. Peter&apos;s Basilica in Rome — yet surpasses it in total
              area at 322,000 m². The complex seats 7,000 inside and can accommodate
              a further 300,000 in its vast esplanade.
            </p>
            <p>
              Its 158-metre dome — the tallest in the world at the time of completion —
              is crowned by a golden cross visible for miles across the flat savanna.
              The interior is lit by 7,400 m² of stained glass, imported from France.
            </p>

            {/* Timeline */}
            <div className="bsl-timeline">
              {timeline.map((item) => (
                <div key={item.year} className="bsl-timeline-item">
                  <div className="bsl-tl-left">
                    <div className="bsl-tl-dot" />
                    <div className="bsl-tl-line" />
                  </div>
                  <div>
                    <div className="bsl-tl-year">{item.year}</div>
                    <div className="bsl-tl-event">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D CSS Church Illustration */}
          <div className="bsl-church-3d">
            <ChurchIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChurchIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 40px rgba(212,168,67,0.15))',
        }}
      >
        {/* Glow background */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e1a10" />
            <stop offset="50%" stopColor="#2e2818" />
            <stop offset="100%" stopColor="#1a1608" />
          </linearGradient>
          <linearGradient id="domeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A6A20" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="whiteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f0e8" />
            <stop offset="100%" stopColor="#c8c0b0" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="420" rx="160" ry="14" fill="url(#glow)" />

        {/* Ground steps */}
        {[0, 1, 2].map(i => (
          <rect
            key={i}
            x={80 - i * 10} y={390 - i * 8}
            width={240 + i * 20} height={10}
            rx="1"
            fill={`rgba(245,240,232,${0.12 - i * 0.02})`}
          />
        ))}

        {/* Main nave body */}
        <rect x="110" y="285" width="180" height="110" fill="url(#wallGrad)" />
        <rect x="110" y="285" width="180" height="110"
          fill="none" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />

        {/* Entrance arch */}
        <rect x="172" y="330" width="56" height="65" rx="28 28 0 0" fill="#0d0b07" />
        <rect x="172" y="330" width="56" height="65" rx="28 28 0 0"
          fill="none" stroke="rgba(212,168,67,0.5)" strokeWidth="1" />

        {/* Side colonnades */}
        {[-1, 1].map(side => (
          [0, 1, 2, 3].map(i => (
            <g key={`col-${side}-${i}`}>
              <rect
                x={side === -1 ? 85 : 305}
                y={300 + i * 20}
                width={side === -1 ? 25 : -25}
                height="4"
                fill="rgba(245,240,232,0.15)"
              />
              <rect
                x={side === -1 ? 100 : 295}
                y={300 + i * 20}
                width="6"
                height="80"
                rx="3"
                fill="url(#whiteGrad)"
                opacity="0.25"
              />
            </g>
          ))
        ))}

        {/* Drum */}
        <rect x="150" y="255" width="100" height="35"
          rx="50 50 0 0"
          fill="url(#whiteGrad)"
          opacity="0.9"
        />
        <rect x="150" y="255" width="100" height="35"
          rx="50 50 0 0"
          fill="none" stroke="rgba(212,168,67,0.4)" strokeWidth="1"
        />

        {/* Dome hemisphere */}
        <ellipse cx="200" cy="255" rx="55" ry="10" fill="url(#domeGrad)" opacity="0.5" />
        <path
          d="M145,255 Q145,175 200,165 Q255,175 255,255 Z"
          fill="url(#domeGrad)"
        />
        {/* Dome ribs */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const angle = (i / 6) * Math.PI;
          const x = 200 + Math.cos(angle) * 55;
          return (
            <path
              key={i}
              d={`M${x},255 Q${200 + Math.cos(angle) * 30},210 200,165`}
              stroke="rgba(212,168,67,0.35)"
              strokeWidth="1"
              fill="none"
            />
          );
        })}

        {/* Lantern */}
        <rect x="190" y="148" width="20" height="22"
          rx="10 10 0 0"
          fill="url(#whiteGrad)" opacity="0.9"
        />

        {/* Cross */}
        <rect x="198" y="120" width="4" height="32" rx="2" fill="#D4A843" />
        <rect x="188" y="131" width="24" height="4" rx="2" fill="#D4A843" />

        {/* Bell towers */}
        {[
          [118, 270], [268, 270]
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 15} y={y} width="30" height="90" rx="2"
              fill="url(#whiteGrad)" opacity="0.8" />
            <path
              d={`M${x - 16},${y} L${x + 16},${y} L${x},${y - 28} Z`}
              fill="#D4A843" opacity="0.8"
            />
            {/* Tower window */}
            <rect x={x - 5} y={y + 20} width="10" height="18" rx="5 5 0 0"
              fill="rgba(212,168,67,0.3)" />
          </g>
        ))}

        {/* Windows on nave */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={128 + i * 44} y={300} width="20" height="32"
              rx="10 10 0 0"
              fill="rgba(212,168,67,0.15)"
              stroke="rgba(212,168,67,0.3)" strokeWidth="1"
            />
          </g>
        ))}

        {/* Stained glass glow */}
        <rect x="110" y="285" width="180" height="110" rx="2"
          fill="none"
          stroke="rgba(212,168,67,0.12)"
          strokeWidth="20"
          style={{ filter: 'blur(8px)' }}
        />
      </svg>

      {/* CSS animated glow ring */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',
        height: '20px',
        background: 'radial-gradient(ellipse, rgba(212,168,67,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'bslGlowPulse 3s ease-in-out infinite',
      }} />

      <style>{`
        @keyframes bslGlowPulse {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleX(1.1); }
        }
      `}</style>
    </div>
  );
}
