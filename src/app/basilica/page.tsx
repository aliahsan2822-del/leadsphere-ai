'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import HistorySection from './components/HistorySection';
import GallerySection from './components/GallerySection';
import ArchitectureSection from './components/ArchitectureSection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';

const DomeScene = dynamic(() => import('./components/DomeScene'), { ssr: false });

export default function BasilicaPage() {
  return (
    <main className="basilica-root">
      <Navbar />
      <HeroSection DomeScene={DomeScene} />
      <StatsBar />
      <HistorySection />
      <GallerySection />
      <ArchitectureSection />
      <VisitSection />
      <Footer />
    </main>
  );
}
