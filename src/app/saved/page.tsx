'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Search, Trash2 } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import LeadCard from '@/components/LeadCard'
import { MOCK_LEADS } from '@/lib/mockData'

const STORAGE_KEY = 'leadsphere_saved_leads'

function getSavedIds(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSavedIds(getSavedIds())
    setMounted(true)
  }, [])

  const refresh = () => setSavedIds(getSavedIds())

  const clearAll = () => {
    localStorage.setItem(STORAGE_KEY, '[]')
    setSavedIds([])
  }

  const savedLeads = MOCK_LEADS.filter(l => savedIds.includes(l.id))

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Saved Leads</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>
                {mounted ? `${savedLeads.length} saved lead${savedLeads.length !== 1 ? 's' : ''}` : 'Loading...'}
              </p>
            </div>
            {savedLeads.length > 0 && (
              <button onClick={clearAll}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-red-500/10"
                style={{ color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)' }}>
                <Trash2 size={13} /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {!mounted ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
            </div>
          ) : savedLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(0,123,255,0.08)', border: '1px solid rgba(0,123,255,0.15)' }}>
                <Bookmark size={28} style={{ color: '#4a6580' }} />
              </div>
              <div className="text-center">
                <div className="font-bold text-white text-lg mb-1">No saved leads yet</div>
                <div className="text-sm" style={{ color: '#4a6580' }}>
                  Click the <Bookmark size={13} className="inline mx-1" style={{ color: '#007BFF' }} /> bookmark icon on any lead card to save it here
                </div>
              </div>
              <a href="/leads"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                <Search size={14} /> Browse Leads
              </a>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {savedLeads.map((lead, i) => (
                <motion.div key={lead.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <LeadCard lead={lead} view="grid" onSaveChange={refresh} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
