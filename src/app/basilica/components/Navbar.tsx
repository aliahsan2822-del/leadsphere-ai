'use client';
import { useEffect, useState } from 'react';

const links = ['History', 'Architecture', 'Gallery', 'Visit'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bsl-nav" style={{ boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none' }}>
      <div className="bsl-nav-logo">Basilica · Yamoussoukro</div>
      <ul className="bsl-nav-links">
        {links.map(l => (
          <li key={l}>
            <a onClick={() => scrollTo(l)} href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>
      <button className="bsl-nav-cta" onClick={() => scrollTo('visit')}>Plan Your Visit</button>
    </nav>
  );
}
