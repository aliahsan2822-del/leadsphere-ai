'use client'

import Sidebar from '@/components/Sidebar'
import LeadCard from '@/components/LeadCard'
import { MOCK_LEADS } from '@/lib/mockData'

export default function SavedPage() {
  const saved = MOCK_LEADS.filter(l => l.scoreCategory === 'hot').slice(0, 4)
  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-xl font-bold text-white mb-1">Saved Leads</h1>
        <p className="text-xs mb-6" style={{ color: '#4a6580' }}>{saved.length} saved leads</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {saved.map(lead => <LeadCard key={lead.id} lead={lead} />)}
        </div>
      </main>
    </div>
  )
}
