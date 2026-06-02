'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Users, TrendingUp, DollarSign, Target, Zap, Brain,
  ArrowUpRight, ArrowDownRight, RefreshCw, Filter,
  Globe, BarChart3, Activity, ChevronRight, Flame, Star
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import Sidebar from '@/components/Sidebar'
import { DASHBOARD_STATS, MONTHLY_CHART_DATA, WEEKLY_CHART_DATA, INDUSTRY_DATA, MOCK_LEADS } from '@/lib/mockData'

const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
  </div>
)})

const STAT_CARDS = [
  {
    label: 'Total Leads',
    value: '4,872',
    change: '+124',
    period: 'this week',
    trend: 'up',
    color: '#007BFF',
    icon: Users,
    bg: 'rgba(0,123,255,0.08)',
  },
  {
    label: 'Hot Opportunities',
    value: '347',
    change: '+28',
    period: 'vs last week',
    trend: 'up',
    color: '#ff4757',
    icon: Flame,
    bg: 'rgba(255,71,87,0.08)',
  },
  {
    label: 'Pipeline Value',
    value: '$4.7M',
    change: '+$340K',
    period: 'this month',
    trend: 'up',
    color: '#00D4A1',
    icon: DollarSign,
    bg: 'rgba(0,212,164,0.08)',
  },
  {
    label: 'Conversion Rate',
    value: '18.4%',
    change: '+2.1%',
    period: 'vs last month',
    trend: 'up',
    color: '#6C63FF',
    icon: TrendingUp,
    bg: 'rgba(108,99,255,0.08)',
  },
  {
    label: 'Outreach Sent',
    value: '892',
    change: '-45',
    period: 'vs last week',
    trend: 'down',
    color: '#FFA502',
    icon: Target,
    bg: 'rgba(255,165,2,0.08)',
  },
  {
    label: 'Response Rate',
    value: '31.2%',
    change: '+4.8%',
    period: 'vs last month',
    trend: 'up',
    color: '#00D4FF',
    icon: Activity,
    bg: 'rgba(0,212,255,0.08)',
  },
]

const AI_RECS = [
  {
    title: 'NexaTech Solutions is showing strong buying signals',
    description: 'Series B funding + 5 new engineering hires indicates they are ready to invest in their digital infrastructure. Website score: 42/100. Estimated deal value: $180K.',
    urgency: 'urgent',
    score: 94,
    action: 'Send Outreach',
  },
  {
    title: 'Harborview Hospitality needs website redesign',
    description: 'Mobile checkout abandonment at 89%. Direct booking loss estimated $3.2M/year to OTAs. CMO mentioned website project in conference last week.',
    urgency: 'high',
    score: 88,
    action: 'Analyze',
  },
  {
    title: 'GreenLeaf Organics just raised $3.2M seed',
    description: 'Post-funding is the ideal time to pitch. They need complete e-commerce overhaul and mobile app. Founder is actively looking for tech partner.',
    urgency: 'high',
    score: 82,
    action: 'View Lead',
  },
]

const RECENT_ACTIVITY = [
  { action: 'AI discovered 28 new hot leads', detail: 'Healthcare & logistics sectors', time: '5 min ago', color: '#ff4757' },
  { action: 'Outreach sent to NexaTech Solutions', detail: 'Website opportunity email', time: '32 min ago', color: '#007BFF' },
  { action: 'Luminary EdTech scored 89/100', detail: 'Post Series A funding signal', time: '1 hr ago', color: '#6C63FF' },
  { action: 'Dubai market — 276 new opportunities', detail: 'Real estate & finance sectors', time: '2 hrs ago', color: '#00D4FF' },
  { action: 'PrimeFreight website scan complete', detail: 'Score: 28/100 — critical redesign needed', time: '3 hrs ago', color: '#FFA502' },
  { action: 'AI proposal generated for SwiftBuild', detail: 'ERP + website bundle proposal', time: '4 hrs ago', color: '#00D4A1' },
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
            <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Real-time intelligence • Updated 2 minutes ago</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
              <RefreshCw size={13} />
              Refresh
            </button>
            <button
              onClick={() => setGlobeView(!globeView)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ background: globeView ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.05)', color: globeView ? '#007BFF' : '#7a9bb5', border: `1px solid ${globeView ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              <Globe size={13} />
              Globe View
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {STAT_CARDS.map(({ label, value, change, period, trend, color, icon: Icon, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-hover p-4 rounded-2xl col-span-1"
                style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                  </div>
                </div>
                <div className="text-xl font-black text-white mb-0.5">{value}</div>
                <div className="text-xs" style={{ color: '#4a6580' }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{period}</div>
              </motion.div>
            ))}
          </div>

          {/* Globe or Charts */}
          {globeView ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden"
              style={{ height: 500, background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <Globe size={16} style={{ color: '#00D4FF' }} />
                  <span className="font-semibold text-sm text-white">Global Opportunity Map</span>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4FF]" />Tech</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" />Finance</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />E-Com</span>
                </div>
              </div>
              <div style={{ height: 440 }}>
                <Globe3D compact />
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Area Chart */}
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
                <ResponsiveContainer width="100%" height={200}>
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

              {/* Pie Chart */}
              <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-bold text-white text-sm mb-1">Lead by Industry</h3>
                <p className="text-xs mb-4" style={{ color: '#4a6580' }}>Distribution this month</p>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={INDUSTRY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {INDUSTRY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
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
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-white text-sm">Weekly Activity</h3>
                <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Leads, opportunities & outreach this week</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={WEEKLY_CHART_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" name="Leads" fill="#007BFF" radius={[3, 3, 0, 0]} opacity={0.8} />
                <Bar dataKey="opportunities" name="Opportunities" fill="#6C63FF" radius={[3, 3, 0, 0]} opacity={0.8} />
                <Bar dataKey="outreach" name="Outreach" fill="#00D4FF" radius={[3, 3, 0, 0]} opacity={0.8} />
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
                <div>
                  <h3 className="font-bold text-sm text-white">AI Recommendations</h3>
                  <p className="text-xs" style={{ color: '#4a6580' }}>Highest priority actions</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {AI_RECS.map((rec, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(0,123,255,0.05)', border: '1px solid rgba(0,123,255,0.12)' }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-semibold text-white leading-tight">{rec.title}</h4>
                      <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: rec.urgency === 'urgent' ? 'rgba(255,71,87,0.15)' : 'rgba(255,165,2,0.15)', color: rec.urgency === 'urgent' ? '#ff4757' : '#ffa502' }}>
                        {rec.urgency === 'urgent' ? '🔥 Urgent' : '⚡ High'}
                      </span>
                    </div>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: '#7a9bb5' }}>{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs" style={{ color: '#4a6580' }}>AI Score:</span>
                        <span className="text-xs font-bold" style={{ color: '#00D4FF' }}>{rec.score}/100</span>
                      </div>
                      <button className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90" style={{ background: 'rgba(0,123,255,0.15)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.25)' }}>
                        {rec.action} <ChevronRight size={10} className="inline" />
                      </button>
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
              <div className="p-4 space-y-0">
                {RECENT_ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white leading-tight">{item.action}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{item.detail}</div>
                    </div>
                    <div className="text-xs flex-shrink-0" style={{ color: '#4a6580' }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Leads Preview */}
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
                    <tr key={lead.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {lead.company.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">{lead.company}</div>
                            <div className="text-xs" style={{ color: '#4a6580' }}>{lead.website}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#7a9bb5' }}>{lead.industry}</td>
                      <td style={{ color: '#7a9bb5' }}>{lead.location}</td>
                      <td>
                        <span className="font-bold text-sm" style={{ color: lead.score >= 80 ? '#ff4757' : '#ffa502' }}>{lead.score}</span>
                      </td>
                      <td>
                        <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}>
                          {Object.entries(lead.opportunities).sort((a, b) => b[1].score - a[1].score)[0][1].label}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          {lead.intentSignals.map((sig, i) => (
                            <div key={i} className="w-2 h-2 rounded-full" style={{ background: sig.strength === 'strong' ? '#ff4757' : sig.strength === 'medium' ? '#ffa502' : '#4a6580' }} title={sig.description} />
                          ))}
                        </div>
                      </td>
                      <td>
                        <a href={`/intelligence?id=${lead.id}`} className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:opacity-90" style={{ background: 'rgba(0,123,255,0.12)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                          Analyze
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
