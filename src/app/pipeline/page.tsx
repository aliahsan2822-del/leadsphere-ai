'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Kanban, DollarSign, TrendingUp, Users, Plus, ChevronRight,
  Flame, Thermometer, Star, MoreHorizontal, Calendar, Target,
  ArrowUpRight, Filter, RefreshCw
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const PIPELINE_STAGES = [
  { id: 'discovery', label: 'Discovery', color: '#007BFF', bg: 'rgba(0,123,255,0.1)' },
  { id: 'qualified', label: 'Qualified', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
  { id: 'proposal', label: 'Proposal Sent', color: '#FFA502', bg: 'rgba(255,165,2,0.1)' },
  { id: 'negotiation', label: 'Negotiation', color: '#FF6B9D', bg: 'rgba(255,107,157,0.1)' },
  { id: 'won', label: 'Closed Won', color: '#00D4A1', bg: 'rgba(0,212,164,0.1)' },
  { id: 'lost', label: 'Closed Lost', color: '#4a6580', bg: 'rgba(74,101,128,0.1)' },
]

const DEALS = [
  { id: 1, company: 'NexaTech Solutions', stage: 'negotiation', value: 180000, score: 94, service: 'Website + Mobile', contact: 'Marcus Reed', daysInStage: 3, probability: 82 },
  { id: 2, company: 'Harborview Hospitality', stage: 'proposal', value: 95000, score: 88, service: 'Website Redesign', contact: 'Victoria Harmon', daysInStage: 7, probability: 65 },
  { id: 3, company: 'GreenLeaf Organics', stage: 'qualified', value: 75000, score: 82, service: 'E-Commerce + App', contact: 'Emma Walsh', daysInStage: 4, probability: 55 },
  { id: 4, company: 'PrimeFreight Logistics', stage: 'proposal', value: 220000, score: 76, service: 'ERP + Website', contact: 'Robert Martinez', daysInStage: 12, probability: 48 },
  { id: 5, company: 'Meridian Healthcare', stage: 'qualified', value: 145000, score: 85, service: 'App + Portal', contact: 'Dr. Patricia Cole', daysInStage: 6, probability: 60 },
  { id: 6, company: 'Atlas Wealth Mgmt', stage: 'discovery', value: 65000, score: 71, service: 'Website + Branding', contact: 'Andrew Blackwell', daysInStage: 2, probability: 35 },
  { id: 7, company: 'SwiftBuild Construction', stage: 'discovery', value: 190000, score: 66, service: 'ERP System', contact: 'Greg Hamilton', daysInStage: 5, probability: 30 },
  { id: 8, company: 'Luminary EdTech', stage: 'negotiation', value: 110000, score: 89, service: 'Mobile App', contact: 'Priya Sharma', daysInStage: 9, probability: 75 },
  { id: 9, company: 'TechFlow Retail', stage: 'won', value: 85000, score: 91, service: 'E-Commerce', contact: 'Sarah Kim', daysInStage: 0, probability: 100 },
  { id: 10, company: 'BrightPath Education', stage: 'won', value: 120000, score: 87, service: 'LMS Platform', contact: 'James Liu', daysInStage: 0, probability: 100 },
  { id: 11, company: 'CityMart Group', stage: 'lost', value: 55000, score: 58, service: 'Digital Marketing', contact: 'Maria Santos', daysInStage: 0, probability: 0 },
  { id: 12, company: 'Alpine Finance', stage: 'discovery', value: 78000, score: 73, service: 'Web App', contact: 'Thomas Berg', daysInStage: 1, probability: 28 },
]

function scoreIcon(score: number) {
  if (score >= 80) return <Flame size={11} style={{ color: '#ff4757' }} />
  if (score >= 60) return <Thermometer size={11} style={{ color: '#ffa502' }} />
  return <Star size={11} style={{ color: '#1e90ff' }} />
}

function DealCard({ deal }: { deal: typeof DEALS[0] }) {
  const scoreColor = deal.score >= 80 ? '#ff4757' : deal.score >= 60 ? '#ffa502' : '#1e90ff'
  return (
    <div className="p-3 rounded-xl mb-2 cursor-grab active:cursor-grabbing transition-all hover:translate-y-[-2px]"
      style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-white text-xs leading-tight flex-1 pr-2">{deal.company}</span>
        <MoreHorizontal size={13} style={{ color: '#4a6580', flexShrink: 0 }} />
      </div>
      <div className="text-xs mb-2 px-2 py-1 rounded-lg inline-flex" style={{ background: 'rgba(0,123,255,0.08)', color: '#007BFF' }}>
        {deal.service}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-bold text-white">${(deal.value / 1000).toFixed(0)}K</span>
        <div className="flex items-center gap-1">
          {scoreIcon(deal.score)}
          <span className="text-xs font-bold" style={{ color: scoreColor }}>{deal.score}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-1 text-xs" style={{ color: '#4a6580' }}>
          <Users size={10} />
          <span className="truncate max-w-[80px]">{deal.contact.split(' ')[0]}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div className="h-1 w-12 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: deal.probability >= 70 ? '#00D4A1' : deal.probability >= 40 ? '#ffa502' : '#4a6580' }} />
          </div>
          <span style={{ color: '#4a6580' }}>{deal.probability}%</span>
        </div>
      </div>
      {deal.daysInStage > 0 && (
        <div className="mt-1.5 text-xs flex items-center gap-1" style={{ color: deal.daysInStage > 10 ? '#ff4757' : '#4a6580' }}>
          <Calendar size={9} />
          {deal.daysInStage}d in stage
        </div>
      )}
    </div>
  )
}

export default function PipelinePage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban')

  const totalPipeline = DEALS.filter(d => d.stage !== 'won' && d.stage !== 'lost').reduce((s, d) => s + d.value, 0)
  const totalWon = DEALS.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0)
  const weightedValue = DEALS.filter(d => d.stage !== 'lost').reduce((s, d) => s + d.value * d.probability / 100, 0)

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Opportunity Pipeline</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>CRM workspace — {DEALS.length} active deals</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/5 transition-all" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Filter size={13} /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/5 transition-all" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
                <RefreshCw size={13} /> Sync CRM
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Plus size={13} /> Add Deal
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Pipeline Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Pipeline', value: `$${(totalPipeline / 1000).toFixed(0)}K`, sub: `${DEALS.filter(d => d.stage !== 'won' && d.stage !== 'lost').length} active deals`, icon: Target, color: '#007BFF' },
              { label: 'Weighted Value', value: `$${(weightedValue / 1000).toFixed(0)}K`, sub: 'probability-adjusted', icon: TrendingUp, color: '#6C63FF' },
              { label: 'Closed Won', value: `$${(totalWon / 1000).toFixed(0)}K`, sub: `${DEALS.filter(d => d.stage === 'won').length} deals closed`, icon: ArrowUpRight, color: '#00D4A1' },
              { label: 'Win Rate', value: '62%', sub: 'last 90 days', icon: DollarSign, color: '#FFA502' },
            ].map(({ label, value, sub, icon: Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                </div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs font-medium text-white mt-0.5">{label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: `${PIPELINE_STAGES.length * 280}px` }}>
              {PIPELINE_STAGES.map(stage => {
                const stageDeals = DEALS.filter(d => d.stage === stage.id)
                const stageValue = stageDeals.reduce((s, d) => s + d.value, 0)
                return (
                  <div key={stage.id} className="flex-shrink-0" style={{ width: 268 }}>
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                        <span className="font-semibold text-sm text-white">{stage.label}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: stage.bg, color: stage.color }}>{stageDeals.length}</span>
                      </div>
                      <span className="text-xs font-semibold" style={{ color: '#4a6580' }}>
                        ${(stageValue / 1000).toFixed(0)}K
                      </span>
                    </div>

                    {/* Column body */}
                    <div className="rounded-2xl p-2 min-h-[400px]" style={{ background: 'rgba(10,22,40,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {stageDeals.map(deal => <DealCard key={deal.id} deal={deal} />)}

                      {stage.id !== 'won' && stage.id !== 'lost' && (
                        <button className="w-full py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-white/5 flex items-center justify-center gap-1.5" style={{ color: '#4a6580', border: '1px dashed rgba(255,255,255,0.1)', marginTop: 4 }}>
                          <Plus size={12} /> Add deal
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="font-bold text-white text-sm mb-4">Pipeline Conversion Funnel</h3>
            <div className="space-y-3">
              {PIPELINE_STAGES.filter(s => s.id !== 'lost').map((stage, i) => {
                const count = DEALS.filter(d => d.stage === stage.id).length
                const maxCount = Math.max(...PIPELINE_STAGES.map(s => DEALS.filter(d => d.stage === s.id).length))
                const pct = maxCount > 0 ? (count / DEALS.length) * 100 : 0
                return (
                  <div key={stage.id} className="flex items-center gap-4">
                    <div className="w-28 text-xs font-medium text-right" style={{ color: '#7a9bb5' }}>{stage.label}</div>
                    <div className="flex-1 h-7 rounded-lg overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-lg flex items-center px-3"
                        style={{ background: `linear-gradient(90deg, ${stage.color}40, ${stage.color}80)`, minWidth: count > 0 ? 40 : 0 }}>
                        <span className="text-xs font-bold text-white">{count}</span>
                      </motion.div>
                    </div>
                    <div className="w-16 text-xs font-semibold text-right" style={{ color: stage.color }}>
                      ${(DEALS.filter(d => d.stage === stage.id).reduce((s, d) => s + d.value, 0) / 1000).toFixed(0)}K
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
