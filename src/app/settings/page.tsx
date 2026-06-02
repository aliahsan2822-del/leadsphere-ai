'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings, Plug, Shield, Users, CheckCircle2, XCircle, Zap,
  Key, Lock, Eye, EyeOff, Globe, AlertTriangle, RefreshCw,
  Plus, Trash2, Edit3, ChevronRight, Check
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const INTEGRATIONS = [
  { name: 'LinkedIn', desc: 'Company data, decision-maker profiles, hiring signals', status: 'connected', icon: '🔗', color: '#0A66C2', category: 'Data Source' },
  { name: 'Apollo.io', desc: 'B2B contact database, email verification, enrichment', status: 'connected', icon: '🚀', color: '#6C63FF', category: 'Data Source' },
  { name: 'HubSpot', desc: 'CRM sync, contact management, deal pipeline', status: 'connected', icon: '🧡', color: '#FF7A59', category: 'CRM' },
  { name: 'Hunter.io', desc: 'Email finder, domain search, email verification', status: 'connected', icon: '🎯', color: '#FFA502', category: 'Email' },
  { name: 'Crunchbase', desc: 'Funding data, investor intelligence, startup tracking', status: 'disconnected', icon: '💰', color: '#007BFF', category: 'Intelligence' },
  { name: 'Clearbit', desc: 'Company enrichment, website visitor intelligence', status: 'disconnected', icon: '🔍', color: '#00D4FF', category: 'Enrichment' },
  { name: 'ZoomInfo', desc: 'Enterprise contact database, intent data', status: 'disconnected', icon: '📊', color: '#00D4A1', category: 'Data Source' },
  { name: 'Salesforce', desc: 'CRM integration, pipeline sync, contact import', status: 'disconnected', icon: '☁️', color: '#00A1E0', category: 'CRM' },
  { name: 'SimilarWeb', desc: 'Website traffic, competitor analysis, market share', status: 'disconnected', icon: '🌐', color: '#FF6B9D', category: 'Intelligence' },
  { name: 'BuiltWith', desc: 'Technology stack detection, platform intelligence', status: 'connected', icon: '⚙️', color: '#4a6580', category: 'Intelligence' },
  { name: 'Google Maps', desc: 'Business locations, local presence, area intelligence', status: 'connected', icon: '📍', color: '#34A853', category: 'Location' },
  { name: 'Slack', desc: 'Team notifications, lead alerts, pipeline updates', status: 'disconnected', icon: '💬', color: '#4A154B', category: 'Notifications' },
]

const TEAM_MEMBERS = [
  { name: 'Ahmed Al-Rashid', email: 'ahmed@fixelsmedia.com', role: 'Admin', avatar: 'AA', lastActive: '2 min ago' },
  { name: 'Sarah Mitchell', email: 'sarah@fixelsmedia.com', role: 'Sales Manager', avatar: 'SM', lastActive: '1 hr ago' },
  { name: 'Ravi Patel', email: 'ravi@fixelsmedia.com', role: 'Sales Rep', avatar: 'RP', lastActive: '3 hrs ago' },
  { name: 'Layla Hassan', email: 'layla@fixelsmedia.com', role: 'Sales Rep', avatar: 'LH', lastActive: '1 day ago' },
]

const TABS = ['Integrations', 'Team', 'Security', 'Compliance']

export default function SettingsPage() {
  const [tab, setTab] = useState('Integrations')
  const [category, setCategory] = useState('All')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const categories = ['All', ...Array.from(new Set(INTEGRATIONS.map(i => i.category)))]
  const filtered = category === 'All' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.category === category)
  const connected = INTEGRATIONS.filter(i => i.status === 'connected').length

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Settings & Integrations</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{connected} of {INTEGRATIONS.length} integrations active</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: saved ? 'rgba(0,212,164,0.8)' : 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
              {saved ? <><Check size={13} /> Saved!</> : 'Save Changes'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: tab === t ? 'rgba(0,123,255,0.15)' : 'transparent', color: tab === t ? '#007BFF' : '#7a9bb5', border: `1px solid ${tab === t ? 'rgba(0,123,255,0.3)' : 'transparent'}` }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* ─── INTEGRATIONS TAB ─── */}
          {tab === 'Integrations' && (
            <div className="space-y-5">
              {/* Status summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,212,164,0.08)', border: '1px solid rgba(0,212,164,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#00D4A1' }}>{connected}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Connected</div>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,165,2,0.08)', border: '1px solid rgba(255,165,2,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#ffa502' }}>{INTEGRATIONS.length - connected}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Available</div>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,123,255,0.08)', border: '1px solid rgba(0,123,255,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#007BFF' }}>Live</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Sync Status</div>
                </div>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: category === c ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.04)', color: category === c ? '#007BFF' : '#7a9bb5', border: `1px solid ${category === c ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                    {c}
                  </button>
                ))}
              </div>

              {/* Integration grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((intg, i) => (
                  <motion.div key={intg.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${intg.color}15`, border: `1px solid ${intg.color}25` }}>
                          {intg.icon}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{intg.name}</div>
                          <div className="text-xs" style={{ color: '#4a6580' }}>{intg.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: intg.status === 'connected' ? '#00D4A1' : '#4a6580' }}>
                        {intg.status === 'connected' ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {intg.status === 'connected' ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: '#7a9bb5' }}>{intg.desc}</p>
                    <button className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                      style={{
                        background: intg.status === 'connected' ? 'rgba(255,71,87,0.1)' : `${intg.color}15`,
                        color: intg.status === 'connected' ? '#ff4757' : intg.color,
                        border: `1px solid ${intg.status === 'connected' ? 'rgba(255,71,87,0.2)' : intg.color + '30'}`,
                      }}>
                      {intg.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TEAM TAB ─── */}
          {tab === 'Team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Team Members ({TEAM_MEMBERS.length})</h3>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                  <Plus size={13} /> Invite Member
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {TEAM_MEMBERS.map((member, i) => (
                  <div key={member.email} className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-white/5"
                    style={{ borderBottom: i < TEAM_MEMBERS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.4), rgba(108,99,255,0.4))' }}>
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">{member.name}</div>
                      <div className="text-xs" style={{ color: '#4a6580' }}>{member.email}</div>
                    </div>
                    <div className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: member.role === 'Admin' ? 'rgba(0,123,255,0.12)' : 'rgba(255,255,255,0.06)', color: member.role === 'Admin' ? '#007BFF' : '#7a9bb5' }}>
                      {member.role}
                    </div>
                    <div className="text-xs" style={{ color: '#4a6580' }}>{member.lastActive}</div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-all"><Edit3 size={13} style={{ color: '#4a6580' }} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-all"><Trash2 size={13} style={{ color: '#ff4757' }} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Role permissions */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h4 className="font-bold text-sm text-white mb-4">Role-Based Access Control</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <th className="text-left py-2 px-3" style={{ color: '#4a6580' }}>Permission</th>
                        {['Admin', 'Sales Manager', 'Sales Rep', 'Viewer'].map(r => (
                          <th key={r} className="text-center py-2 px-3" style={{ color: '#4a6580' }}>{r}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['View Leads', true, true, true, true],
                        ['Export Data', true, true, false, false],
                        ['Send Outreach', true, true, true, false],
                        ['Manage Pipeline', true, true, true, false],
                        ['View Reports', true, true, false, false],
                        ['Manage Integrations', true, false, false, false],
                        ['Manage Team', true, false, false, false],
                      ].map(([perm, ...access]) => (
                        <tr key={String(perm)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td className="py-2.5 px-3 text-white font-medium">{perm}</td>
                          {access.map((a, i) => (
                            <td key={i} className="py-2.5 px-3 text-center">
                              {a ? <CheckCircle2 size={14} style={{ color: '#00D4A1', margin: '0 auto' }} /> : <XCircle size={14} style={{ color: '#4a6580', margin: '0 auto' }} />}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── SECURITY TAB ─── */}
          {tab === 'Security' && (
            <div className="space-y-4 max-w-2xl">
              {/* API Key */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Key size={16} style={{ color: '#007BFF' }} />
                  <h3 className="font-bold text-sm text-white">API Keys</h3>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ background: 'rgba(5,13,26,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="flex-1 text-xs font-mono" style={{ color: '#7a9bb5' }}>
                    {showKey ? 'ls_live_xK9mP2vQnR8sT4wY7uJ3aF6cB1eD5hN0' : 'ls_live_••••••••••••••••••••••••••••••••'}
                  </span>
                  <button onClick={() => setShowKey(!showKey)} className="p-1.5 rounded hover:bg-white/10 transition-all">
                    {showKey ? <EyeOff size={13} style={{ color: '#4a6580' }} /> : <Eye size={13} style={{ color: '#4a6580' }} />}
                  </button>
                  <button className="text-xs px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(0,123,255,0.12)', color: '#007BFF' }}>Copy</button>
                </div>
                <button className="flex items-center gap-2 text-xs font-medium" style={{ color: '#ffa502' }}>
                  <RefreshCw size={12} /> Regenerate API Key
                </button>
              </div>

              {/* Security settings */}
              {[
                { label: 'Two-Factor Authentication', desc: 'Require 2FA for all team members', enabled: true, icon: Lock },
                { label: 'Session Timeout', desc: 'Auto-logout after 8 hours of inactivity', enabled: true, icon: Shield },
                { label: 'Audit Logging', desc: 'Log all user actions and data access', enabled: true, icon: Eye },
                { label: 'IP Allowlist', desc: 'Restrict access to approved IP addresses', enabled: false, icon: Globe },
                { label: 'Data Encryption', desc: 'AES-256 encryption for all stored data', enabled: true, icon: Lock },
              ].map(({ label, desc, enabled, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: enabled ? 'rgba(0,212,164,0.12)' : 'rgba(74,101,128,0.12)' }}>
                    <Icon size={16} style={{ color: enabled ? '#00D4A1' : '#4a6580' }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-white">{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{desc}</div>
                  </div>
                  <div className="w-10 h-6 rounded-full relative cursor-pointer transition-all"
                    style={{ background: enabled ? '#007BFF' : 'rgba(255,255,255,0.12)' }}>
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                      style={{ left: enabled ? '18px' : '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── COMPLIANCE TAB ─── */}
          {tab === 'Compliance' && (
            <div className="space-y-4 max-w-2xl">
              <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background: 'rgba(0,212,164,0.08)', border: '1px solid rgba(0,212,164,0.2)' }}>
                <CheckCircle2 size={18} style={{ color: '#00D4A1', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="font-semibold text-white text-sm">LeadSphere AI is Compliance-First</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#7a9bb5' }}>
                    All data collection uses authorized sources only. We comply with GDPR, CCPA, LinkedIn Terms of Service, and all applicable privacy regulations.
                  </div>
                </div>
              </div>

              {[
                { standard: 'GDPR', region: 'European Union', status: 'Compliant', desc: 'Right to erasure, data portability, consent management all enabled', color: '#00D4A1' },
                { standard: 'CCPA', region: 'California, USA', status: 'Compliant', desc: 'Consumer data rights, opt-out mechanisms, and disclosure policies active', color: '#00D4A1' },
                { standard: 'LinkedIn ToS', region: 'Global', status: 'Compliant', desc: 'Only publicly available data used. No scraping or unauthorized access', color: '#00D4A1' },
                { standard: 'SOC 2 Type II', region: 'Global', status: 'In Progress', desc: 'Security audit in progress. Expected certification Q3 2026', color: '#ffa502' },
                { standard: 'ISO 27001', region: 'Global', status: 'Planned', desc: 'Information security management standard — planned for Q4 2026', color: '#4a6580' },
              ].map(({ standard, region, status, desc, color }) => (
                <div key={standard} className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-white text-sm">{standard}</div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${color}15`, color }}>{status}</span>
                  </div>
                  <div className="text-xs mb-1" style={{ color: '#4a6580' }}>Region: {region}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>{desc}</div>
                </div>
              ))}

              <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} style={{ color: '#ff4757' }} />
                  <span className="font-semibold text-sm text-white">Data Retention Policy</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>
                  Lead data is retained for 24 months. Contact data is processed under legitimate interest basis. Users can request deletion at any time. Data is never sold to third parties.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
