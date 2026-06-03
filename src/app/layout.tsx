import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadSphere AI — Business Intelligence & Opportunity Discovery',
  description: 'AI-powered platform for discovering, analyzing, and converting global business opportunities. Built for Fixels Media.',
  keywords: 'lead generation, business intelligence, AI, opportunity discovery, sales automation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: '#050d1a', minHeight: '100vh' }}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
