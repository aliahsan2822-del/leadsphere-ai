'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe, LayoutDashboard, Users, Brain, Send,
  BarChart3, Settings, Zap, ChevronRight, Bell,
  Search, Star, TrendingUp
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Executive Dashboard', badge: null },
  { href: '/leads', icon: Users, label: 'Lead Intelligence', badge: '4,872' },
  { href: '/intelligence', icon: Brain, label: 'AI Intelligence', badge: null },
  { href: '/outreach', icon: Send, label: 'Outreach Center', badge: '12' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics', badge: null },
  { href: '/globe', icon: Globe, label: 'Global Map', badge: null },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 h-screen sticky top-0 flex-shrink-0" style={{ background: 'rgba(5,13,26,0.98)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative w-9 h-9 flex-shrink-0">
          <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
            <Globe size={18} className="text-white" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#050d1a]" />
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-none">LeadSphere</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: '#00D4FF', letterSpacing: '1px' }}>AI</div>
        </div>
        <div className="ml-auto">
          <Zap size={14} style={{ color: '#00D4FF' }} />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Search size={13} style={{ color: '#4a6580' }} />
          <span className="text-xs" style={{ color: '#4a6580' }}>Quick search...</span>
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: '#4a6580' }}>⌘K</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto">
        <div className="text-xs font-semibold mb-2 px-2" style={{ color: '#4a6580', letterSpacing: '0.8px' }}>PLATFORM</div>
        {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all duration-200 group ${active ? 'nav-active' : 'hover:bg-white/5'}`}
              style={{ color: active ? '#007BFF' : '#7a9bb5' }}
            >
              <Icon size={16} className={active ? 'text-[#007BFF]' : 'text-[#4a6580] group-hover:text-[#7a9bb5]'} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: active ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.06)', color: active ? '#007BFF' : '#4a6580', fontSize: '10px' }}>
                  {badge}
                </span>
              )}
              {active && <div className="w-1 h-1 rounded-full bg-[#007BFF]" />}
            </Link>
          )
        })}

        <div className="text-xs font-semibold mb-2 mt-4 px-2" style={{ color: '#4a6580', letterSpacing: '0.8px' }}>INSIGHTS</div>
        {[
          { href: '/trends', icon: TrendingUp, label: 'Market Trends' },
          { href: '/saved', icon: Star, label: 'Saved Leads' },
        ].map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium hover:bg-white/5 transition-all duration-200 group"
            style={{ color: '#7a9bb5' }}
          >
            <Icon size={16} className="text-[#4a6580] group-hover:text-[#7a9bb5]" />
            {label}
          </Link>
        ))}
      </nav>

      {/* AI Status */}
      <div className="px-4 py-3 mx-3 mb-3 rounded-xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.15)' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-white">AI Engine Active</span>
        </div>
        <div className="text-xs" style={{ color: '#4a6580' }}>Scanning 847 new companies</div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full shimmer" style={{ width: '68%', background: 'linear-gradient(90deg, #007BFF, #00D4FF)' }} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
            FM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">Fixels Media</div>
            <div className="text-xs truncate" style={{ color: '#4a6580' }}>Pro Plan</div>
          </div>
          <div className="flex items-center gap-1">
            <Bell size={14} style={{ color: '#4a6580' }} />
            <Settings size={14} style={{ color: '#4a6580' }} />
          </div>
        </div>
      </div>
    </aside>
  )
}
