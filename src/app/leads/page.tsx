'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Grid, List, Zap, ChevronDown, X, SlidersHorizontal, TrendingUp, RefreshCw, Download } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import LeadCard from '@/components/LeadCard'
import { MOCK_LEADS } from '@/lib/mockData'
import { Lead } from '@/lib/types'

const NL_EXAMPLES = [
  'Find healthcare companies in USA without mobile apps',
  'Logistics companies with outdated websites that need ERP',
  'Startups that raised funding in last 30 days',
  'E-commerce stores with low SEO scores',
  'Companies hiring engineers that may need IT outsourcing',
]

const INDUSTRIES = ['All', 'Technology', 'Healthcare', 'E-Commerce', 'Finance', 'Logistics', 'Hospitality', 'Construction', 'Education']
const COUNTRIES = ['All Countries', 'United States', 'Canada', 'United Kingdom', 'UAE', 'Singapore', 'Australia']
const SCORE_CATS = ['All', 'Hot', 'Warm', 'Cold']
const SORT_OPTIONS = ['Score: High to Low', 'Score: Low to High', 'Recently Added', 'Most Intent Signals']

export default function LeadsPage() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [industry, setIndustry] = useState('All')
  const [country, setCountry] = useState('All Countries')
  const [scoreFilter, setScoreFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Score: High to Low')
  const [showFilters, setShowFilters] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [activeNL, setActiveNL] = useState<string | null>(null)

  const filtered = useMemo<Lead[]>(() => {
    let leads = [...MOCK_LEADS]

    if (industry !== 'All') leads = leads.filter(l => l.industry === industry)
    if (country !== 'All Countries') leads = leads.filter(l => l.country === country)
    if (scoreFilter !== 'All') leads = leads.filter(l => l.scoreCategory === scoreFilter.toLowerCase())
    if (query.trim()) {
      const q = query.toLowerCase()
      leads = leads.filter(l =>
        l.company.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'Score: High to Low': leads.sort((a, b) => b.score - a.score); break
      case 'Score: Low to High': leads.sort((a, b) => a.score - b.score); break
      case 'Most Intent Signals': leads.sort((a, b) => b.intentSignals.length - a.intentSignals.length); break
      default: leads.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    }

    return leads
  }, [query, industry, country, scoreFilter, sortBy])

  const handleNLSearch = (example: string) => {
    setActiveNL(example)
    setIsSearching(true)
    setTimeout(() => {
      setQuery(example.replace(/^Find /i, ''))
      setIsSearching(false)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-white">Lead Intelligence Hub</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>
                {filtered.length} leads found · Showing {Math.min(filtered.length, 50)} results
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Download size={13} /> Export
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.06)' }}>
                <RefreshCw size={13} /> Refresh
              </button>
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                {(['grid', 'list'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} className="p-2 transition-all"
                    style={{ background: view === v ? 'rgba(0,123,255,0.15)' : 'transparent', color: view === v ? '#007BFF' : '#4a6580' }}>
                    {v === 'grid' ? <Grid size={14} /> : <List size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Search Bar */}
          <div className="relative">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Zap size={12} className="text-white" />
              </div>
              <input
                value={isSearching ? 'AI is analyzing...' : query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask AI: 'Find healthcare companies in UAE without mobile apps with 100+ employees...'"
                className="flex-1 bg-transparent text-sm text-white placeholder-[#4a6580] outline-none"
              />
              {query && (
                <button onClick={() => { setQuery(''); setActiveNL(null) }} className="p-1 rounded-lg transition-all hover:bg-white/10">
                  <X size={13} style={{ color: '#4a6580' }} />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${showFilters ? 'bg-[rgba(0,123,255,0.15)] text-[#007BFF]' : 'hover:bg-white/5 text-[#7a9bb5]'}`}
                style={{ border: `1px solid ${showFilters ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
                <SlidersHorizontal size={12} />
                Filters
                {(industry !== 'All' || country !== 'All Countries' || scoreFilter !== 'All') && (
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs" style={{ background: '#007BFF', color: 'white', fontSize: '9px' }}>
                    {[industry !== 'All', country !== 'All Countries', scoreFilter !== 'All'].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>

            {/* NL Examples */}
            {!query && (
              <div className="flex flex-wrap gap-2 mt-3">
                {NL_EXAMPLES.slice(0, 3).map(ex => (
                  <button key={ex} onClick={() => handleNLSearch(ex)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-all hover:border-[#007BFF]/50 ${activeNL === ex ? 'text-[#007BFF] border-[#007BFF]/50' : 'text-[#4a6580]'}`}
                    style={{ border: `1px solid ${activeNL === ex ? 'rgba(0,123,255,0.5)' : 'rgba(255,255,255,0.07)'}`, background: activeNL === ex ? 'rgba(0,123,255,0.08)' : 'transparent' }}>
                    {ex}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-6"
              style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Industry', value: industry, setter: setIndustry, options: INDUSTRIES },
                  { label: 'Country', value: country, setter: setCountry, options: COUNTRIES },
                  { label: 'Lead Score', value: scoreFilter, setter: setScoreFilter, options: SCORE_CATS },
                  { label: 'Sort By', value: sortBy, setter: setSortBy, options: SORT_OPTIONS },
                ].map(({ label, value, setter, options }) => (
                  <div key={label}>
                    <label className="text-xs font-semibold mb-2 block" style={{ color: '#4a6580', letterSpacing: '0.6px' }}>{label.toUpperCase()}</label>
                    <div className="relative">
                      <select
                        value={value}
                        onChange={e => setter(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm text-white appearance-none outline-none cursor-pointer"
                        style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {options.map(o => <option key={o} value={o} style={{ background: '#0a1628' }}>{o}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#4a6580' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score Legend */}
        <div className="flex items-center gap-4 px-6 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          {[
            { label: 'Hot Leads', count: MOCK_LEADS.filter(l => l.scoreCategory === 'hot').length, color: '#ff4757' },
            { label: 'Warm Leads', count: MOCK_LEADS.filter(l => l.scoreCategory === 'warm').length, color: '#ffa502' },
            { label: 'Cold Leads', count: MOCK_LEADS.filter(l => l.scoreCategory === 'cold').length, color: '#1e90ff' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span style={{ color: '#7a9bb5' }}>{label}:</span>
              <span className="font-bold text-white">{count}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs" style={{ color: '#4a6580' }}>
            <TrendingUp size={12} />
            <span>Sorted by: {sortBy}</span>
          </div>
        </div>

        {/* Leads Content */}
        <div className="p-6">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
              <div className="text-white font-semibold">AI is analyzing 4,872 companies...</div>
              <div className="text-sm" style={{ color: '#4a6580' }}>Matching against your natural language query</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Search size={40} style={{ color: '#4a6580' }} />
              <div className="text-white font-semibold">No leads found</div>
              <div className="text-sm" style={{ color: '#4a6580' }}>Try adjusting your filters or search query</div>
            </div>
          ) : view === 'grid' ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.slice(0, 50).map((lead, i) => (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <LeadCard lead={lead} view="grid" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="space-y-2">
              {filtered.slice(0, 50).map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <LeadCard lead={lead} view="list" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
