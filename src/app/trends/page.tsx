'use client'

import Sidebar from '@/components/Sidebar'
import { TrendingUp, Globe, Zap } from 'lucide-react'
import { INDUSTRY_DATA } from '@/lib/mockData'

const TRENDS = [
  { market: 'Healthcare Tech', growth: '+34%', region: 'North America', signal: 'Digital health adoption accelerating', color: '#007BFF' },
  { market: 'E-Commerce SMB', growth: '+28%', region: 'Southeast Asia', signal: 'Mobile commerce demand surging', color: '#6C63FF' },
  { market: 'Logistics SaaS', growth: '+22%', region: 'Middle East', signal: 'Supply chain digitization underway', color: '#00D4A1' },
  { market: 'EdTech Enterprise', growth: '+19%', region: 'Global', signal: 'L&D investment post-pandemic', color: '#FFA502' },
  { market: 'Hospitality Tech', growth: '+31%', region: 'Europe', signal: 'Post-travel boom digital upgrades', color: '#FF6B9D' },
  { market: 'FinTech B2B', growth: '+25%', region: 'APAC', signal: 'Digital payments infrastructure', color: '#00D4FF' },
]

export default function TrendsPage() {
  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-1">Market Trends</h1>
          <p className="text-xs" style={{ color: '#4a6580' }}>AI-powered market intelligence and growth signals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TRENDS.map((trend, i) => (
            <div key={i} className="p-5 rounded-2xl transition-all hover:translate-y-[-2px]" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-sm">{trend.market}</span>
                <span className="text-sm font-black text-green-400">{trend.growth}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: '#4a6580' }}>
                <Globe size={11} style={{ color: trend.color }} />
                {trend.region}
              </div>
              <div className="flex items-start gap-2 text-xs" style={{ color: '#7a9bb5' }}>
                <Zap size={11} className="mt-0.5 flex-shrink-0" style={{ color: trend.color }} />
                {trend.signal}
              </div>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${parseInt(trend.growth) * 2}%`, background: trend.color }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
