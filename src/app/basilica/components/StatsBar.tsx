'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: 158, suffix: 'm', label: 'Height — Tallest Dome in Africa' },
  { number: 30000, suffix: '+', label: 'Capacity — Pilgrims & Visitors' },
  { number: 1990, suffix: '', label: 'Consecrated by Pope John Paul II' },
  { number: 322, suffix: 'k m²', label: 'Total Ground Area' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="bsl-stat-number">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="bsl-stats">
      {stats.map((s) => (
        <div key={s.label} className="bsl-stat-item">
          <AnimatedNumber target={s.number} suffix={s.suffix} />
          <div className="bsl-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
