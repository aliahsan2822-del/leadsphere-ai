'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone, Mail, Linkedin, Play, Pause, CheckCircle2, XCircle,
  ArrowUpRight, Plus, Send, Eye, MessageSquare, AlertCircle,
  BarChart3, ChevronRight, Zap, Brain, Filter, TrendingUp,
  Calendar, Users, Clock, RefreshCw
} from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '@/components/Sidebar'

const CAMPAIGNS = [
  {
    id: 'camp-001',
    name: 'Series B Tech Companies',
    description: 'Targeting recently funded tech companies with website + mobile opportunities',
    channels: ['email'],
    status: 'active',
    leads: 245,
    sent: 178,
    opened: 89,
    clicked: 34,
    replied: 12,
    bounced: 5,
    color: '#007BFF',
    startDate: '2026-05-20',
    sequence: ['Initial email', 'Follow-up day 3', 'LinkedIn day 7', 'Last attempt day 14'],
    openRate: 50,
    replyRate: 6.7,
  },
  {
    id: 'camp-002',
    name: 'Healthcare Decision Makers',
    description: 'CIOs and CDOs at healthcare organizations needing digital transformation',
    channels: ['linkedin', 'email'],
    status: 'active',
    leads: 312,
    sent: 245,
    opened: 134,
    clicked: 56,
    replied: 28,
    bounced: 8,
    color: '#6C63FF',
    startDate: '2026-05-18',
    sequence: ['LinkedIn connection', 'Email outreach', 'Follow-up email', 'Final LinkedIn msg'],
    openRate: 54.7,
    replyRate: 11.4,
  },
  {
    id: 'camp-003',
    name: 'Post-Funding Warm Leads',
    description: 'Companies that raised funding in last 90 days — prime for tech investment',
    channels: ['email'],
    status: 'paused',
    leads: 156,
    sent: 421,
    opened: 198,
    clicked: 72,
    replied: 31,
    bounced: 12,
    color: '#00D4A1',
    startDate: '2026-05-10',
    sequence: ['Congratulations email', 'Value email day 4', 'Proposal day 10', 'Check-in day 20'],
    openRate: 47.0,
    replyRate: 7.4,
  },
  {
    id: 'camp-004',
    name: 'E-Commerce Optimization',
    description: 'DTC brands with high cart abandonment and mobile conversion issues',
    channels: ['linkedin'],
    status: 'draft',
    leads: 89,
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    bounced: 0,
    color: '#FFA502',
    startDate: '—',
    sequence: ['LinkedIn connection request', 'Value message', 'Case study follow-up'],
    openRate: 0,
    replyRate: 0,
  },
]

const WEEKLY_PERF = [
  { day: 'Mon', sent: 124, opens: 58, replies: 9 },
  { day: 'Tue', sent: 186, opens: 94, replies: 14 },
  { day: 'Wed', sent: 203, opens: 112, replies: 18 },
  { day: 'Thu', sent: 167, opens: 81, replies: 11 },
  { day: 'Fri', sent: 221, opens: 143, replies: 22 },
  { day: 'Sat', sent: 84, opens: 38, replies: 5 },
  { day: 'Sun', sent: 51, opens: 22, replies: 3 },
]

const STATS = [
  { label: 'Active Campaigns', value: '3', icon: Megaphone, color: '#007BFF', bg: 'rgba(0,123,255,0.08)', change: '+1' },
  { label: 'Total Emails Sent', value: '2,847', icon: Mail, color: '#00D4FF', bg: 'rgba(0,212,255,0.08)', change: '+423 this week' },
  { label: 'Avg Open Rate', value: '24.6%', icon: Eye, color: '#00D4A1', bg: 'rgba(0,212,164,0.08)', change: '+3.2% vs last week' },
  { label: 'Avg Reply Rate', value: '8.7%', icon: MessageSquare, color: '#FFA502', bg: 'rgba(255,165,2,0.08)', change: '+1.1% vs last week' },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; dot: string; label: string }> = {
    active: { bg: 'rgba(0,212,164,0.1)', color: '#00D4A1', dot: 'bg-green-400 animate-pulse', label: 'Active' },
    paused: { bg: 'rgba(255,165,2,0.1)', color: '#FFA502', dot: 'bg-yellow-400', label: 'Paused' },
    draft: { bg: 'rgba(74,101,128,0.15)', color: '#7a9bb5', dot: 'bg-gray-500', label: 'Draft' },
    completed: { bg: 'rgba(108,99,255,0.1)', color: '#6C63FF', dot: 'bg-purple-400', label: 'Completed' },
  }
  const m = map[status] || map.draft
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: m.bg, color: m.color }}>
      <div className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{m.label}
    </span>
  )
}

function ChannelIcon({ channel }: { channel: string }) {
  if (channel === 'email') return <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,123,255,0.1)', color: '#007BFF' }}><Mail size={10} />Email</div>
  if (channel === 'linkedin') return <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(10,102,194,0.15)', color: '#0A66C2' }}><Linkedin size={10} />LinkedIn</div>
  return null
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs" style={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="text-white font-semibold mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: '#7a9bb5' }}>{p.name}:</span>
          <span className="text-white font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGNS[0])
  const [showNewCampaign, setShowNewCampaign] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Campaign Activity & Responses</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Multi-channel outreach performance — Email & LinkedIn</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Filter size={13} />Filter
              </button>
              <button onClick={() => setShowNewCampaign(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 4px 16px rgba(0,123,255,0.3)' }}>
                <Plus size={14} />New Campaign
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, icon: Icon, color, bg, change }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="p-4 rounded-2xl card-hover" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: '#b0c8e0' }}>{label}</div>
                <div className="text-xs mt-1 text-green-400">{change}</div>
              </motion.div>
            ))}
          </div>

          {/* Main: Campaign List + Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Campaign List */}
            <div className="lg:col-span-2 space-y-2">
              <div className="text-xs font-semibold mb-2 px-1" style={{ color: '#4a6580' }}>ALL CAMPAIGNS ({CAMPAIGNS.length})</div>
              {CAMPAIGNS.map((camp) => (
                <div key={camp.id} onClick={() => setSelectedCampaign(camp)}
                  className="p-4 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: selectedCampaign.id === camp.id ? 'rgba(0,123,255,0.07)' : 'rgba(10,22,40,0.8)',
                    border: `1px solid ${selectedCampaign.id === camp.id ? 'rgba(0,123,255,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">{camp.name}</div>
                      <div className="text-xs mt-0.5 leading-relaxed line-clamp-1" style={{ color: '#4a6580' }}>{camp.description}</div>
                    </div>
                    <StatusBadge status={camp.status} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {camp.channels.map(ch => <ChannelIcon key={ch} channel={ch} />)}
                    <span className="text-xs ml-auto" style={{ color: '#4a6580' }}>{camp.leads} leads</span>
                  </div>
                  {camp.sent > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Sent', value: camp.sent, color: '#7a9bb5' },
                        { label: 'Opened', value: camp.opened, color: '#007BFF' },
                        { label: 'Clicked', value: camp.clicked, color: '#6C63FF' },
                        { label: 'Replied', value: camp.replied, color: '#00D4A1' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="text-center">
                          <div className="text-sm font-black" style={{ color }}>{value}</div>
                          <div className="text-xs" style={{ color: '#4a6580' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Campaign Detail */}
            <div className="lg:col-span-3 space-y-4">
              {/* Campaign Header */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white">{selectedCampaign.name}</h3>
                    <p className="text-sm mt-1" style={{ color: '#7a9bb5' }}>{selectedCampaign.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedCampaign.status === 'active' ? (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80" style={{ background: 'rgba(255,165,2,0.12)', color: '#FFA502', border: '1px solid rgba(255,165,2,0.2)' }}>
                        <Pause size={11} />Pause
                      </button>
                    ) : selectedCampaign.status === 'paused' ? (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80" style={{ background: 'rgba(0,212,164,0.12)', color: '#00D4A1', border: '1px solid rgba(0,212,164,0.2)' }}>
                        <Play size={11} />Resume
                      </button>
                    ) : (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80" style={{ background: 'rgba(0,212,164,0.12)', color: '#00D4A1', border: '1px solid rgba(0,212,164,0.2)' }}>
                        <Play size={11} />Launch
                      </button>
                    )}
                  </div>
                </div>

                {/* Funnel Stats */}
                {selectedCampaign.sent > 0 ? (
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { label: 'Total Leads', value: selectedCampaign.leads, pct: null, color: '#7a9bb5', icon: Users },
                      { label: 'Sent', value: selectedCampaign.sent, pct: `${Math.round((selectedCampaign.sent / selectedCampaign.leads) * 100)}%`, color: '#007BFF', icon: Send },
                      { label: 'Opened', value: selectedCampaign.opened, pct: `${Math.round((selectedCampaign.opened / selectedCampaign.sent) * 100)}%`, color: '#6C63FF', icon: Eye },
                      { label: 'Clicked', value: selectedCampaign.clicked, pct: `${Math.round((selectedCampaign.clicked / selectedCampaign.sent) * 100)}%`, color: '#FFA502', icon: TrendingUp },
                      { label: 'Replied', value: selectedCampaign.replied, pct: `${Math.round((selectedCampaign.replied / selectedCampaign.sent) * 100)}%`, color: '#00D4A1', icon: MessageSquare },
                    ].map(({ label, value, pct, color, icon: Icon }) => (
                      <div key={label} className="p-3 rounded-xl text-center" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
                        <Icon size={13} style={{ color }} className="mx-auto mb-1.5" />
                        <div className="text-xl font-black" style={{ color }}>{value}</div>
                        <div className="text-xs font-medium text-white mt-0.5">{label}</div>
                        {pct && <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{pct}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Megaphone size={32} style={{ color: '#4a6580' }} className="mx-auto mb-2" />
                    <div className="text-sm font-medium text-white">Campaign not launched yet</div>
                    <div className="text-xs mt-1" style={{ color: '#4a6580' }}>{selectedCampaign.leads} leads ready • {selectedCampaign.sequence.length}-step sequence</div>
                  </div>
                )}
              </div>

              {/* Performance Chart */}
              {selectedCampaign.sent > 0 && (
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm text-white">Weekly Performance</h4>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#007BFF]" />Sent</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6C63FF]" />Opens</span>
                      <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4A1]" />Replies</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={WEEKLY_PERF} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#4a6580', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sent" name="Sent" fill="#007BFF" radius={[3, 3, 0, 0]} opacity={0.8} />
                      <Bar dataKey="opens" name="Opens" fill="#6C63FF" radius={[3, 3, 0, 0]} opacity={0.8} />
                      <Bar dataKey="replies" name="Replies" fill="#00D4A1" radius={[3, 3, 0, 0]} opacity={0.8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Sequence Steps */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={14} style={{ color: '#6C63FF' }} />
                  <h4 className="font-bold text-sm text-white">Outreach Sequence</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: 'rgba(108,99,255,0.1)', color: '#6C63FF' }}>{selectedCampaign.sequence.length} steps</span>
                </div>
                <div className="space-y-2">
                  {selectedCampaign.sequence.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: i < 2 ? 'linear-gradient(135deg, #007BFF, #6C63FF)' : 'rgba(255,255,255,0.06)' }}>{i + 1}</div>
                      {i < selectedCampaign.sequence.length - 1 && (
                        <div className="absolute ml-3 mt-6 w-px h-5" style={{ background: 'rgba(255,255,255,0.08)', position: 'absolute', left: 'unset' }} />
                      )}
                      <div className="flex-1 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <span className="text-xs font-medium text-white">{step}</span>
                      </div>
                      {i < 2 && selectedCampaign.status === 'active' && (
                        <CheckCircle2 size={14} style={{ color: '#00D4A1' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bounce / Reply rate metrics */}
              {selectedCampaign.sent > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={13} style={{ color: '#ff4757' }} />
                      <span className="font-bold text-sm text-white">Bounced</span>
                    </div>
                    <div className="text-2xl font-black" style={{ color: '#ff4757' }}>{selectedCampaign.bounced}</div>
                    <div className="text-xs mt-1" style={{ color: '#7a9bb5' }}>
                      {Math.round((selectedCampaign.bounced / selectedCampaign.sent) * 100)}% bounce rate • Hard bounces removed from list
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,212,164,0.06)', border: '1px solid rgba(0,212,164,0.15)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={13} style={{ color: '#00D4A1' }} />
                      <span className="font-bold text-sm text-white">Reply Rate</span>
                    </div>
                    <div className="text-2xl font-black" style={{ color: '#00D4A1' }}>{selectedCampaign.replyRate}%</div>
                    <div className="text-xs mt-1" style={{ color: '#7a9bb5' }}>
                      {selectedCampaign.replied} replies • Industry avg: 5.1%
                      <span className="ml-1 text-green-400">(+{(selectedCampaign.replyRate - 5.1).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Replies */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,164,0.12)' }}>
                  <MessageSquare size={14} style={{ color: '#00D4A1' }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Recent Replies</h3>
                  <p className="text-xs" style={{ color: '#4a6580' }}>Leads who responded to your outreach</p>
                </div>
              </div>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                View All
              </button>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {[
                { company: 'NexaTech Solutions', contact: 'Marcus Reed', message: 'Thanks for reaching out! Yes we are actively looking for a digital agency partner. Would love to connect this week.', time: '2 hours ago', channel: 'email', sentiment: 'positive' },
                { company: 'Meridian Healthcare', contact: 'Kevin Zhang', message: "Interesting insights about our website. Can you share the full analysis? We've actually been discussing this internally.", time: '5 hours ago', channel: 'linkedin', sentiment: 'positive' },
                { company: 'GreenLeaf Organics', contact: 'Emma Walsh', message: "Great timing! We just closed our seed round and need to rebuild our platform. Let's schedule a call.", time: '1 day ago', channel: 'email', sentiment: 'positive' },
                { company: 'Atlas Wealth Management', contact: 'Nina Patel', message: "Not the right time for us currently, but keep us in mind for Q3.", time: '2 days ago', channel: 'email', sentiment: 'neutral' },
              ].map(({ company, contact, message, time, channel, sentiment }) => (
                <div key={company} className="p-4 flex items-start gap-4 transition-all hover:bg-white/5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.25), rgba(108,99,255,0.25))' }}>
                    {company.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-white">{company}</span>
                      <span className="text-xs" style={{ color: '#4a6580' }}>via {contact}</span>
                      <ChannelIcon channel={channel} />
                      <span className="ml-auto text-xs flex-shrink-0" style={{ color: '#4a6580' }}>{time}</span>
                    </div>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#7a9bb5' }}>{message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                      background: sentiment === 'positive' ? 'rgba(0,212,164,0.1)' : 'rgba(255,165,2,0.1)',
                      color: sentiment === 'positive' ? '#00D4A1' : '#FFA502'
                    }}>
                      {sentiment === 'positive' ? '✓ Interested' : '→ Nurture'}
                    </span>
                    <button className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-90" style={{ background: 'rgba(0,123,255,0.12)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* New Campaign Modal */}
      <AnimatePresence>
        {showNewCampaign && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowNewCampaign(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg p-6 rounded-2xl"
              style={{ background: 'rgba(10,22,40,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}>
              <h3 className="font-bold text-lg text-white mb-2">Create New Campaign</h3>
              <p className="text-sm mb-5" style={{ color: '#7a9bb5' }}>Set up a multi-channel outreach sequence for your target leads.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-white mb-1.5 block">Campaign Name</label>
                  <input className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-blue-500" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="e.g. Series B Tech Companies" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white mb-2 block">Channel</label>
                  <div className="flex gap-2">
                    {[{ key: 'email', icon: Mail, label: 'Email', color: '#007BFF' }, { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' }].map(({ key, icon: Icon, label, color }) => (
                      <button key={key} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium flex-1 transition-all"
                        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                        <Icon size={14} />{label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-white mb-1.5 block">Target Leads</label>
                  <select className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#7a9bb5' }}>
                    <option>All Hot Leads (347)</option>
                    <option>Technology Industry (1,240)</option>
                    <option>Post-Funding Leads (156)</option>
                    <option>Healthcare Sector (623)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowNewCampaign(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Cancel
                </button>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                  Create Campaign
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
