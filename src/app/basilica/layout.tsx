import './basilica.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basilica of Our Lady of Peace — Yamoussoukro',
  description: 'The largest church on Earth. A monument of faith, architecture, and African heritage in Yamoussoukro, Côte d\'Ivoire.',
};

export default function BasilicaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
