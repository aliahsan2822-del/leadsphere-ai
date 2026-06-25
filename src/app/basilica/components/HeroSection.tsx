'use client';

import { useEffect, useRef, ComponentType } from 'react';

interface Props {
  DomeScene: ComponentType;
}

export default function HeroSection({ DomeScene }: Props) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'bsl-particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${8 + Math.random() * 14}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${0.2 + Math.random() * 0.5};
      `;
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach(p => p.remove());
  }, []);

  return (
    <section className="bsl-hero" id="home">
      {/* 3D Canvas fills the left/background */}
      <div className="bsl-hero-canvas">
        <DomeScene />
      </div>

      {/* Floating particles */}
      <div className="bsl-particles" ref={particlesRef} />

      {/* Dark overlay */}
      <div className="bsl-hero-overlay" />

      {/* Content */}
      <div className="bsl-hero-content">
        <div className="bsl-hero-eyebrow">Yamoussoukro · Côte d&apos;Ivoire</div>

        <h1 className="bsl-hero-title">
          Basilica of<br />
          <em>Our Lady of Peace</em>
        </h1>

        <p className="bsl-hero-subtitle">The Largest Church on Earth</p>

        <p className="bsl-hero-desc">
          Rising 158 metres above the savanna, consecrated by Pope John Paul II in 1990,
          this monumental basilica is Africa&apos;s greatest architectural testament to faith —
          surpassing St. Peter&apos;s Basilica in Rome in total area.
        </p>

        <div className="bsl-hero-actions">
          <button className="bsl-btn-primary" onClick={() => document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' })}>
            Plan Your Visit
          </button>
          <button className="bsl-btn-secondary" onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}>
            Discover the Story
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="bsl-scroll-hint">
        <span>Scroll</span>
        <div className="bsl-scroll-arrow" />
      </div>
    </section>
  );
}
