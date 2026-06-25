'use client';

export default function Footer() {
  return (
    <footer className="bsl-footer">
      {/* Decorative cross */}
      <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ margin: '0 auto 1.5rem', display: 'block', opacity: 0.6 }}>
        <rect x="12" y="0" width="4" height="40" rx="2" fill="#D4A843" />
        <rect x="0" y="12" width="28" height="4" rx="2" fill="#D4A843" />
      </svg>

      <div className="bsl-footer-logo">Basilica of Our Lady of Peace</div>
      <div className="bsl-footer-tagline">Yamoussoukro · Côte d'Ivoire · Est. 1985</div>

      <nav className="bsl-footer-links">
        {['History', 'Architecture', 'Gallery', 'Visit', 'Contact'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {link}
          </a>
        ))}
      </nav>

      <div style={{ width: '3rem', height: '1px', background: 'var(--dark-border)', margin: '0 auto 1.5rem' }} />

      <p className="bsl-footer-copy">
        © {new Date().getFullYear()} Basilica of Our Lady of Peace, Yamoussoukro.
        The largest church on Earth by area.
      </p>
    </footer>
  );
}
