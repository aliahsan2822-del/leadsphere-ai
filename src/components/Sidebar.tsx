'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe, LayoutDashboard, Users, Brain, Send, BarChart3,
  Settings, Zap, Bell, Search, Star, TrendingUp, Target,
  FileText, Kanban, Megaphone, Mail, Linkedin, ChevronRight
} from 'lucide-react'

const INTEGRATIONS_STATUS = [
  { key: 'email', icon: Mail, label: 'Email', href: '/integrations', connected: true, color: '#007BFF', badge: '2.8K sent' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '/integrations', connected: false, color: '#0A66C2', badge: 'Connect' },
]

const NAV_GROUPS = [
  {
    label: 'DASHBOARD',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Executive Dashboard', badge: null },
    ],
  },
  {
    label: 'DISCOVER',
    items: [
      { href: '/leads', icon: Users, label: 'Lead Intelligence', badge: '4,872' },
      { href: '/intelligence', icon: Brain, label: 'AI Intelligence', badge: null },
      { href: '/globe', icon: Globe, label: 'Global Market Map', badge: null },
      { href: '/competitors', icon: Target, label: 'Competitor Intel', badge: null },
      { href: '/trends', icon: TrendingUp, label: 'Market Trends', badge: null },
    ],
  },
  {
    label: 'OUTREACH',
    items: [
      { href: '/outreach', icon: Send, label: 'Send Campaigns', badge: '12' },
      { href: '/campaigns', icon: Megaphone, label: 'Activity & Responses', badge: '3' },
    ],
  },
  {
    label: 'PIPELINE',
    items: [
      { href: '/pipeline', icon: Kanban, label: 'Opportunity Pipeline', badge: null },
      { href: '/saved', icon: Star, label: 'Saved Leads', badge: null },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { href: '/analytics', icon: BarChart3, label: 'Analytics', badge: null },
      { href: '/reports', icon: FileText, label: 'Performance Reports', badge: null },
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
      <nav className="flex-1 px-3 py-1 overflow-y-auto space-y-3">
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
                  {/* Issue #2 fix: label and badge in separate elements with flex-1 on label — prevents concatenation */}
                  <span className="flex-1 truncate">{itemLabel}</span>
                  {badge && (
                    <span className="nav-badge flex-shrink-0"
                      style={{ background: active ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.06)', color: active ? '#007BFF' : '#4a6580' }}>
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}

        {/* Integrations Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5 px-2">
            <span className="text-xs font-semibold" style={{ color: '#4a6580', letterSpacing: '0.8px' }}>INTEGRATIONS</span>
            <Link href="/integrations" className="text-xs transition-colors hover:text-white" style={{ color: '#007BFF' }}>
              <ChevronRight size={11} />
            </Link>
          </div>
          {INTEGRATIONS_STATUS.map(({ key, icon: Icon, label, href, connected, color, badge }) => {
            const active = pathname === href
            return (
              <Link key={key} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all hover:bg-white/5 ${active ? 'nav-active' : ''}`}
                style={{ color: active ? '#007BFF' : '#7a9bb5' }}>
                <Icon size={15} style={{ color: connected ? color : '#4a6580' }} />
                <span className="flex-1 truncate">{label}</span>
                {/* Issue #2 fix: connection status clearly separated from label text */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-500/70'}`} />
                  <span style={{ color: connected ? '#00D4A1' : '#ff4757', fontSize: '10px', fontWeight: 600 }}>{badge}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* System */}
        <div>
          <div className="text-xs font-semibold mb-1.5 px-2" style={{ color: '#4a6580', letterSpacing: '0.8px' }}>SYSTEM</div>
          <Link href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all hover:bg-white/5 ${pathname === '/settings' ? 'nav-active' : ''}`}
            style={{ color: pathname === '/settings' ? '#007BFF' : '#7a9bb5' }}>
            <Settings size={15} className={pathname === '/settings' ? 'text-[#007BFF]' : 'text-[#4a6580]'} />
            <span className="flex-1">Settings & Integrations</span>
          </Link>
        </div>
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
          <div className="relative cursor-pointer">
            <Bell size={14} style={{ color: '#4a6580' }} />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-[#050d1a] flex items-center justify-center">
              <span className="text-white" style={{ fontSize: '7px', lineHeight: 1 }}>3</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
