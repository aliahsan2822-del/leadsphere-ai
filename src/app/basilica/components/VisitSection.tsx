'use client';

const infos = [
  {
    label: 'Location',
    value: 'Yamoussoukro, Côte d\'Ivoire',
    note: '240 km north of Abidjan via the A3 highway',
    icon: (
      <svg className="bsl-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Opening Hours',
    value: 'Daily 08:00 – 18:00',
    note: 'Mass times: Mon–Sat 07:30 · Sunday 09:00 & 11:00',
    icon: (
      <svg className="bsl-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: 'Admission',
    value: 'Free Entry',
    note: 'Guided tours available · Dress code: modest attire required',
    icon: (
      <svg className="bsl-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <circle cx="12" cy="11" r="1" />
      </svg>
    ),
  },
  {
    label: 'Getting There',
    value: 'By Air, Road or Coach',
    note: 'Yamoussoukro Airport (ASK) · Bus from Abidjan: ~3 hrs',
    icon: (
      <svg className="bsl-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08" />
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: 'Best Time to Visit',
    value: 'November – March',
    note: 'Dry season · Lower humidity · Clear skies for photography',
    icon: (
      <svg className="bsl-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
];

export default function VisitSection() {
  return (
    <section id="visit" style={{ background: 'var(--dark-surface)', borderTop: '1px solid var(--dark-border)' }}>
      <div className="bsl-section">
        <div className="bsl-visit-wrap">
          <div>
            <p className="bsl-section-eyebrow">Plan Your Pilgrimage</p>
            <h2 className="bsl-section-title">
              Come &amp; <em>Experience</em><br />the Sacred
            </h2>
            <div className="bsl-divider" />
            <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Whether you come as a pilgrim, an architecture enthusiast, or a curious traveller,
              the Basilica of Our Lady of Peace will leave an indelible mark on your soul.
              Plan ahead for the best experience.
            </p>
            <div className="bsl-visit-info">
              {infos.map(info => (
                <div key={info.label} className="bsl-info-card">
                  {info.icon}
                  <div>
                    <div className="bsl-info-label">{info.label}</div>
                    <div className="bsl-info-value">{info.value}</div>
                    <div className="bsl-info-note">{info.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder with animated grid */}
          <div className="bsl-visit-map">
            <div className="bsl-map-grid" />
            <div className="bsl-map-bg" />
            <MapIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function MapIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Continent of Africa simplified */}
        <path
          d="M180,20 L210,18 L230,30 L240,55 L235,80 L245,100 L250,130 L245,160 L235,185 L220,210 L200,230 L185,240 L170,225 L155,205 L148,180 L150,155 L145,130 L148,105 L155,80 L158,55 L165,30 Z"
          fill="rgba(212,168,67,0.08)"
          stroke="rgba(212,168,67,0.25)"
          strokeWidth="1.5"
        />

        {/* Ivory Coast highlight */}
        <path
          d="M165,110 L175,105 L190,108 L200,115 L202,130 L195,140 L180,145 L168,138 L162,125 Z"
          fill="rgba(212,168,67,0.2)"
          stroke="rgba(212,168,67,0.5)"
          strokeWidth="1"
        />

        {/* Yamoussoukro location pin */}
        <circle cx="183" cy="125" r="8" fill="rgba(212,168,67,0.2)" />
        <circle cx="183" cy="125" r="4" fill="#D4A843" />
        <circle cx="183" cy="125" r="12"
          fill="none"
          stroke="#D4A843"
          strokeWidth="1"
          strokeDasharray="3 3"
          style={{ animation: 'bslPing 2s ease-out infinite' }}
        />
        <circle cx="183" cy="125" r="20"
          fill="none"
          stroke="#D4A843"
          strokeWidth="0.5"
          opacity="0.4"
          style={{ animation: 'bslPing 2s ease-out 0.5s infinite' }}
        />

        {/* Label */}
        <text x="195" y="120" fill="#D4A843" fontSize="8" fontFamily="'Playfair Display', serif">
          Yamoussoukro
        </text>
        <text x="195" y="130" fill="rgba(212,168,67,0.6)" fontSize="6" fontFamily="sans-serif">
          Basilica · 6.8160°N
        </text>

        {/* Compass rose */}
        <g transform="translate(350, 40)">
          <circle cx="0" cy="0" r="18" fill="rgba(15,17,28,0.8)" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
          <path d="M0,-14 L3,-4 L0,-7 L-3,-4 Z" fill="#D4A843" />
          <path d="M0,14 L3,4 L0,7 L-3,4 Z" fill="rgba(212,168,67,0.4)" />
          <path d="M14,0 L4,3 L7,0 L4,-3 Z" fill="rgba(212,168,67,0.4)" />
          <path d="M-14,0 L-4,3 L-7,0 L-4,-3 Z" fill="rgba(212,168,67,0.4)" />
          <text x="-2" y="-16" fill="#D4A843" fontSize="5" fontFamily="sans-serif">N</text>
        </g>

        {/* Scale bar */}
        <line x1="20" y1="270" x2="80" y2="270" stroke="rgba(212,168,67,0.5)" strokeWidth="2" />
        <line x1="20" y1="265" x2="20" y2="275" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5" />
        <line x1="80" y1="265" x2="80" y2="275" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5" />
        <text x="40" y="285" fill="rgba(212,168,67,0.6)" fontSize="7" fontFamily="sans-serif">500 km</text>
      </svg>

      <style>{`
        @keyframes bslPing {
          0% { opacity: 0.8; r: 12px; }
          100% { opacity: 0; r: 28px; }
        }
      `}</style>
    </div>
  );
}
