'use client'

import dynamic from 'next/dynamic'
import { Globe, TrendingUp, Users } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { GLOBE_OPPORTUNITIES } from '@/lib/mockData'

const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
  </div>
)})

export default function GlobePage() {
  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h1 className="text-xl font-bold text-white">Global Opportunity Map</h1>
            <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Interactive 3D globe • 180+ countries • Real-time opportunity data</p>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4FF]" />Tech Hub</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" />Finance</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />High Demand</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1" style={{ minHeight: 0 }}>
            <Globe3D />
          </div>

          <div className="w-72 overflow-y-auto p-4 space-y-3" style={{ background: 'rgba(5,13,26,0.95)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 className="font-bold text-white text-sm px-1">Top Markets</h3>
            {GLOBE_OPPORTUNITIES.sort((a, b) => b.count - a.count).map((opp, i) => (
              <div key={opp.city} className="p-3 rounded-xl transition-all hover:bg-white/5 cursor-pointer" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-semibold text-white text-sm">{opp.city}</div>
                  <div className="text-xs font-bold" style={{ color: opp.color }}>{opp.count}</div>
                </div>
                <div className="text-xs mb-2" style={{ color: '#4a6580' }}>{opp.country} • {opp.marketSize}</div>
                <div className="flex flex-wrap gap-1">
                  {opp.industries.slice(0, 2).map(ind => (
                    <span key={ind} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,123,255,0.08)', color: '#007BFF' }}>{ind}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
