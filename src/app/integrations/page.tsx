'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Linkedin, CheckCircle2, XCircle, Zap, Shield, Key,
  RefreshCw, ArrowUpRight, Eye, EyeOff, Globe, Users,
  BarChart3, Send, MessageSquare, AlertCircle, ChevronRight,
  Settings, Plug, Activity
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'

type Tab = 'email' | 'linkedin' | 'other'

const EMAIL_PROVIDERS = [
  {
    id: 'gmail',
    name: 'Gmail / Google Workspace',
    icon: '✉',
    color: '#EA4335',
    bg: 'rgba(234,67,53,0.08)',
    description: 'Connect your Gmail or Google Workspace account via OAuth 2.0',
    recommended: true,
  },
  {
    id: 'office365',
    name: 'Office 365 / Outlook',
    icon: '📧',
    color: '#0078D4',
    bg: 'rgba(0,120,212,0.08)',
    description: 'Connect Microsoft 365 or Outlook via OAuth 2.0',
    recommended: false,
  },
  {
    id: 'smtp',
    name: 'Custom SMTP',
    icon: '⚙',
    color: '#7a9bb5',
    bg: 'rgba(122,155,181,0.08)',
    description: 'Use your own SMTP server with host, port & credentials',
    recommended: false,
  },
]

const OTHER_INTEGRATIONS = [
  { name: 'HubSpot CRM', icon: '🔶', color: '#FF7A59', connected: true, category: 'CRM', desc: 'Sync leads, deals and contacts' },
  { name: 'Salesforce', icon: '☁', color: '#00A1E0', connected: false, category: 'CRM', desc: 'Push leads directly into Salesforce' },
  { name: 'Apollo.io', icon: '🚀', color: '#6C63FF', connected: true, category: 'Data', desc: 'Enrich leads with verified contact data' },
  { name: 'Hunter.io', icon: '🎯', color: '#FFA502', connected: false, category: 'Data', desc: 'Find & verify professional email addresses' },
  { name: 'Clearbit', icon: '🔍', color: '#00D4A1', connected: false, category: 'Data', desc: 'Real-time company & person intelligence' },
  { name: 'Crunchbase', icon: '📊', color: '#0288D1', connected: true, category: 'Data', desc: 'Funding rounds and company data' },
  { name: 'Slack', icon: '💬', color: '#4A154B', connected: true, category: 'Alerts', desc: 'Get notified on hot leads and replies' },
  { name: 'Calendly', icon: '📅', color: '#006BFF', connected: false, category: 'Scheduling', desc: 'Auto-insert booking link in emails' },
]

const EMAIL_METRICS = [
  { label: 'Emails Sent (all time)', value: '12,847', color: '#007BFF', icon: Send },
  { label: 'Avg Open Rate', value: '24.6%', color: '#00D4A1', icon: Eye },
  { label: 'Avg Reply Rate', value: '8.7%', color: '#6C63FF', icon: MessageSquare },
  { label: 'Bounced Removed', value: '143', color: '#FFA502', icon: AlertCircle },
]

export default function IntegrationsPage() {
  const [tab, setTab] = useState<Tab>('email')
  const [emailConnected, setEmailConnected] = useState(true)
  const [linkedInConnected, setLinkedInConnected] = useState(false)
  const [showSMTPForm, setShowSMTPForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [disconnecting, setDisconnecting] = useState(false)

  const handleConnect = (provider: string) => {
    setConnecting(provider)
    setTimeout(() => {
      setConnecting(null)
      if (provider !== 'smtp') setEmailConnected(true)
    }, 2000)
  }

  const handleLinkedInConnect = () => {
    setConnecting('linkedin')
    setTimeout(() => {
      setConnecting(null)
      setLinkedInConnected(true)
    }, 2500)
  }

  const handleDisconnect = () => {
    setDisconnecting(true)
    setTimeout(() => {
      setDisconnecting(false)
      setEmailConnected(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Integrations & Connections</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Connect your email, LinkedIn and third-party tools to enable multi-channel outreach</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,212,164,0.08)', border: '1px solid rgba(0,212,164,0.2)' }}>
              <Activity size={13} style={{ color: '#00D4A1' }} />
              <span className="text-xs font-semibold" style={{ color: '#00D4A1' }}>4 integrations active</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Tab Switcher */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
            {([
              { key: 'email', icon: Mail, label: 'Email Connector' },
              { key: 'linkedin', icon: Linkedin, label: 'LinkedIn Connector' },
              { key: 'other', icon: Plug, label: 'Other Integrations' },
            ] as { key: Tab; icon: any; label: string }[]).map(({ key, icon: Icon, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: tab === key ? 'rgba(0,123,255,0.15)' : 'transparent',
                  color: tab === key ? '#007BFF' : '#7a9bb5',
                  border: tab === key ? '1px solid rgba(0,123,255,0.25)' : '1px solid transparent',
                }}>
                <Icon size={14} />{label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* Email Tab */}
            {tab === 'email' && (
              <motion.div key="email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">

                {/* Email Metrics (when connected) */}
                {emailConnected && (
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,123,255,0.06)', border: '1px solid rgba(0,123,255,0.2)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,123,255,0.15)' }}>
                          <Mail size={18} style={{ color: '#007BFF' }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white">Gmail Connected</h3>
                            <div className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
                            </div>
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>aliahsan2822@gmail.com</div>
                        </div>
                      </div>
                      <button onClick={handleDisconnect} disabled={disconnecting}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-50"
                        style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)' }}>
                        {disconnecting ? <><RefreshCw size={11} className="animate-spin" />Disconnecting...</> : <><XCircle size={11} />Disconnect</>}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {EMAIL_METRICS.map(({ label, value, color, icon: Icon }) => (
                        <div key={label} className="p-3 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
                          <Icon size={14} style={{ color }} className="mb-2" />
                          <div className="text-xl font-black" style={{ color }}>{value}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connection Options */}
                {!emailConnected && (
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 className="font-bold text-white mb-1">Connect Your Email</h3>
                    <p className="text-sm mb-5" style={{ color: '#7a9bb5' }}>Choose a connection method. OAuth 2.0 is recommended — no password required.</p>
                    <div className="space-y-3">
                      {EMAIL_PROVIDERS.map(({ id, name, icon, color, bg, description, recommended }) => (
                        <div key={id} className="p-4 rounded-xl transition-all" style={{ background: bg, border: `1px solid ${color}20` }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{icon}</span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-white">{name}</span>
                                  {recommended && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>Recommended</span>}
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>{description}</div>
                              </div>
                            </div>
                            {id === 'smtp' ? (
                              <button onClick={() => setShowSMTPForm(!showSMTPForm)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                                {showSMTPForm ? 'Hide Form' : 'Configure'}
                              </button>
                            ) : (
                              <button onClick={() => handleConnect(id)} disabled={connecting === id}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                                style={{ background: connecting === id ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                                {connecting === id ? <><RefreshCw size={11} className="animate-spin" />Connecting...</> : <>Connect with {id === 'gmail' ? 'Google' : 'Microsoft'}</>}
                              </button>
                            )}
                          </div>
                          {id === 'smtp' && showSMTPForm && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-semibold text-white mb-1 block">SMTP Host</label>
                                  <input className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="smtp.gmail.com" />
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-white mb-1 block">Port</label>
                                  <input className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="587" />
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-white mb-1 block">Email Address</label>
                                  <input className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="your@email.com" />
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-white mb-1 block">App Password</label>
                                  <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} className="w-full px-3 py-2 pr-9 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="••••••••" />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5" style={{ color: '#4a6580' }}>
                                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 mt-3">
                                <button className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80" style={{ background: 'rgba(255,255,255,0.06)', color: '#7a9bb5' }}>Test Connection</button>
                                <button className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>Save SMTP Config</button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email Features */}
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="font-bold text-white mb-4">Email Features Enabled</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Personalized bulk emails', desc: 'Dynamic fields auto-filled from lead data', active: true },
                      { label: 'Send scheduling', desc: 'Schedule emails for optimal engagement times', active: true },
                      { label: 'Open & click tracking', desc: 'Track when leads open and click your emails', active: true },
                      { label: 'A/B subject line testing', desc: 'Test which subject lines perform better', active: emailConnected },
                      { label: 'Automatic follow-up sequences', desc: 'Multi-step sequences with conditional logic', active: emailConnected },
                      { label: 'Reply detection', desc: 'Detect replies and update lead scores automatically', active: emailConnected },
                      { label: 'Bounce management', desc: 'Hard bounces are auto-removed from lists', active: emailConnected },
                      { label: 'Unsubscribe management', desc: 'GDPR & CAN-SPAM compliant opt-out handling', active: emailConnected },
                    ].map(({ label, desc, active }) => (
                      <div key={label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: active ? 'rgba(0,212,164,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${active ? 'rgba(0,212,164,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                        {active ? <CheckCircle2 size={15} style={{ color: '#00D4A1' }} className="flex-shrink-0 mt-0.5" /> : <XCircle size={15} style={{ color: '#4a6580' }} className="flex-shrink-0 mt-0.5" />}
                        <div>
                          <div className="text-xs font-semibold" style={{ color: active ? '#fff' : '#4a6580' }}>{label}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* LinkedIn Tab */}
            {tab === 'linkedin' && (
              <motion.div key="linkedin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">

                {/* Status */}
                {linkedInConnected ? (
                  <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,102,194,0.08)', border: '1px solid rgba(10,102,194,0.2)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(10,102,194,0.2)' }}>
                          <Linkedin size={18} style={{ color: '#0A66C2' }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white">LinkedIn Connected</h3>
                            <div className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live
                            </div>
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: '#7a9bb5' }}>Fixels Media — Pro Account</div>
                        </div>
                      </div>
                      <button onClick={() => setLinkedInConnected(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)' }}>
                        <XCircle size={11} />Disconnect
                      </button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Messages Sent', value: '1,248', color: '#0A66C2' },
                        { label: 'Connection Rate', value: '42%', color: '#00D4A1' },
                        { label: 'Message View Rate', value: '71%', color: '#6C63FF' },
                        { label: 'Reply Rate', value: '12.3%', color: '#FFA502' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="p-3 rounded-xl text-center" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
                          <div className="text-xl font-black" style={{ color }}>{value}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.2)' }}>
                      <Linkedin size={28} style={{ color: '#0A66C2' }} />
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2">Connect LinkedIn</h3>
                    <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: '#7a9bb5' }}>Connect your LinkedIn account to send personalized messages, connection requests, and InMails directly from LeadSphere AI.</p>
                    <button onClick={handleLinkedInConnect} disabled={connecting === 'linkedin'}
                      className="flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 mx-auto"
                      style={{ background: 'linear-gradient(135deg, #0A66C2, #004182)' }}>
                      {connecting === 'linkedin' ? (
                        <><RefreshCw size={16} className="animate-spin" />Connecting to LinkedIn...</>
                      ) : (
                        <><Linkedin size={16} />Connect with LinkedIn</>
                      )}
                    </button>
                    <p className="text-xs mt-3" style={{ color: '#4a6580' }}>Uses LinkedIn OAuth 2.0 — your password is never stored</p>
                  </div>
                )}

                {/* LinkedIn Features */}
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="font-bold text-white mb-4">LinkedIn Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Personalized connection requests', desc: 'Auto-personalized with company data', active: linkedInConnected },
                      { label: 'Direct message campaigns', desc: 'Send message sequences to connections', active: linkedInConnected },
                      { label: 'InMail support', desc: 'Reach non-connections via InMail', active: linkedInConnected },
                      { label: 'Profile analysis', desc: 'Analyze decision-maker profiles automatically', active: linkedInConnected },
                      { label: 'Activity tracking', desc: 'Track message views, profile visits, replies', active: linkedInConnected },
                      { label: 'Auto decision maker finder', desc: 'Identify CEOs, CTOs, VPs at target companies', active: linkedInConnected },
                      { label: 'Engagement scoring', desc: 'Score leads based on LinkedIn activity', active: linkedInConnected },
                      { label: 'Company insights', desc: 'Track company growth, hiring signals', active: linkedInConnected },
                    ].map(({ label, desc, active }) => (
                      <div key={label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: active ? 'rgba(10,102,194,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${active ? 'rgba(10,102,194,0.2)' : 'rgba(255,255,255,0.05)'}` }}>
                        {active ? <CheckCircle2 size={15} style={{ color: '#0A66C2' }} className="flex-shrink-0 mt-0.5" /> : <XCircle size={15} style={{ color: '#4a6580' }} className="flex-shrink-0 mt-0.5" />}
                        <div>
                          <div className="text-xs font-semibold" style={{ color: active ? '#fff' : '#4a6580' }}>{label}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Templates Preview */}
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="font-bold text-white mb-4">LinkedIn Message Templates</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Cold Connection', preview: 'Hi {{firstName}}, I noticed {{company}} is expanding their {{department}}...', tag: 'Connection' },
                      { name: 'Value-First Message', preview: "Hi {{firstName}}, I helped {{similarCompany}} with {{result}}. Given {{company}}'s growth...", tag: 'Message' },
                      { name: 'Industry Insight', preview: '{{firstName}}, {{industry}} trends show {{insight}} — this could directly impact {{company}}...', tag: 'Message' },
                      { name: 'Follow-up', preview: 'Still interested in discussing {{topic}} for {{company}}? Would love to share our analysis.', tag: 'Follow-up' },
                    ].map(({ name, preview, tag }) => (
                      <div key={name} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white">{name}</span>
                            <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(10,102,194,0.15)', color: '#0A66C2' }}>{tag}</span>
                          </div>
                          <div className="text-xs italic" style={{ color: '#4a6580' }}>{preview}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="/outreach" className="flex items-center gap-1 mt-3 text-xs" style={{ color: '#007BFF' }}>
                    Edit templates in Outreach Center <ChevronRight size={10} />
                  </a>
                </div>
              </motion.div>
            )}

            {/* Other Integrations Tab */}
            {tab === 'other' && (
              <motion.div key="other" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">Third-Party Integrations</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>4 connected</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {OTHER_INTEGRATIONS.map(({ name, icon, color, connected, category, desc }) => (
                      <div key={name} className="p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-white/5"
                        style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${connected ? `${color}20` : 'rgba(255,255,255,0.06)'}` }}>
                        <span className="text-2xl flex-shrink-0">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-sm text-white">{name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: '#4a6580' }}>{category}</span>
                          </div>
                          <div className="text-xs" style={{ color: '#4a6580' }}>{desc}</div>
                        </div>
                        <div className="flex-shrink-0">
                          {connected ? (
                            <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(0,212,164,0.1)', color: '#00D4A1' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Connected
                            </div>
                          ) : (
                            <button className="text-xs px-3 py-1 rounded-lg font-semibold transition-all hover:opacity-80" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security note */}
                <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background: 'rgba(0,123,255,0.06)', border: '1px solid rgba(0,123,255,0.15)' }}>
                  <Shield size={16} style={{ color: '#007BFF' }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-white mb-1">Enterprise-Grade Security</div>
                    <div className="text-xs" style={{ color: '#7a9bb5' }}>All OAuth tokens are encrypted with AES-256. We never store your actual passwords. Tokens are rotated automatically and can be revoked at any time from this page.</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  )
}
