'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe, Users, DollarSign, MapPin, Calendar, TrendingUp, Zap,
  Brain, Target, Smartphone, BarChart3, Package, ChevronRight,
  ExternalLink, Mail, Linkedin, Shield, Star, AlertTriangle,
  CheckCircle2, XCircle, ArrowUpRight, Building2, Code2, Send,
  Phone, Mic
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { MOCK_LEADS } from '@/lib/mockData'
import { Lead } from '@/lib/types'
import Link from 'next/link'

function ScoreCircle({ score, size = 80, label, color }: { score: number; size?: number; label: string; color: string }) {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  const progress = (score / 100) * c
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${progress} ${c - progress}`} strokeLinecap="round" />
        </svg>
        <div className="absolute text-center">
          <div className="text-xl font-black" style={{ color }}>{score}</div>
        </div>
      </div>
      <div className="text-xs text-center" style={{ color: '#7a9bb5' }}>{label}</div>
    </div>
  )
}

function OpportunitySection({ lead }: { lead: Lead }) {
  const opps = [
    { key: 'website', icon: Globe, label: 'Website Redesign', color: '#007BFF', opp: lead.opportunities.website },
    { key: 'mobile', icon: Smartphone, label: 'Mobile App', color: '#6C63FF', opp: lead.opportunities.mobile },
    { key: 'erp', icon: Package, label: 'ERP System', color: '#00D4A1', opp: lead.opportunities.erp },
    { key: 'marketing', icon: BarChart3, label: 'Digital Marketing', color: '#FFA502', opp: lead.opportunities.marketing },
    { key: 'outsourcing', icon: Code2, label: 'IT Outsourcing', color: '#FF6B9D', opp: lead.opportunities.outsourcing },
  ]

  return (
    <div className="space-y-4">
      {opps.map(({ key, icon: Icon, label, color, opp }) => (
        <div key={key} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: opp.priority === 'high' ? 'rgba(255,71,87,0.12)' : opp.priority === 'medium' ? 'rgba(255,165,2,0.12)' : 'rgba(30,144,255,0.12)', color: opp.priority === 'high' ? '#ff4757' : opp.priority === 'medium' ? '#ffa502' : '#1e90ff' }}>
                      {opp.label}
                    </span>
                    <span className="text-xs" style={{ color: '#4a6580' }}>{opp.impact}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color }}>{opp.score}</div>
                  <div className="text-xs" style={{ color: '#4a6580' }}>/ 100</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${opp.score}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                />
              </div>
            </div>
          </div>

          {opp.insights.length > 0 && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-1 gap-1.5">
                {opp.insights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs" style={{ color: '#7a9bb5' }}>
                    <AlertTriangle size={11} className="flex-shrink-0 mt-0.5" style={{ color }} />
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function IntelligenceContent() {
  const params = useSearchParams()
  const id = params.get('id')
  const lead = id ? MOCK_LEADS.find(l => l.id === id) : MOCK_LEADS[0]
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'contacts' | 'outreach' | 'discovery' | 'scripts'>('overview')

  if (!lead) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Brain size={48} style={{ color: '#4a6580' }} className="mx-auto mb-4" />
          <div className="text-white font-bold text-xl mb-2">Select a Lead to Analyze</div>
          <Link href="/leads" className="text-sm font-medium" style={{ color: '#007BFF' }}>
            Browse Leads <ChevronRight size={14} className="inline" />
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'contacts', label: 'Contacts' },
    { key: 'discovery', label: 'Discovery Questions' },
    { key: 'scripts', label: 'Call Scripts' },
    { key: 'outreach', label: 'AI Outreach' },
  ]

  const scoreColor = lead.score >= 80 ? '#ff4757' : lead.score >= 60 ? '#ffa502' : '#1e90ff'

  return (
    <main className="flex-1 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
              {lead.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{lead.company}</h1>
              <div className="flex items-center gap-3 text-xs mt-0.5" style={{ color: '#4a6580' }}>
                <span className="flex items-center gap-1"><Globe size={11} />{lead.website}</span>
                <span className="flex items-center gap-1"><MapPin size={11} />{lead.location}</span>
                <span className="flex items-center gap-1"><Building2 size={11} />{lead.industry}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 rounded-xl" style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-2xl font-black" style={{ color: scoreColor }}>{lead.score}</div>
              <div className="text-xs" style={{ color: '#4a6580' }}>AI Score</div>
            </div>
            <Link href="/outreach"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 4px 20px rgba(0,123,255,0.3)' }}>
              <Send size={15} /> Generate Outreach
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-4">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.key ? 'rgba(0,123,255,0.15)' : 'transparent',
                color: activeTab === tab.key ? '#007BFF' : '#7a9bb5',
                border: `1px solid ${activeTab === tab.key ? 'rgba(0,123,255,0.3)' : 'transparent'}`,
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {activeTab === 'overview' && (
          <>
            {/* AI Insight */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.08), rgba(108,99,255,0.08))', border: '1px solid rgba(0,123,255,0.2)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                  <Brain size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Strategic Intelligence</h3>
                  <p className="text-xs" style={{ color: '#4a6580' }}>Powered by LeadSphere AI</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#b0c8e0' }}>{lead.aiInsight}</p>
            </motion.div>

            {/* Company Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Employees', value: lead.employees, icon: Users, color: '#007BFF' },
                { label: 'Revenue', value: lead.revenue, icon: DollarSign, color: '#00D4A1' },
                { label: 'Founded', value: lead.founded, icon: Calendar, color: '#6C63FF' },
                { label: 'Funding', value: lead.fundingStage || 'Bootstrapped', icon: TrendingUp, color: '#FFA502' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="font-bold text-white text-sm">{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Website Scores */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="font-bold text-white text-sm mb-4">AI Website Analysis</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {[
                  { label: 'Overall', score: lead.websiteScore, color: '#ff4757' },
                  { label: 'SEO', score: lead.seoScore, color: '#6C63FF' },
                  { label: 'Mobile', score: lead.mobileScore, color: '#007BFF' },
                  { label: 'Performance', score: lead.performanceScore, color: '#FFA502' },
                  { label: 'Security', score: lead.securityScore, color: '#00D4A1' },
                ].map(({ label, score, color }) => (
                  <ScoreCircle key={label} score={score} label={label} color={color} size={70} />
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={14} style={{ color: '#ff4757' }} />
                  <span className="font-semibold text-white">Critical Issues Found</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>
                  {lead.company}'s website scored {lead.websiteScore}/100 — significantly below the industry average of 72/100. Immediate redesign recommended to prevent further revenue loss.
                </p>
              </div>
            </div>

            {/* Intent Signals */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} style={{ color: '#ffa502' }} />
                <h3 className="font-bold text-white text-sm">Intent & Buying Signals</h3>
              </div>
              <div className="space-y-3">
                {lead.intentSignals.map((sig, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `rgba(${sig.strength === 'strong' ? '255,71,87' : sig.strength === 'medium' ? '255,165,2' : '30,144,255'},0.05)`, border: `1px solid rgba(${sig.strength === 'strong' ? '255,71,87' : sig.strength === 'medium' ? '255,165,2' : '30,144,255'},0.15)` }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: sig.strength === 'strong' ? '#ff4757' : sig.strength === 'medium' ? '#ffa502' : '#1e90ff' }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-white capitalize">{sig.type.replace('-', ' ')}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full capitalize" style={{ background: 'rgba(255,255,255,0.06)', color: '#7a9bb5' }}>{sig.strength}</span>
                      </div>
                      <p className="text-xs" style={{ color: '#7a9bb5' }}>{sig.description}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{sig.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="font-bold text-white text-sm mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {lead.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,123,255,0.08)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'opportunities' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-4 p-4 rounded-2xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Target size={14} style={{ color: '#007BFF' }} />
                <span className="font-semibold text-white text-sm">Total Addressable Opportunity</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>
                Based on AI analysis of {lead.company}'s digital presence, competitive landscape, and industry benchmarks, Fixels Media has a significant multi-service opportunity with an estimated combined impact exceeding {lead.opportunities.website.impact}.
              </p>
            </div>
            <OpportunitySection lead={lead} />
          </motion.div>
        )}

        {activeTab === 'contacts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.contacts.map((contact, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{contact.name}</h3>
                      <p className="text-sm" style={{ color: '#7a9bb5' }}>{contact.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#7a9bb5' }}>
                        <Mail size={14} style={{ color: '#007BFF' }} />
                        {contact.email}
                      </a>
                    )}
                    {contact.linkedin && (
                      <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#7a9bb5' }}>
                        <Linkedin size={14} style={{ color: '#0A66C2' }} />
                        View Profile
                      </a>
                    )}
                  </div>
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <Link href="/outreach" className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90" style={{ background: 'rgba(0,123,255,0.12)', color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                      <Send size={12} /> Generate Personalized Outreach
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'outreach' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Brain size={16} style={{ color: '#007BFF' }} />
                <h3 className="font-bold text-white text-sm">AI-Generated Email Outreach</h3>
              </div>
              <div className="p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line" style={{ background: 'rgba(10,22,40,0.8)', color: '#b0c8e0', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'monospace', fontSize: '12px' }}>
                {`Subject: Quick observation about ${lead.website}

Hi ${lead.contacts[0]?.name.split(' ')[0] || 'there'},

I was researching ${lead.industry.toLowerCase()} companies in ${lead.location.split(',')[0]} and came across ${lead.company}.

I ran a quick AI analysis of your digital presence and found some significant opportunities that could directly impact your revenue:

${lead.opportunities.website.insights[0]}
${lead.opportunities.website.insights[1] || ''}
${lead.opportunities.mobile.insights[0]}

At Fixels Media, we specialize in helping ${lead.industry.toLowerCase()} companies solve these exact challenges. We recently helped a similar company achieve ${lead.opportunities.website.impact}.

Given ${lead.intentSignals[0]?.description || 'your growth trajectory'}, I believe now is the perfect time for a conversation.

Would you have 20 minutes this week for a quick discovery call?

Best regards,
[Your Name]
Fixels Media | fixelsmedia.com`}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                  <Send size={13} /> Send Email
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Regenerate
                </button>
                <Link href="/outreach" className="text-xs font-medium ml-auto" style={{ color: '#007BFF' }}>
                  Full Outreach Center <ChevronRight size={11} className="inline" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.15)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Brain size={14} style={{ color: '#007BFF' }} />
                <span className="font-bold text-sm text-white">AI-Generated Discovery Questions</span>
              </div>
              <p className="text-xs" style={{ color: '#7a9bb5' }}>Personalized for {lead.company} based on their profile and identified gaps.</p>
            </div>

            {[
              { category: 'Business & Goals', color: '#007BFF', questions: [
                `What are your top 3 digital priorities for ${lead.company} in the next 12 months?`,
                `How are you currently measuring the ROI of your digital channels?`,
                `What does success look like for your digital transformation initiative?`,
                `Who are the key stakeholders involved in technology decisions at ${lead.company}?`,
              ]},
              { category: 'Website & Digital Presence', color: '#6C63FF', questions: [
                `Your current website scores ${lead.websiteScore}/100 on our AI analysis — are you aware of the performance issues?`,
                `What percentage of your leads or customers come through your website today?`,
                `Have you had challenges with your website conversion rate or mobile experience?`,
                `What does your current website redesign or update roadmap look like?`,
              ]},
              { category: `${lead.opportunities.mobile.score > 70 ? 'Mobile App Opportunity' : 'Technology Gaps'}`, color: '#FFA502', questions: [
                `What percentage of your customers interact with you on mobile devices?`,
                `How are you currently serving customers who prefer mobile-first experiences?`,
                `What would a dedicated mobile app mean for your customer retention rates?`,
                `Are any of your competitors offering mobile experiences that you currently can't match?`,
              ]},
              { category: 'Budget & Timeline', color: '#00D4A1', questions: [
                `Do you have an allocated budget for digital transformation this year?`,
                `What would the ideal timeline look like for your next major digital investment?`,
                `Have you worked with external development agencies before? What worked, what didn't?`,
                `What's the biggest blocker to moving forward with a digital upgrade right now?`,
              ]},
            ].map(({ category, color, questions }) => (
              <div key={category} className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <h4 className="font-bold text-sm text-white">{category}</h4>
                </div>
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-xs font-bold flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${color}20`, color }}>{i + 1}</span>
                      <span className="text-sm leading-relaxed" style={{ color: '#b0c8e0' }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'scripts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(108,99,255,0.07)', border: '1px solid rgba(108,99,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} style={{ color: '#6C63FF' }} />
                <span className="font-bold text-sm text-white">Sales Call Script & Meeting Preparation</span>
              </div>
              <p className="text-xs" style={{ color: '#7a9bb5' }}>AI-crafted script for your call with {lead.contacts[0]?.name || lead.company}</p>
            </div>

            {[
              { title: 'Opening (0:00 – 2:00)', color: '#007BFF', content: `"Hi ${lead.contacts[0]?.name.split(' ')[0] || 'there'}, thanks for taking the time today. I'm [Name] from Fixels Media. We're an AI-powered digital agency, and the reason I reached out specifically to ${lead.company} is that our AI platform flagged some significant digital opportunities unique to your business — particularly around ${lead.opportunities.website.score > 80 ? 'your website performance' : 'your mobile presence'}. I'd love to spend 20 minutes sharing what we found and see if it's relevant to where you're headed."` },
              { title: 'Situation Questions (2:00 – 7:00)', color: '#6C63FF', content: `• "Can you walk me through how ${lead.company} currently acquires new customers digitally?"\n• "What are the top 2-3 priorities for the business over the next 12 months?"\n• "Who typically makes technology and vendor decisions on the team?"\n• "Have you looked into [${Object.entries(lead.opportunities).sort((a,b) => b[1].score - a[1].score)[0][0]}] solutions before?"` },
              { title: 'Problem Discovery (7:00 – 12:00)', color: '#FFA502', content: `Mention: "Our AI scanned ${lead.website} and found:\n• ${lead.opportunities.website.insights[0]}\n• ${lead.opportunities.mobile.insights[0]}\n\nAsk: 'Is this something your team has noticed?' and 'What impact is that having on [revenue/customer acquisition/operations]?'\n\nListen for: pain around ${lead.intentSignals[0]?.description || 'growth challenges'}.` },
              { title: 'Solution Presentation (12:00 – 17:00)', color: '#00D4A1', content: `"Based on what you've shared, we would approach this in two phases:\n\nPhase 1: ${Object.entries(lead.opportunities).sort((a,b) => b[1].score - a[1].score)[0][1].label} — estimated impact: ${Object.entries(lead.opportunities).sort((a,b) => b[1].score - a[1].score)[0][1].impact}\n\nPhase 2: ${Object.entries(lead.opportunities).sort((a,b) => b[1].score - a[1].score)[1][1].label}\n\nWe've done this for similar ${lead.industry} companies and typically see results within 60-90 days."` },
              { title: 'Close & Next Steps (17:00 – 20:00)', color: '#FF6B9D', content: `"Given everything we've discussed, I'd love to put together a tailored proposal for ${lead.company} that outlines exactly what we'd do, the timeline, and investment. Would you be open to that?\n\n[If yes]: "Great — I'll have that to you within 48 hours. In the meantime, could you loop in [CTO/CMO] for the next call?"\n\n[If hesitant]: "Totally understand. What would need to be true for this to make sense to move forward?"` },
            ].map(({ title, color, content }) => (
              <div key={title} className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: `1px solid ${color}25` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background: `${color}15`, color }}>{title}</div>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#b0c8e0', fontFamily: 'inherit' }}>{content}</div>
              </div>
            ))}

            {/* Meeting Prep Checklist */}
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h4 className="font-bold text-sm text-white mb-3">Pre-Call Checklist</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  `Review ${lead.company}'s LinkedIn page for recent updates`,
                  `Check if ${lead.intentSignals[0]?.description || 'any recent news'}`,
                  `Prepare website audit screenshot from LeadSphere AI`,
                  `Review competitor landscape for ${lead.industry}`,
                  `Know your ask: proposal or discovery call follow-up?`,
                  `Prepare 2-3 relevant case studies from ${lead.industry}`,
                  `Check ${lead.contacts[0]?.name}'s LinkedIn for recent activity`,
                  'Have pricing range ready if asked',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(0,212,164,0.15)', border: '1px solid rgba(0,212,164,0.3)' }}>
                      <CheckCircle2 size={9} style={{ color: '#00D4A1' }} />
                    </div>
                    <span style={{ color: '#7a9bb5' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default function IntelligencePage() {
  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><div className="w-10 h-10 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" /></div>}>
        <IntelligenceContent />
      </Suspense>
    </div>
  )
}
