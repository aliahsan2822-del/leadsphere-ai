'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lead } from '@/lib/types'
import {
  Globe, Users, TrendingUp, Zap, ChevronRight, MapPin,
  DollarSign, Building2, ExternalLink, Star, Flame, Thermometer, Bookmark
} from 'lucide-react'

interface Props {
  lead: Lead
  view?: 'grid' | 'list'
  onSaveChange?: () => void
}

const SCORE_COLORS: Record<string, { bg: string; text: string; icon: React.ElementType; label: string }> = {
  hot: { bg: 'rgba(255,71,87,0.1)', text: '#ff4757', icon: Flame, label: 'Hot Lead' },
  warm: { bg: 'rgba(255,165,2,0.1)', text: '#ffa502', icon: Thermometer, label: 'Warm Lead' },
  cold: { bg: 'rgba(30,144,255,0.1)', text: '#1e90ff', icon: Star, label: 'Cold Lead' },
}

const STORAGE_KEY = 'leadsphere_saved_leads'

function getSavedIds(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function ScoreRing({ score, size = 52 }: { score: number; size?: number }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const progress = (score / 100) * c
  const color = score >= 80 ? '#ff4757' : score >= 60 ? '#ffa502' : '#1e90ff'
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${progress} ${c - progress}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-bold" style={{ color }}>{score}</span>
    </div>
  )
}

function OpBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: '#7a9bb5' }}>{label}</span>
        <span className="text-xs font-semibold" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
    </div>
  )
}

export default function LeadCard({ lead, view = 'grid', onSaveChange }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const meta = SCORE_COLORS[lead.scoreCategory]
  const ScoreIcon = meta.icon

  // Read saved state from localStorage on mount
  useEffect(() => {
    setIsSaved(getSavedIds().includes(lead.id))
  }, [lead.id])

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const saved = getSavedIds()
    const next = saved.includes(lead.id) ? saved.filter(id => id !== lead.id) : [...saved, lead.id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setIsSaved(!isSaved)
    onSaveChange?.()
  }

  if (view === 'list') {
    return (
      <div className="card-hover flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <ScoreRing score={lead.score} size={44} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-sm text-white truncate">{lead.company}</span>
            <span className="badge" style={{ background: meta.bg, color: meta.text, border: `1px solid ${meta.text}33`, fontSize: '9px' }}>
              <ScoreIcon size={8} className="mr-1" />{meta.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#4a6580' }}>
            <span className="flex items-center gap-1"><MapPin size={10} />{lead.location}</span>
            <span className="flex items-center gap-1"><Building2 size={10} />{lead.industry}</span>
            <span className="flex items-center gap-1"><Users size={10} />{lead.employees}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs">
          {[
            { k: 'Web', s: lead.opportunities.website.score },
            { k: 'App', s: lead.opportunities.mobile.score },
            { k: 'ERP', s: lead.opportunities.erp.score },
            { k: 'Mktg', s: lead.opportunities.marketing.score },
          ].map(({ k, s }) => (
            <div key={k} className="text-center">
              <div className="font-bold" style={{ color: s >= 80 ? '#ff4757' : s >= 60 ? '#ffa502' : '#1e90ff' }}>{s}</div>
              <div style={{ color: '#4a6580' }}>{k}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {lead.intentSignals.slice(0, 2).map((sig, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: sig.strength === 'strong' ? '#ff4757' : sig.strength === 'medium' ? '#ffa502' : '#4a6580' }} title={sig.description} />
          ))}
          <button onClick={toggleSave} title={isSaved ? 'Remove from saved' : 'Save lead'}
            className="p-1.5 rounded-lg transition-all hover:bg-white/10">
            <Bookmark size={14} fill={isSaved ? '#007BFF' : 'none'} style={{ color: isSaved ? '#007BFF' : '#4a6580' }} />
          </button>
          <Link href={`/intelligence?id=${lead.id}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90"
            style={{ background: 'rgba(0,123,255,0.15)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.25)' }}>
            Analyze <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header */}
      <div className="p-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
              {lead.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-white leading-tight truncate">{lead.company}</h3>
              <div className="flex items-center gap-1 mt-0.5 text-xs" style={{ color: '#4a6580' }}>
                <Globe size={10} />
                <span className="truncate max-w-[120px]">{lead.website}</span>
                <ExternalLink size={9} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Save/bookmark button */}
            <button onClick={toggleSave} title={isSaved ? 'Saved — click to unsave' : 'Save lead'}
              className="p-1.5 rounded-lg transition-all hover:bg-white/10"
              aria-pressed={isSaved}>
              <Bookmark size={15} fill={isSaved ? '#007BFF' : 'none'} style={{ color: isSaved ? '#007BFF' : '#4a6580' }} />
            </button>
            <ScoreRing score={lead.score} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge" style={{ background: meta.bg, color: meta.text, border: `1px solid ${meta.text}33` }}>
            <ScoreIcon size={9} className="mr-1" />{meta.label}
          </span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)', fontSize: '10px' }}>
            {lead.industry}
          </span>
          {lead.fundingStage && (
            <span className="badge" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1', border: '1px solid rgba(0,212,164,0.2)', fontSize: '10px' }}>
              {lead.fundingStage}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5" style={{ color: '#7a9bb5' }}>
            <MapPin size={11} style={{ color: '#4a6580' }} />{lead.location}
          </div>
          <div className="flex items-center gap-1.5" style={{ color: '#7a9bb5' }}>
            <Users size={11} style={{ color: '#4a6580' }} />{lead.employees}
          </div>
          <div className="flex items-center gap-1.5" style={{ color: '#7a9bb5' }}>
            <DollarSign size={11} style={{ color: '#4a6580' }} />{lead.revenue}
          </div>
          <div className="flex items-center gap-1.5" style={{ color: '#7a9bb5' }}>
            <TrendingUp size={11} style={{ color: '#4a6580' }} />{lead.intentSignals.length} signals
          </div>
        </div>
      </div>

      {/* Opportunity Scores */}
      <div className="p-5">
        <div className="text-xs font-semibold mb-3" style={{ color: '#4a6580', letterSpacing: '0.6px' }}>OPPORTUNITY SCORES</div>
        <div className="space-y-2">
          <OpBar label="Website Redesign" score={lead.opportunities.website.score} color={lead.opportunities.website.score >= 80 ? '#ff4757' : '#ffa502'} />
          <OpBar label="Mobile App" score={lead.opportunities.mobile.score} color={lead.opportunities.mobile.score >= 80 ? '#ff4757' : '#ffa502'} />
          <OpBar label="ERP System" score={lead.opportunities.erp.score} color={lead.opportunities.erp.score >= 80 ? '#ff4757' : '#007BFF'} />
          <OpBar label="Digital Marketing" score={lead.opportunities.marketing.score} color={lead.opportunities.marketing.score >= 80 ? '#ff4757' : '#ffa502'} />
        </div>
      </div>

      {/* Intent Signals */}
      {lead.intentSignals.length > 0 && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={11} style={{ color: '#ffa502' }} />
            <span className="text-xs font-semibold" style={{ color: '#4a6580', letterSpacing: '0.6px' }}>INTENT SIGNALS</span>
          </div>
          {lead.intentSignals.slice(0, 2).map((sig, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: sig.strength === 'strong' ? '#ff4757' : sig.strength === 'medium' ? '#ffa502' : '#4a6580' }} />
              <span className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>{sig.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* AI Insight (expandable) */}
      {expanded && (
        <div className="px-5 pb-4">
          <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.15)', color: '#7a9bb5' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Zap size={9} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-white">AI Insight</span>
            </div>
            {lead.aiInsight}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => setExpanded(!expanded)}
          className="flex-1 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.07)' }}>
          {expanded ? 'Hide Insight' : 'AI Insight'}
        </button>
        <Link href={`/intelligence?id=${lead.id}`}
          className="flex-1 py-2 rounded-lg text-xs font-medium text-center transition-all hover:opacity-90"
          style={{ background: 'rgba(0,123,255,0.15)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.25)' }}>
          Full Analysis
        </Link>
      </div>
    </div>
  )
}
