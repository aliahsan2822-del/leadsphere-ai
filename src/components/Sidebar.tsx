'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe, LayoutDashboard, Users, Brain, Send, BarChart3,
  Settings, Zap, Bell, Search, Star, TrendingUp, Target,
  FileText, Kanban, Shield, Plug, ChevronRight
} from 'lucide-react'

const NAV_GROUPS = [
  {
    label: 'PLATFORM',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Executive Dashboard', badge: null },
      { href: '/leads', icon: Users, label: 'Lead Intelligence', badge: '4,872' },
      { href: '/intelligence', icon: Brain, label: 'AI Intelligence', badge: null },
      { href: '/outreach', icon: Send, label: 'Outreach Center', badge: '12' },
    ],
  },
  {
    label: 'DISCOVERY',
    items: [
      { href: '/globe', icon: Globe, label: 'Global Map', badge: null },
      { href: '/competitors', icon: Target, label: 'Competitor Intel', badge: null },
      { href: '/trends', icon: TrendingUp, label: 'Market Trends', badge: null },
    ],
  },
  {
    label: 'PIPELINE',
    items: [
      { href: '/pipeline', icon: Kanban, label: 'Opportunity Pipeline', badge: null },
      { href: '/analytics', icon: BarChart3, label: 'Analytics', badge: null },
      { href: '/saved', icon: Star, label: 'Saved Leads', badge: null },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { href: '/reports', icon: FileText, label: 'Executive Reports', badge: null },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { href: '/settings', icon: Settings, label: 'Settings & Integrations', badge: null },
    ],
  },
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
          <div className="text-xs font-bold mt-0.5" style={{ color: '#00D4FF', letterSpacing: '1px' }}>AI</div>
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

      {/* Navigation */}
      <nav className="flex-1 px-3 py-1 overflow-y-auto space-y-4">
        {NAV_GROUPS.map(({ label, items }) => (
          <div key={label}>
            <div className="text-xs font-semibold mb-1.5 px-2" style={{ color: '#4a6580', letterSpacing: '0.8px' }}>{label}</div>
            {items.map(({ href, icon: Icon, label: itemLabel, badge }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all duration-200 group ${active ? 'nav-active' : 'hover:bg-white/5'}`}
                  style={{ color: active ? '#007BFF' : '#7a9bb5' }}>
                  <Icon size={15} className={active ? 'text-[#007BFF]' : 'text-[#4a6580] group-hover:text-[#7a9bb5]'} />
                  <span className="flex-1">{itemLabel}</span>
                  {badge && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: active ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.06)', color: active ? '#007BFF' : '#4a6580', fontSize: '10px' }}>
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* AI Status */}
      <div className="px-4 py-3 mx-3 mb-3 rounded-xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.15)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-white">AI Engine Active</span>
        </div>
        <div className="text-xs mb-2" style={{ color: '#4a6580' }}>Scanning 847 new companies</div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full shimmer" style={{ width: '68%', background: 'linear-gradient(90deg, #007BFF, #00D4FF)' }} />
        </div>
      </div>

      {/* User Footer */}
      <div className="px-4 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
            FM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">Fixels Media</div>
            <div className="text-xs truncate" style={{ color: '#4a6580' }}>Pro Plan</div>
          </div>
          <div className="flex items-center gap-1.5">
            <Bell size={14} style={{ color: '#4a6580' }} />
            <Link href="/settings"><Settings size={14} style={{ color: '#4a6580' }} /></Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
