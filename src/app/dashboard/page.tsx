'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Users, TrendingUp, DollarSign, Target, Zap, Brain,
  ArrowUpRight, ArrowDownRight, RefreshCw, Globe,
  BarChart3, Activity, ChevronRight, Flame, Star,
  Cpu, MapPin, Sparkles, Mail, Linkedin, Plus, Bell,
  Send, CheckCircle2
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import Sidebar from '@/components/Sidebar'
import { MONTHLY_CHART_DATA, WEEKLY_CHART_DATA, INDUSTRY_DATA, MOCK_LEADS } from '@/lib/mockData'

const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
  </div>
)})

const MAIN_KPIS = [
  { label: 'Total Leads', value: '4,872', change: '+124', period: 'this week', trend: 'up', color: '#007BFF', icon: Users, bg: 'rgba(0,123,255,0.08)', desc: 'Discovered & tracked' },
  { label: 'Hot Opportunities', value: '347', change: '+28', period: 'vs last week', trend: 'up', color: '#ff4757', icon: Flame, bg: 'rgba(255,71,87,0.08)', desc: 'Score ≥ 80' },
  { label: 'Pipeline Value', value: '$4.7M', change: '+$340K', period: 'this month', trend: 'up', color: '#00D4A1', icon: DollarSign, bg: 'rgba(0,212,164,0.08)', desc: 'Weighted potential' },
  { label: 'Conversion Rate', value: '18.4%', change: '+2.1%', period: 'vs last month', trend: 'up', color: '#6C63FF', icon: TrendingUp, bg: 'rgba(108,99,255,0.08)', desc: 'Lead → opportunity' },
]

const SECONDARY_KPIS = [
  { label: 'Outreach Sent', value: '892', change: '-45', period: 'vs last week', trend: 'down', color: '#FFA502', icon: Target },
  { label: 'Response Rate', value: '31.2%', change: '+4.8%', period: 'vs last month', trend: 'up', color: '#00D4FF', icon: Activity },
]

const AI_RECS = [
  { title: 'NexaTech Solutions is showing strong buying signals', description: 'Series B funding + 5 new engineering hires. Website score 42/100. Est. deal value $180K.', urgency: 'urgent', score: 94, action: 'Send Outreach' },
  { title: 'Harborview Hospitality needs website redesign', description: 'Mobile checkout abandonment at 89%. Direct booking loss estimated $3.2M/year to OTAs.', urgency: 'high', score: 88, action: 'Analyze' },
  { title: 'GreenLeaf Organics just raised $3.2M seed', description: 'Post-funding is the ideal time to pitch. They need complete e-commerce overhaul and mobile app.', urgency: 'high', score: 82, action: 'View Lead' },
]

const RECENT_ACTIVITY = [
  { action: 'AI discovered 28 new hot leads', detail: 'Healthcare & logistics sectors', time: '5 min ago', color: '#ff4757' },
  { action: 'Outreach sent to NexaTech Solutions', detail: 'Website opportunity email', time: '32 min ago', color: '#007BFF' },
  { action: 'Luminary EdTech scored 89/100', detail: 'Post Series A funding signal', time: '1 hr ago', color: '#6C63FF' },
  { action: 'Dubai market — 276 new opportunities', detail: 'Real estate & finance sectors', time: '2 hrs ago', color: '#00D4FF' },
  { action: 'PrimeFreight website scan complete', detail: 'Score: 28/100 — critical redesign needed', time: '3 hrs ago', color: '#FFA502' },
  { action: 'AI proposal generated for SwiftBuild', detail: 'ERP + website bundle proposal', time: '4 hrs ago', color: '#00D4A1' },
]

const QUICK_ACTIONS = [
  { label: 'Send Email Campaign', icon: Mail, color: '#007BFF', bg: 'rgba(0,123,255,0.12)', href: '/outreach' },
  { label: 'LinkedIn Outreach', icon: Linkedin, color: '#0A66C2', bg: 'rgba(10,102,194,0.12)', href: '/outreach' },
  { label: 'Create Campaign', icon: Plus, color: '#00D4A1', bg: 'rgba(0,212,164,0.12)', href: '/campaigns' },
  { label: 'View Notifications', icon: Bell, color: '#FFA502', bg: 'rgba(255,165,2,0.12)', href: '/reports' },
]

const TOP_MARKETS = [
  { name: 'United States', growth: '+12%', leads: 1240, color: '#007BFF' },
  { name: 'United Kingdom', growth: '+8%', leads: 680, color: '#6C63FF' },
  { name: 'UAE / Middle East', growth: '+21%', leads: 520, color: '#FFA502' },
  { name: 'Singapore / APAC', growth: '+15%', leads: 440, color: '#00D4A1' },
  { name: 'Canada', growth: '+6%', leads: 380, color: '#00D4FF' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong px-3 py-2 rounded-xl text-xs">
      <div className="text-white font-semibold mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: '#7a9bb5' }}>{p.name}:</span>
          <span className="text-white font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [globeView, setGlobeView] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h1 className="text-xl font-bold text-white">Executive Dashboard</h1>
            {/* Issue #8 fix: timestamp with timezone */}
            <p className="text-xs mt-0.5 timestamp-live" style={{ color: '#4a6580' }}>
              Real-time intelligence &nbsp;·&nbsp; Updated 2 min ago &nbsp;·&nbsp;
              <span style={{ color: '#6a8099' }}>UTC {new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Refresh dashboard data"
              className="btn btn-outline btn-md flex items-center gap-2">
              <RefreshCw size={13} /><span>Refresh</span>
            </button>
            {/* Issue #9 fix: descriptive Globe View button */}
            <button onClick={() => setGlobeView(!globeView)}
              title={globeView ? 'Switch to chart view' : 'View global opportunities on interactive 3D map'}
              aria-pressed={globeView}
              className="btn btn-md flex items-center gap-2"
              style={{ background: globeView ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.05)', color: globeView ? '#007BFF' : '#7a9bb5', border: `1px solid ${globeView ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              <Globe size={13} /><span>{globeView ? 'Chart View' : 'Globe View'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Issue #3 fix: 4-Column Primary KPIs — clear hierarchy: icon+badge / value / label / context */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MAIN_KPIS.map(({ label, value, change, period, trend, color, icon: Icon, bg, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="p-5 rounded-2xl card-hover"
                style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid rgba(255,255,255,0.06)`, borderTop: `2px solid ${color}40` }}>
                {/* Row 1: icon + trend badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? '' : ''}`}
                    style={{
                      background: trend === 'up' ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                      color: trend === 'up' ? '#4ade80' : '#f87171',
                    }}
                    aria-label={`${trend === 'up' ? 'Increased' : 'Decreased'} by ${change} ${period}`}>
                    {trend === 'up' ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                    <span>{change}</span>
                  </div>
                </div>
                {/* Row 2: primary value */}
                <div className="text-2xl font-black text-white leading-none mb-1">{value}</div>
                {/* Row 3: label */}
                <div className="text-sm font-semibold" style={{ color: '#c0d4e8' }}>{label}</div>
                {/* Row 4: context — desc + period clearly separated */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-xs" style={{ color: '#4a6580' }}>{desc}</span>
                  <span style={{ color: '#2a3a4a' }}>·</span>
                  <span className="text-xs" style={{ color: '#4a6580' }}>{period}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary KPIs + Email/LinkedIn quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SECONDARY_KPIS.map(({ label, value, change, period, trend, color, icon: Icon }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 + i * 0.05 }}
                className="p-4 rounded-2xl card-hover"
                style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <Icon size={14} style={{ color }} />
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{change}
                  </div>
                </div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label} • {period}</div>
              </motion.div>
            ))}
            {/* Email stats card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
              className="p-4 rounded-2xl card-hover"
              style={{ background: 'rgba(0,123,255,0.06)', border: '1px solid rgba(0,123,255,0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} style={{ color: '#007BFF' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold" style={{ color: '#007BFF' }}>Email Connected</span>
              </div>
              <div className="text-xl font-black text-white">24.6%</div>
              <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Open rate • 2,847 emails sent</div>
            </motion.div>
            {/* LinkedIn stats card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="p-4 rounded-2xl card-hover cursor-pointer"
              style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Linkedin size={14} style={{ color: '#0A66C2' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-xs font-semibold" style={{ color: '#ff4757' }}>LinkedIn Offline</span>
              </div>
              <div className="text-xl font-black text-white">—</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs" style={{ color: '#007BFF' }}>Connect LinkedIn</span>
                <ChevronRight size={10} style={{ color: '#007BFF' }} />
              </div>
            </motion.div>
          </div>

          {/* Main content: charts (3/4) + right quick-access panel (1/4) */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">

            {/* Charts section — left 3/4 */}
            <div className="xl:col-span-3 space-y-5">

              {/* Globe or Area+Pie charts */}
              {globeView ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl overflow-hidden" style={{ height: 420, background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-2">
                      <Globe size={16} style={{ color: '#00D4FF' }} />
                      <span className="font-semibold text-sm text-white">Global Opportunity Map</span>
                    </div>
                  </div>
                  <div style={{ height: 374 }}>
                    <Globe3D compact />
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="font-bold text-white text-sm">Lead & Opportunity Growth</h3>
                        <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Monthly pipeline development</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#007BFF]" />Leads</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" />Value</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={190}>
                      <AreaChart data={MONTHLY_CHART_DATA}>
                        <defs>
                          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#007BFF" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="month" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="leads" name="Leads" stroke="#007BFF" strokeWidth={2} fill="url(#blueGrad)" dot={false} />
                        <Area type="monotone" dataKey="value" name="Pipeline ($K)" stroke="#6C63FF" strokeWidth={2} fill="url(#purpleGrad)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 className="font-bold text-white text-sm mb-1">Lead by Industry</h3>
                    <p className="text-xs mb-4" style={{ color: '#4a6580' }}>Distribution this month</p>
                    <ResponsiveContainer width="100%" height={130}>
                      <PieChart>
                        <Pie data={INDUSTRY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value">
                          {INDUSTRY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 mt-2">
                      {INDUSTRY_DATA.map(({ name, value, color }) => (
                        <div key={name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                          <span className="text-xs flex-1" style={{ color: '#7a9bb5' }}>{name}</span>
                          <span className="text-xs font-semibold text-white">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Weekly Bar Chart */}
              <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-sm">Weekly Activity</h3>
                    <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Leads, opportunities & outreach this week</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#007BFF]" />Leads</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" />Opps</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4FF]" />Outreach</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={WEEKLY_CHART_DATA} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="leads" name="Leads" fill="#007BFF" radius={[3, 3, 0, 0]} opacity={0.85} />
                    <Bar dataKey="opportunities" name="Opportunities" fill="#6C63FF" radius={[3, 3, 0, 0]} opacity={0.85} />
                    <Bar dataKey="outreach" name="Outreach" fill="#00D4FF" radius={[3, 3, 0, 0]} opacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* AI Recs + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* AI Recommendations */}
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                      <Brain size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-white">AI Recommendations</h3>
                      <p className="text-xs" style={{ color: '#4a6580' }}>Highest priority actions</p>
                    </div>
                    <a href="/leads" className="text-xs" style={{ color: '#007BFF' }}>View all</a>
                  </div>
                  {/* Issue #5 & #7 fix: consistent button styling + clear urgency badges */}
                  <div className="p-4 space-y-3">
                    {AI_RECS.map((rec, i) => (
                      <div key={i} className="p-3 rounded-xl transition-all hover:bg-white/[0.04]"
                        style={{ background: rec.urgency === 'urgent' ? 'rgba(255,71,87,0.04)' : 'rgba(0,123,255,0.04)', border: `1px solid ${rec.urgency === 'urgent' ? 'rgba(255,71,87,0.12)' : 'rgba(0,123,255,0.1)'}` }}>
                        <div className="flex items-start gap-2 mb-1.5">
                          {/* Issue #10 fix: accessible priority badges with text label, not just emoji */}
                          <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${rec.urgency === 'urgent' ? 'urgency-urgent' : 'urgency-high'}`}
                            aria-label={`Priority: ${rec.urgency === 'urgent' ? 'Urgent' : 'High'}`}>
                            <span aria-hidden="true">{rec.urgency === 'urgent' ? '🔥' : '⚡'}</span>
                            {' '}{rec.urgency === 'urgent' ? 'Urgent' : 'High'}
                          </span>
                          <span className="text-xs font-bold ml-auto flex-shrink-0 px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>
                            AI {rec.score}/100
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-white leading-snug mb-1.5">{rec.title}</h4>
                        <p className="text-xs mb-2.5 leading-relaxed" style={{ color: '#7a9bb5' }}>{rec.description}</p>
                        {/* Issue #7 fix: differentiated button styles per action type */}
                        <div className="flex items-center gap-2">
                          {rec.action === 'Send Outreach' ? (
                            <button className="btn btn-primary btn-sm flex items-center gap-1.5 flex-1">
                              <Send size={10} /> Send Outreach
                            </button>
                          ) : rec.action === 'Analyze' ? (
                            <button className="btn btn-secondary btn-sm flex items-center gap-1.5 flex-1">
                              <Brain size={10} /> Analyze
                            </button>
                          ) : (
                            <button className="btn btn-outline btn-sm flex items-center gap-1.5 flex-1">
                              <ChevronRight size={10} /> View Lead
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.12)' }}>
                      <Activity size={14} style={{ color: '#00D4FF' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">Live Activity Feed</h3>
                      <p className="text-xs" style={{ color: '#4a6580' }}>Platform events in real-time</p>
                    </div>
                  </div>
                  <div className="p-4">
                    {RECENT_ACTIVITY.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 transition-all hover:bg-white/5 rounded-lg px-1 -mx-1" style={{ borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-white leading-tight">{item.action}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{item.detail}</div>
                        </div>
                        <div className="text-xs flex-shrink-0" style={{ color: '#4a6580' }}>{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick-Access Panel */}
            <div className="xl:col-span-1 space-y-4">

              {/* Quick Actions */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-bold text-sm text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {QUICK_ACTIONS.map(({ label, icon: Icon, color, bg, href }, i) => (
                    <a key={i} href={href}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 group cursor-pointer"
                      style={{ background: bg, border: `1px solid ${color}20` }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                        <Icon size={14} style={{ color }} />
                      </div>
                      <span className="text-xs font-medium text-white flex-1">{label}</span>
                      <ChevronRight size={12} style={{ color: '#4a6580' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Top Markets */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={13} style={{ color: '#FF6B9D' }} />
                  <h3 className="font-bold text-sm text-white">Top Markets</h3>
                </div>
                <div className="space-y-3">
                  {TOP_MARKETS.map(({ name, growth, leads, color }) => (
                    <div key={name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white font-medium truncate flex-1 pr-2">{name}</span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-xs font-bold text-green-400">{growth}</span>
                          <span className="text-xs font-bold" style={{ color }}>{leads.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(leads / 1240) * 100}%` }} transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/globe" className="flex items-center gap-1 mt-3 text-xs" style={{ color: '#007BFF' }}>
                  View global map <ChevronRight size={10} />
                </a>
              </div>

              {/* Weekly Summary */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={13} style={{ color: '#6C63FF' }} />
                  <h3 className="font-bold text-sm text-white">Weekly Summary</h3>
                </div>
                {[
                  { label: 'Leads Added', current: 124, max: 200, color: '#007BFF' },
                  { label: 'Emails Sent', current: 892, max: 1000, color: '#00D4FF' },
                  { label: 'Meetings Booked', current: 8, max: 20, color: '#00D4A1' },
                  { label: 'Proposals Sent', current: 5, max: 15, color: '#FFA502' },
                ].map(({ label, current, max, color }) => (
                  <div key={label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: '#7a9bb5' }}>{label}</span>
                      <span className="text-xs font-bold text-white">{current}<span style={{ color: '#4a6580' }}>/{max}</span></span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(current / max) * 100}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full" style={{ background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Campaign Quick Status */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Send size={13} style={{ color: '#007BFF' }} />
                    <h3 className="font-bold text-sm text-white">Active Campaigns</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>3 live</span>
                </div>
                {[
                  { name: 'Series B Tech', sent: 178, replies: 12, color: '#007BFF' },
                  { name: 'Healthcare Opps', sent: 245, replies: 28, color: '#6C63FF' },
                  { name: 'Post-Funded Leads', sent: 421, replies: 31, color: '#00D4A1' },
                ].map(({ name, sent, replies, color }) => (
                  <div key={name} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: color }} />
                    <span className="text-xs text-white flex-1 truncate">{name}</span>
                    <div className="flex items-center gap-2 text-xs flex-shrink-0">
                      <span style={{ color: '#4a6580' }}>{sent} sent</span>
                      <span className="font-bold" style={{ color }}>{replies} rep.</span>
                    </div>
                  </div>
                ))}
                <a href="/campaigns" className="flex items-center gap-1 mt-2 text-xs" style={{ color: '#007BFF' }}>
                  Manage campaigns <ChevronRight size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Hot Leads Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,71,87,0.12)' }}>
                  <Flame size={14} style={{ color: '#ff4757' }} />
                </div>
                <h3 className="font-bold text-sm text-white">Top Hot Leads</h3>
              </div>
              <a href="/leads" className="text-xs font-medium transition-colors hover:text-white" style={{ color: '#007BFF' }}>
                View All Leads <ChevronRight size={12} className="inline" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>AI Score</th>
                    <th>Top Opportunity</th>
                    <th>Intent Signals</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LEADS.filter(l => l.scoreCategory === 'hot').slice(0, 5).map(lead => (
                    <tr key={lead.id} style={{ cursor: 'pointer' }} className="transition-all">
                      {/* Issue #1 fix: company avatar in separate .company-avatar div, name in .company-name-text — prevents "Ne NexaTech" concat bug */}
                      <td>
                        <div className="company-cell">
                          <div className="company-avatar" aria-hidden="true">
                            {lead.company.slice(0, 2).toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div className="company-name-text">{lead.company}</div>
                            <div className="company-domain">{lead.website}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#7a9bb5' }}>{lead.industry}</td>
                      <td style={{ color: '#7a9bb5' }}>{lead.location}</td>
                      {/* Issue #11 fix: score with /100 unit for clarity */}
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm" style={{ color: lead.score >= 80 ? '#ff4757' : '#ffa502' }}>{lead.score}</span>
                          <span className="text-xs" style={{ color: '#4a6580' }}>/100</span>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: lead.score >= 80 ? '#ff4757' : '#ffa502' }} />
                        </div>
                      </td>
                      <td>
                        <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.15)' }}>
                          {Object.entries(lead.opportunities).sort((a, b) => b[1].score - a[1].score)[0][1].label}
                        </span>
                      </td>
                      {/* Issue #10 fix: accessible intent signal dots with both title and text labels */}
                      <td>
                        <div className="flex items-center gap-1.5" role="list" aria-label="Intent signals">
                          {lead.intentSignals.map((sig, i) => (
                            <div key={i}
                              className={`signal-dot ${sig.strength === 'strong' ? 'signal-strong' : sig.strength === 'medium' ? 'signal-medium' : 'signal-weak'}`}
                              title={`${sig.strength} signal: ${sig.description}`}
                              role="listitem"
                              aria-label={`${sig.strength} signal: ${sig.description}`}
                            />
                          ))}
                        </div>
                      </td>
                      {/* Issue #7 fix: consistent analyze button using .btn system */}
                      <td>
                        <a href={`/intelligence?id=${lead.id}`} className="btn btn-secondary btn-sm">
                          Analyze
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #007BFF)' }}>
                  <Cpu size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Predictive Analytics</h3>
                  <p className="text-xs" style={{ color: '#4a6580' }}>AI conversion forecasts for this month</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Conversion Prob.', value: '23.4%', trend: '+2.1%', color: '#007BFF' },
                  { label: 'Revenue Forecast', value: '$1.2M', trend: '+18%', color: '#00D4A1' },
                  { label: 'Avg Deal Size', value: '$48K', trend: '+$4K', color: '#6C63FF' },
                  { label: 'Customer LTV', value: '$142K', trend: '+12%', color: '#FFA502' },
                ].map(({ label, value, trend, color }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                    <div className="text-lg font-black" style={{ color }}>{value}</div>
                    <div className="text-xs text-white mt-0.5 font-medium">{label}</div>
                    <div className="text-xs text-green-400 mt-0.5">{trend}</div>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={[
                  { m: 'Jan', actual: 95, forecast: null },
                  { m: 'Feb', actual: 128, forecast: null },
                  { m: 'Mar', actual: 167, forecast: null },
                  { m: 'Apr', actual: 203, forecast: null },
                  { m: 'May', actual: 241, forecast: 241 },
                  { m: 'Jun', actual: null, forecast: 268 },
                  { m: 'Jul', actual: null, forecast: 310 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="m" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="actual" name="Actual ($K)" stroke="#007BFF" strokeWidth={2} dot={{ fill: '#007BFF', r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="forecast" name="Forecast ($K)" stroke="#6C63FF" strokeWidth={2} strokeDasharray="6 3" dot={{ fill: '#6C63FF', r: 3 }} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Intent Score Leaderboard */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} style={{ color: '#ffa502' }} />
                <h3 className="font-bold text-sm text-white">Highest Intent This Week</h3>
              </div>
              {/* Issue #11 fix: metric definitions with units and context */}
              <div className="flex items-center gap-3 mb-2 px-1">
                {[{ label: 'Intent', desc: 'Buying intent 0–100' }, { label: 'Urgency', desc: 'Time sensitivity 0–100' }, { label: 'Conv%', desc: 'Est. close probability' }].map(({ label, desc }) => (
                  <div key={label} className="flex-1 text-center" title={desc}>
                    <div className="text-xs font-semibold" style={{ color: '#4a6580' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { company: 'NexaTech Solutions', signal: 'Series B + 5 hires', intent: 94, urgency: 91, conv: 82, color: '#ff4757' },
                  { company: 'Luminary EdTech', signal: '$12M Series A closed', intent: 89, urgency: 86, conv: 75, color: '#ffa502' },
                  { company: 'GreenLeaf Organics', signal: 'Founder seeking partner', intent: 85, urgency: 80, conv: 68, color: '#ffa502' },
                  { company: 'Meridian Healthcare', signal: 'Hiring Dir of Digital', intent: 83, urgency: 78, conv: 64, color: '#ffa502' },
                ].map(({ company, signal, intent, urgency, conv, color }, i) => (
                  <div key={company} className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex-shrink-0" style={{ width: 20 }}>
                      <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-black text-white" style={{ background: `${color}25` }}>{i + 1}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{company}</div>
                      <div className="text-xs truncate" style={{ color: '#4a6580' }}>{signal}</div>
                    </div>
                    {/* Issue #11 fix: each score with unit label */}
                    {[{ val: intent, c: '#007BFF' }, { val: urgency, c: color }, { val: conv, c: '#00D4A1', unit: '%' }].map(({ val, c, unit = '' }, j) => (
                      <div key={j} className="flex-shrink-0 text-center" style={{ width: 36 }}>
                        <div className="text-sm font-black" style={{ color: c }}>{val}<span style={{ fontSize: 9, opacity: 0.7 }}>{unit}</span></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <a href="/leads" className="flex items-center gap-1 mt-3 text-xs" style={{ color: '#007BFF' }}>
                View all leads <ChevronRight size={10} />
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
