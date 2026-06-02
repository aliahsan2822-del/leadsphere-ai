'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, Users, ArrowUpRight } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '@/components/Sidebar'
import { MONTHLY_CHART_DATA, WEEKLY_CHART_DATA, INDUSTRY_DATA } from '@/lib/mockData'

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h1 className="text-xl font-bold text-white">Analytics</h1>
            <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Platform performance & intelligence metrics</p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Pipeline', value: '$4.7M', change: '+18.4%', icon: Target, color: '#007BFF' },
              { label: 'Leads Analyzed', value: '4,872', change: '+124', icon: Users, color: '#6C63FF' },
              { label: 'Outreach Sent', value: '892', change: '+67', icon: TrendingUp, color: '#00D4FF' },
              { label: 'Response Rate', value: '31.2%', change: '+4.8%', icon: BarChart3, color: '#00D4A1' },
            ].map(({ label, value, change, icon: Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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

          <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-bold text-white text-sm mb-4">6-Month Pipeline Growth</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={MONTHLY_CHART_DATA}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#007BFF" strokeWidth={2} fill="url(#ag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-bold text-white text-sm mb-4">Weekly Activity Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontSize: '12px' }} />
                <Bar dataKey="leads" fill="#007BFF" radius={[3, 3, 0, 0]} opacity={0.8} />
                <Bar dataKey="opportunities" fill="#6C63FF" radius={[3, 3, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}
