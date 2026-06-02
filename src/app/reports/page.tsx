'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Download, TrendingUp, Users, DollarSign, Target,
  ArrowUpRight, Calendar, BarChart3, RefreshCw, Mail, Zap, Brain
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import Sidebar from '@/components/Sidebar'

const PERIOD_OPTIONS = ['Daily', 'Weekly', 'Monthly', 'Quarterly']

const MONTHLY_DATA = [
  { period: 'Jan', leads: 342, pipeline: 820, won: 95, outreach: 312 },
  { period: 'Feb', leads: 418, pipeline: 940, won: 128, outreach: 398 },
  { period: 'Mar', leads: 489, pipeline: 1120, won: 167, outreach: 445 },
  { period: 'Apr', leads: 521, pipeline: 1340, won: 203, outreach: 512 },
  { period: 'May', leads: 612, pipeline: 1580, won: 241, outreach: 634 },
  { period: 'Jun', leads: 487, pipeline: 1200, won: 189, outreach: 521 },
]

const WEEKLY_DATA = [
  { period: 'Mon', leads: 18, pipeline: 52, won: 5, outreach: 34 },
  { period: 'Tue', leads: 24, pipeline: 71, won: 8, outreach: 48 },
  { period: 'Wed', leads: 31, pipeline: 89, won: 12, outreach: 62 },
  { period: 'Thu', leads: 22, pipeline: 64, won: 7, outreach: 41 },
  { period: 'Fri', leads: 28, pipeline: 95, won: 14, outreach: 73 },
  { period: 'Sat', leads: 12, pipeline: 38, won: 3, outreach: 21 },
  { period: 'Sun', leads: 9, pipeline: 28, won: 2, outreach: 15 },
]

const TOP_PERFORMERS = [
  { name: 'Lead Discovery AI', metric: '1,284 leads found', change: '+34%', color: '#007BFF' },
  { name: 'Outreach Automation', metric: '892 messages sent', change: '+28%', color: '#6C63FF' },
  { name: 'Proposal Generator', metric: '47 proposals', change: '+19%', color: '#00D4A1' },
  { name: 'Competitor Intel', metric: '124 analyses', change: '+22%', color: '#FFA502' },
]

const REPORT_TYPES = [
  { label: 'Executive Summary', icon: BarChart3, desc: 'KPI overview, top opportunities, key wins', color: '#007BFF' },
  { label: 'Lead Intelligence', icon: Users, desc: 'Lead scoring breakdown, industry distribution', color: '#6C63FF' },
  { label: 'Pipeline Report', icon: Target, desc: 'Deal stages, conversion rates, forecast', color: '#00D4A1' },
  { label: 'Outreach Report', icon: Mail, desc: 'Email performance, response rates, sequences', color: '#FFA502' },
  { label: 'AI Insights Report', icon: Brain, desc: 'Opportunity analysis, intent signals, predictions', color: '#FF6B9D' },
  { label: 'Team Performance', icon: TrendingUp, desc: 'Activity metrics, individual performance', color: '#00D4FF' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs" style={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="font-semibold text-white mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: '#7a9bb5' }}>{p.name}:</span>
          <span className="font-semibold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('Monthly')
  const [generating, setGenerating] = useState<string | null>(null)

  const data = period === 'Weekly' || period === 'Daily' ? WEEKLY_DATA : MONTHLY_DATA

  const handleGenerate = (type: string) => {
    setGenerating(type)
    setTimeout(() => setGenerating(null), 2000)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Executive Reports</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>AI-generated business intelligence reports</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Period Selector */}
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {PERIOD_OPTIONS.map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className="px-3 py-2 text-xs font-medium transition-all"
                    style={{ background: period === p ? 'rgba(0,123,255,0.2)' : 'transparent', color: period === p ? '#007BFF' : '#4a6580' }}>
                    {p}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Download size={13} /> Export All
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* KPI Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Leads', value: '4,872', change: '+124', icon: Users, color: '#007BFF' },
              { label: 'Pipeline Value', value: '$4.7M', change: '+18%', icon: DollarSign, color: '#00D4A1' },
              { label: 'Outreach Sent', value: '892', change: '+67', icon: Mail, color: '#6C63FF' },
              { label: 'Response Rate', value: '31.2%', change: '+4.8%', icon: Target, color: '#FFA502' },
            ].map(({ label, value, change, icon: Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="flex items-center gap-0.5 text-xs font-semibold text-green-400">
                    <ArrowUpRight size={12} />{change}
                  </div>
                </div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-white">{period} Performance Overview</h3>
                <div className="flex gap-3 text-xs" style={{ color: '#4a6580' }}>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#007BFF]" />Leads</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4A1]" />Won ($K)</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007BFF" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4A1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#00D4A1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="period" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="leads" name="Leads" stroke="#007BFF" strokeWidth={2} fill="url(#rg1)" dot={false} />
                  <Area type="monotone" dataKey="won" name="Won ($K)" stroke="#00D4A1" strokeWidth={2} fill="url(#rg2)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-bold text-sm text-white mb-4">AI Platform Performance</h3>
              <div className="space-y-4">
                {TOP_PERFORMERS.map(({ name, metric, change, color }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-white">{name}</span>
                      <span className="text-xs font-semibold text-green-400">{change}</span>
                    </div>
                    <div className="text-xs mb-1.5" style={{ color: '#4a6580' }}>{metric}</div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full" style={{ width: change.replace('+', '').replace('%', '') + '%', background: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outreach Performance */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-bold text-sm text-white mb-4">Outreach & Pipeline Activity</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="period" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="outreach" name="Outreach" fill="#007BFF" radius={[3, 3, 0, 0]} opacity={0.85} />
                <Bar dataKey="pipeline" name="Pipeline ($K)" fill="#6C63FF" radius={[3, 3, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Generate Reports */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Brain size={14} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">AI Report Generator</h3>
                <p className="text-xs" style={{ color: '#4a6580' }}>Generate professional reports instantly</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {REPORT_TYPES.map(({ label, icon: Icon, desc, color }, i) => (
                <div key={label} className="p-4 transition-all hover:bg-white/5"
                  style={{ borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <button
                      onClick={() => handleGenerate(label)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                      style={{ background: generating === label ? 'rgba(0,212,164,0.15)' : `${color}15`, color: generating === label ? '#00D4A1' : color, border: `1px solid ${generating === label ? 'rgba(0,212,164,0.3)' : color + '30'}` }}>
                      {generating === label ? (
                        <><RefreshCw size={11} className="animate-spin" /> Generating...</>
                      ) : (
                        <><Download size={11} /> Generate</>
                      )}
                    </button>
                  </div>
                  <div className="font-semibold text-sm text-white mb-1">{label}</div>
                  <div className="text-xs" style={{ color: '#4a6580' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Reports */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white">Scheduled Reports</h3>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:opacity-90" style={{ background: 'rgba(0,123,255,0.12)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                + Schedule New
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Weekly Executive Summary', schedule: 'Every Monday 9:00 AM', recipients: 'CEO, BD Team', next: 'Jun 9, 2026', status: 'active' },
                { name: 'Monthly Pipeline Report', schedule: '1st of each month', recipients: 'Sales Team', next: 'Jul 1, 2026', status: 'active' },
                { name: 'Daily Lead Digest', schedule: 'Every day at 8:00 AM', recipients: 'Outreach Team', next: 'Tomorrow', status: 'active' },
              ].map((report, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl" style={{ background: 'rgba(5,13,26,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">{report.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{report.schedule} • To: {report.recipients}</div>
                  </div>
                  <div className="text-xs text-right" style={{ color: '#4a6580' }}>
                    <div>Next:</div>
                    <div className="text-white font-medium">{report.next}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
