'use client';

const features = [
  {
    title: 'The Great Dome',
    text: '158 metres high — the tallest dome in the world at completion. Clad in travertine marble. The interior soars 60 metres above the nave floor, inspiring awe in every visitor.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C7.03 2 3 6.03 3 11v1h18v-1c0-4.97-4.03-9-9-9z" />
        <rect x="2" y="12" width="20" height="2" rx="1" />
        <rect x="10" y="14" width="4" height="8" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Stained Glass',
    text: '7,400 m² of stained glass panels imported from France, designed by master glazier Gabriel Loire. Each panel narrates a biblical story in 36 colours of handblown glass.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="7 7 2 2" />
        <line x1="5" y1="12" x2="19" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    ),
  },
  {
    title: 'Marble & Stone',
    text: 'Italian Carrara marble covers every floor, pillar and surface. Over 200,000 tonnes of imported stone were used in construction, giving the interior an ethereal luminosity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,20 2,20" />
        <line x1="12" y1="2" x2="12" y2="20" />
        <line x1="7" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    title: 'Colonnaded Esplanade',
    text: 'A vast open esplanade of 322,000 m² encircles the basilica, flanked by a 128-column curved colonnade echoing Bernini\'s colonnade at St. Peter\'s Square in Rome.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="3" x2="4" y2="19" />
        <line x1="9" y1="3" x2="9" y2="19" />
        <line x1="14" y1="3" x2="14" y2="19" />
        <line x1="19" y1="3" x2="19" y2="19" />
        <line x1="2" y1="19" x2="22" y2="19" />
        <line x1="2" y1="5" x2="22" y2="5" />
      </svg>
    ),
  },
  {
    title: 'Air Conditioning',
    text: 'One of the most sophisticated climate control systems in Africa. The entire 30,000-seat interior is maintained at a constant 22°C, a feat of engineering in equatorial West Africa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18" />
        <path d="M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: 'Four Bell Towers',
    text: 'Four symmetrical bell towers stand sentinel at each corner of the main building, reaching 90 metres. Each contains a set of bronze bells cast in France, rung for liturgical ceremonies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 19V8a6 6 0 0 1 12 0v11" />
        <path d="M3 19h18" />
        <path d="M10 22a2 2 0 0 0 4 0" />
      </svg>
    ),
  },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" style={{ background: 'var(--dark-bg)' }}>
      <div className="bsl-section">
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <p className="bsl-section-eyebrow">Architectural Marvel</p>
          <h2 className="bsl-section-title">
            Six Wonders of <em>Design & Engineering</em>
          </h2>
          <div className="bsl-divider" style={{ margin: '0 auto' }} />
        </div>

        <div className="bsl-arch-grid">
          {features.map((f, i) => (
            <div key={f.title} className="bsl-arch-card">
              <div className="bsl-arch-card-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="bsl-arch-icon">{f.icon}</div>
              <h3 className="bsl-arch-card-title">{f.title}</h3>
              <p className="bsl-arch-card-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
