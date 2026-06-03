'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, CheckCircle2, XCircle,
  Key, Lock, Eye, EyeOff, Globe, AlertTriangle, RefreshCw,
  Plus, Trash2, Edit3, Check, X, Copy, Mail
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const INITIAL_INTEGRATIONS = [
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

const INITIAL_TEAM = [
  { id: 1, name: 'Ahmed Al-Rashid', email: 'ahmed@fixelsmedia.com', role: 'Admin', avatar: 'AA', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah@fixelsmedia.com', role: 'Sales Manager', avatar: 'SM', lastActive: '1 hr ago' },
  { id: 3, name: 'Ravi Patel', email: 'ravi@fixelsmedia.com', role: 'Sales Rep', avatar: 'RP', lastActive: '3 hrs ago' },
  { id: 4, name: 'Layla Hassan', email: 'layla@fixelsmedia.com', role: 'Sales Rep', avatar: 'LH', lastActive: '1 day ago' },
]

const INITIAL_SECURITY = [
  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all team members', enabled: true, icon: Lock },
  { label: 'Session Timeout', desc: 'Auto-logout after 8 hours of inactivity', enabled: true, icon: Shield },
  { label: 'Audit Logging', desc: 'Log all user actions and data access', enabled: true, icon: Eye },
  { label: 'IP Allowlist', desc: 'Restrict access to approved IP addresses', enabled: false, icon: Globe },
  { label: 'Data Encryption', desc: 'AES-256 encryption for all stored data', enabled: true, icon: Lock },
]

const TABS = ['Integrations', 'Team', 'Security', 'Compliance']

export default function SettingsPage() {
  const [tab, setTab] = useState('Integrations')
  const [category, setCategory] = useState('All')
  const [showKey, setShowKey] = useState(false)
  const [keyCopied, setKeyCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Integrations state
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS)
  const [connecting, setConnecting] = useState<string | null>(null)

  // Team state
  const [team, setTeam] = useState(INITIAL_TEAM)
  const [showInvite, setShowInvite] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Sales Rep' })
  const [editForm, setEditForm] = useState({ name: '', role: '' })

  // Security state
  const [security, setSecurity] = useState(INITIAL_SECURITY)

  const categories = ['All', ...Array.from(new Set(integrations.map(i => i.category)))]
  const filtered = category === 'All' ? integrations : integrations.filter(i => i.category === category)
  const connectedCount = integrations.filter(i => i.status === 'connected').length

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); showToast('Settings saved successfully') }

  // Toggle integration connect/disconnect
  const toggleIntegration = (name: string) => {
    setConnecting(name)
    setTimeout(() => {
      setIntegrations(prev => prev.map(i => i.name === name ? { ...i, status: i.status === 'connected' ? 'disconnected' : 'connected' } : i))
      setConnecting(null)
      const intg = integrations.find(i => i.name === name)
      showToast(intg?.status === 'connected' ? `${name} disconnected` : `${name} connected successfully`)
    }, 1200)
  }

  // Toggle security setting
  const toggleSecurity = (label: string) => {
    setSecurity(prev => prev.map(s => s.label === label ? { ...s, enabled: !s.enabled } : s))
    const setting = security.find(s => s.label === label)
    showToast(`${label} ${setting?.enabled ? 'disabled' : 'enabled'}`)
  }

  // Copy API key
  const copyKey = () => {
    navigator.clipboard.writeText('ls_live_xK9mP2vQnR8sT4wY7uJ3aF6cB1eD5hN0')
    setKeyCopied(true)
    setTimeout(() => setKeyCopied(false), 2000)
    showToast('API key copied to clipboard')
  }

  // Invite team member
  const handleInvite = () => {
    if (!inviteForm.email.trim()) return
    const initials = inviteForm.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'NM'
    setTeam(prev => [...prev, { id: Date.now(), ...inviteForm, avatar: initials, lastActive: 'Just now' }])
    setInviteForm({ name: '', email: '', role: 'Sales Rep' })
    setShowInvite(false)
    showToast(`Invitation sent to ${inviteForm.email}`)
  }

  // Delete team member
  const handleDelete = (id: number) => {
    const member = team.find(m => m.id === id)
    setTeam(prev => prev.filter(m => m.id !== id))
    showToast(`${member?.name} removed from team`)
  }

  // Start editing member
  const startEdit = (id: number) => {
    const m = team.find(m => m.id === id)
    if (m) { setEditingId(id); setEditForm({ name: m.name, role: m.role }) }
  }

  // Save edit
  const saveEdit = (id: number) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...editForm } : m))
    setEditingId(null)
    showToast('Member updated')
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'rgba(0,123,255,0.9)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            <Check size={14} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Settings & Integrations</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{connectedCount} of {integrations.length} integrations active</p>
            </div>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: saved ? 'rgba(0,212,164,0.8)' : 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
              {saved ? <><Check size={13} /> Saved!</> : 'Save Changes'}
            </button>
          </div>
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
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,212,164,0.08)', border: '1px solid rgba(0,212,164,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#00D4A1' }}>{connectedCount}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Connected</div>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,165,2,0.08)', border: '1px solid rgba(255,165,2,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#ffa502' }}>{integrations.length - connectedCount}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Available</div>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,123,255,0.08)', border: '1px solid rgba(0,123,255,0.2)' }}>
                  <div className="text-2xl font-black" style={{ color: '#007BFF' }}>Live</div>
                  <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Sync Status</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: category === c ? 'rgba(0,123,255,0.15)' : 'rgba(255,255,255,0.04)', color: category === c ? '#007BFF' : '#7a9bb5', border: `1px solid ${category === c ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((intg, i) => {
                  const isConnecting = connecting === intg.name
                  return (
                    <motion.div key={intg.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${intg.status === 'connected' ? `${intg.color}20` : 'rgba(255,255,255,0.07)'}` }}>
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
                      <button
                        onClick={() => toggleIntegration(intg.name)}
                        disabled={isConnecting}
                        className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-60 flex items-center justify-center gap-1.5"
                        style={{ background: intg.status === 'connected' ? 'rgba(255,71,87,0.1)' : `${intg.color}15`, color: intg.status === 'connected' ? '#ff4757' : intg.color, border: `1px solid ${intg.status === 'connected' ? 'rgba(255,71,87,0.2)' : intg.color + '30'}` }}>
                        {isConnecting ? <><RefreshCw size={11} className="animate-spin" /> Connecting...</> : intg.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ─── TEAM TAB ─── */}
          {tab === 'Team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">Team Members ({team.length})</h3>
                <button onClick={() => setShowInvite(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                  <Plus size={13} /> Invite Member
                </button>
              </div>

              {/* Invite form */}
              <AnimatePresence>
                {showInvite && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden rounded-2xl" style={{ background: 'rgba(0,123,255,0.06)', border: '1px solid rgba(0,123,255,0.2)' }}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-white">Invite New Member</span>
                        <button onClick={() => setShowInvite(false)}><X size={14} style={{ color: '#4a6580' }} /></button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[{ label: 'Full Name', key: 'name', placeholder: 'John Smith' }, { label: 'Email', key: 'email', placeholder: 'john@company.com' }].map(({ label, key, placeholder }) => (
                          <div key={key}>
                            <label className="text-xs font-semibold text-white mb-1 block">{label}</label>
                            <input value={inviteForm[key as keyof typeof inviteForm]} onChange={e => setInviteForm(f => ({ ...f, [key]: e.target.value }))}
                              placeholder={placeholder} className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
                              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                          </div>
                        ))}
                        <div>
                          <label className="text-xs font-semibold text-white mb-1 block">Role</label>
                          <select value={inviteForm.role} onChange={e => setInviteForm(f => ({ ...f, role: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl text-sm text-white outline-none"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {['Admin', 'Sales Manager', 'Sales Rep', 'Viewer'].map(r => <option key={r} value={r} style={{ background: '#0a1628' }}>{r}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button onClick={() => setShowInvite(false)} className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/5 transition-all" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>Cancel</button>
                        <button onClick={handleInvite} disabled={!inviteForm.email.trim()}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-40"
                          style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                          <Mail size={12} /> Send Invitation
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {team.map((member, i) => (
                  <div key={member.id} className="px-5 py-4 transition-all hover:bg-white/5"
                    style={{ borderBottom: i < team.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    {editingId === member.id ? (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.4), rgba(108,99,255,0.4))' }}>
                          {member.avatar}
                        </div>
                        <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                          className="flex-1 px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <select value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
                          className="px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {['Admin', 'Sales Manager', 'Sales Rep', 'Viewer'].map(r => <option key={r} value={r} style={{ background: '#0a1628' }}>{r}</option>)}
                        </select>
                        <button onClick={() => saveEdit(member.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: 'rgba(0,123,255,0.2)' }}>Save</button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg hover:bg-white/10"><X size={13} style={{ color: '#4a6580' }} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
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
                          <button onClick={() => startEdit(member.id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-all" title="Edit member">
                            <Edit3 size={13} style={{ color: '#4a6580' }} />
                          </button>
                          <button onClick={() => handleDelete(member.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all" title="Remove member"
                            disabled={member.role === 'Admin' && team.filter(m => m.role === 'Admin').length === 1}>
                            <Trash2 size={13} style={{ color: '#ff4757' }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
                      {[['View Leads', true, true, true, true], ['Export Data', true, true, false, false], ['Send Outreach', true, true, true, false], ['Manage Pipeline', true, true, true, false], ['View Reports', true, true, false, false], ['Manage Integrations', true, false, false, false], ['Manage Team', true, false, false, false]].map(([perm, ...access]) => (
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
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Key size={16} style={{ color: '#007BFF' }} />
                  <h3 className="font-bold text-sm text-white">API Keys</h3>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ background: 'rgba(5,13,26,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="flex-1 text-xs font-mono" style={{ color: '#7a9bb5' }}>
                    {showKey ? 'ls_live_xK9mP2vQnR8sT4wY7uJ3aF6cB1eD5hN0' : 'ls_live_••••••••••••••••••••••••••••••••'}
                  </span>
                  <button onClick={() => setShowKey(!showKey)} className="p-1.5 rounded hover:bg-white/10 transition-all" title={showKey ? 'Hide key' : 'Show key'}>
                    {showKey ? <EyeOff size={13} style={{ color: '#4a6580' }} /> : <Eye size={13} style={{ color: '#4a6580' }} />}
                  </button>
                  <button onClick={copyKey}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: keyCopied ? 'rgba(0,212,164,0.15)' : 'rgba(0,123,255,0.12)', color: keyCopied ? '#00D4A1' : '#007BFF' }}>
                    {keyCopied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                  </button>
                </div>
                <button className="flex items-center gap-2 text-xs font-medium transition-all hover:text-white" style={{ color: '#ffa502' }}>
                  <RefreshCw size={12} /> Regenerate API Key
                </button>
              </div>

              {/* Security toggles — fully functional */}
              {security.map(({ label, desc, enabled, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-white/5"
                  style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: enabled ? 'rgba(0,212,164,0.12)' : 'rgba(74,101,128,0.12)' }}>
                    <Icon size={16} style={{ color: enabled ? '#00D4A1' : '#4a6580' }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-white">{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{desc}</div>
                  </div>
                  {/* Functional toggle switch */}
                  <button onClick={() => toggleSecurity(label)}
                    className="w-10 h-6 rounded-full relative transition-all flex-shrink-0 focus:outline-none"
                    style={{ background: enabled ? '#007BFF' : 'rgba(255,255,255,0.12)' }}
                    aria-pressed={enabled} aria-label={`Toggle ${label}`}>
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
                      style={{ left: enabled ? '18px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                  </button>
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
