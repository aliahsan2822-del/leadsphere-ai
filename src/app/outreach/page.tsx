'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Mail, Linkedin, ChevronRight, Zap, Brain, RefreshCw,
  Copy, Check, FileText, MessageSquare, Star, Globe, Users,
  Sparkles, Plus, ArrowRight, Building2, Target, Phone
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import { MOCK_LEADS, OUTREACH_TEMPLATES } from '@/lib/mockData'
import { Lead, OutreachTemplate } from '@/lib/types'

function generateEmail(lead: Lead): string {
  return `Subject: Quick observation about ${lead.website}

Hi ${lead.contacts[0]?.name.split(' ')[0] || 'there'},

I was researching ${lead.industry.toLowerCase()} companies in ${lead.location.split(',')[0]} and came across ${lead.company}.

I ran our AI analysis on your digital presence and identified several high-impact opportunities:

${lead.opportunities.website.insights.slice(0, 2).map(i => `• ${i}`).join('\n')}
${lead.opportunities.mobile.insights[0] ? `• ${lead.opportunities.mobile.insights[0]}` : ''}

${lead.intentSignals[0] ? `I also noticed that ${lead.intentSignals[0].description.toLowerCase()} — this tells me you may be at a pivotal growth point right now.` : ''}

At Fixels Media, we've helped similar ${lead.industry.toLowerCase()} companies achieve remarkable results through targeted digital transformation. Most recently, we helped a comparable business achieve ${lead.opportunities.website.impact}.

I'd love to share a brief tailored analysis we prepared specifically for ${lead.company}. Would you have 20 minutes for a discovery call this week?

Best regards,
[Your Name]
Fixels Media | fixelsmedia.com
+1 (555) 000-0000`
}

function generateLinkedIn(lead: Lead): string {
  return `Hi ${lead.contacts[0]?.name.split(' ')[0] || 'there'},

I've been following ${lead.company}'s growth in the ${lead.industry} space — impressive work, especially ${lead.intentSignals[0]?.description.toLowerCase() || 'your recent expansion'}.

I run business intelligence for Fixels Media and our AI flagged ${lead.company} as a high-potential match for our services. We've identified some specific digital opportunities that could meaningfully accelerate your growth.

Worth a 15-minute conversation?`
}

function generateFollowUp(lead: Lead): string {
  return `Hi ${lead.contacts[0]?.name.split(' ')[0] || 'there'},

Following up on my note from last week about ${lead.company}'s digital opportunity.

I know your inbox is busy, so I'll be brief — I put together a quick 2-slide analysis showing the specific revenue impact a digital upgrade could have for ${lead.company} based on your current metrics.

Happy to share it or hop on a 15-min call. What works for you?

Best,
[Your Name]
Fixels Media`
}

function generateProposal(lead: Lead): string {
  const topOpps = Object.entries(lead.opportunities)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 3)

  return `PROPOSAL: Digital Transformation for ${lead.company}
Prepared by Fixels Media | ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
${lead.company} has a significant opportunity to improve its digital presence and operational efficiency. Based on our AI analysis, we've identified the following priority areas:

${topOpps.map(([key, opp], i) => `${i + 1}. ${key.toUpperCase().replace('WEBSITE', 'Website Redesign').replace('MOBILE', 'Mobile App').replace('ERP', 'ERP System').replace('MARKETING', 'Digital Marketing').replace('OUTSOURCING', 'IT Outsourcing')}
   Score: ${opp.score}/100 | Priority: ${opp.priority.toUpperCase()}
   Impact: ${opp.impact}
   Key issues: ${opp.insights[0]}`).join('\n\n')}

RECOMMENDED ENGAGEMENT
Phase 1 (Weeks 1-8): ${topOpps[0][0].toUpperCase()} Overhaul
Phase 2 (Weeks 8-16): ${topOpps[1][0].toUpperCase()} Development
Phase 3 (Ongoing): Digital Marketing & Growth

INVESTMENT
Based on scope: $45,000 - $85,000
Timeline: 4-6 months
Expected ROI: 3-5x within 12 months

WHY FIXELS MEDIA
• 200+ successful digital projects
• Industry-specific expertise in ${lead.industry}
• End-to-end delivery team
• Ongoing support & maintenance

Next Steps: Schedule a 30-minute discovery call to finalize scope and timeline.`
}

const OUTPUT_TYPES = [
  { key: 'email', icon: Mail, label: 'Cold Email', color: '#007BFF' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn Message', color: '#0A66C2' },
  { key: 'followup', icon: RefreshCw, label: 'Follow-Up', color: '#6C63FF' },
  { key: 'proposal', icon: FileText, label: 'Proposal Draft', color: '#00D4A1' },
  { key: 'discovery', icon: MessageSquare, label: 'Discovery Questions', color: '#FFA502' },
  { key: 'callscript', icon: Phone, label: 'Call Script', color: '#FF6B9D' },
]

export default function OutreachPage() {
  const [selectedLead, setSelectedLead] = useState<Lead>(MOCK_LEADS[0])
  const [outputType, setOutputType] = useState<'email' | 'linkedin' | 'followup' | 'proposal' | 'discovery' | 'callscript'>('email')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showLeadPicker, setShowLeadPicker] = useState(false)

  const getContent = () => {
    switch (outputType) {
      case 'email': return generateEmail(selectedLead)
      case 'linkedin': return generateLinkedIn(selectedLead)
      case 'followup': return generateFollowUp(selectedLead)
      case 'proposal': return generateProposal(selectedLead)
      case 'discovery': return `DISCOVERY QUESTIONS FOR ${selectedLead.company.toUpperCase()}\nPrepared by LeadSphere AI\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n1. What are your top digital priorities for ${selectedLead.company} in the next 12 months?\n\n2. How are you currently measuring the performance of your digital channels?\n\n3. Your website scored ${selectedLead.websiteScore}/100 in our analysis — are you aware of the performance gaps?\n\n4. What percentage of new business comes through your digital presence today?\n\n5. ${selectedLead.opportunities.mobile.score > 70 ? `Your mobile traffic is significant — have you considered a dedicated mobile app?` : `What tools are your team using to manage operations and reporting?`}\n\n6. Have you worked with a digital agency before? What worked well, what didn't?\n\n7. Is there a dedicated budget allocated for digital transformation this year?\n\n8. Who else would be involved in evaluating a potential partnership with Fixels Media?\n\n9. What's the biggest risk you see in NOT upgrading your digital infrastructure?\n\n10. If we could solve [their top pain point], what would that be worth to the business?`
      case 'callscript': return `SALES CALL SCRIPT — ${selectedLead.company.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n\nOPENING (0:00 – 2:00)\n"Hi ${selectedLead.contacts[0]?.name.split(' ')[0] || 'there'}, thanks for taking the time. I'm [Name] from Fixels Media — we're an AI-powered digital agency. The reason I reached out to ${selectedLead.company} specifically is our AI platform flagged some unique opportunities in your digital presence that I believe could directly impact your revenue."\n\nSITUATION (2:00 – 7:00)\n• "How are you currently handling [website/mobile/ERP] at ${selectedLead.company}?"\n• "What are your top growth priorities for the next 12 months?"\n• "Who's involved in technology decisions on your team?"\n\nPROBLEM (7:00 – 12:00)\n"Our AI scanned ${selectedLead.website} and found: ${selectedLead.opportunities.website.insights[0]}. Is that something you've noticed? What impact is that having?"\n\nSOLUTION (12:00 – 17:00)\n"Based on this, we'd approach it in two phases: Phase 1 — ${Object.entries(selectedLead.opportunities).sort((a,b) => b[1].score - a[1].score)[0][1].label}, estimated impact: ${Object.entries(selectedLead.opportunities).sort((a,b) => b[1].score - a[1].score)[0][1].impact}"\n\nCLOSE (17:00 – 20:00)\n"I'd love to put together a tailored proposal for ${selectedLead.company}. Can I have that to you within 48 hours?"\n\n[If yes] → "Great — I'll send it over. Is there anyone else you'd like included?"\n[If hesitant] → "What would need to be true for this to make sense right now?"`
    }
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerated(false)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scoreColor = selectedLead.score >= 80 ? '#ff4757' : selectedLead.score >= 60 ? '#ffa502' : '#1e90ff'

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">AI Outreach Center</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>Generate personalized outreach for every prospect</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,212,164,0.1)', border: '1px solid rgba(0,212,164,0.2)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold" style={{ color: '#00D4A1' }}>AI Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Left Panel — Lead Selector + Config */}
            <div className="lg:col-span-2 space-y-4">

              {/* Selected Lead */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-white">Selected Lead</h3>
                  <button onClick={() => setShowLeadPicker(!showLeadPicker)}
                    className="text-xs font-medium px-2 py-1 rounded-lg transition-all hover:bg-white/5" style={{ color: '#007BFF', border: '1px solid rgba(0,123,255,0.2)' }}>
                    Change
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.3), rgba(108,99,255,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {selectedLead.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{selectedLead.company}</h4>
                    <p className="text-xs" style={{ color: '#7a9bb5' }}>{selectedLead.industry} • {selectedLead.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold" style={{ color: scoreColor }}>Score {selectedLead.score}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${scoreColor}15`, color: scoreColor, border: `1px solid ${scoreColor}30` }}>
                        {selectedLead.scoreCategory}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lead picker dropdown */}
                <AnimatePresence>
                  {showLeadPicker && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="mt-3 overflow-hidden">
                      <div className="space-y-1 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {MOCK_LEADS.slice(0, 6).map(lead => (
                          <button key={lead.id} onClick={() => { setSelectedLead(lead); setShowLeadPicker(false); setGenerated(false) }}
                            className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:bg-white/5"
                            style={{ background: lead.id === selectedLead.id ? 'rgba(0,123,255,0.08)' : 'transparent', border: `1px solid ${lead.id === selectedLead.id ? 'rgba(0,123,255,0.2)' : 'transparent'}` }}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.2), rgba(108,99,255,0.2))' }}>
                              {lead.company.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-white truncate">{lead.company}</div>
                              <div className="text-xs" style={{ color: '#4a6580' }}>{lead.industry}</div>
                            </div>
                            <div className="text-xs font-bold" style={{ color: lead.score >= 80 ? '#ff4757' : '#ffa502' }}>{lead.score}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Output Type */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-bold text-sm text-white mb-3">Output Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                  {OUTPUT_TYPES.map(({ key, icon: Icon, label, color }) => (
                    <button key={key} onClick={() => { setOutputType(key as typeof outputType); setGenerated(false) }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                      style={{
                        background: outputType === key ? `${color}12` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${outputType === key ? `${color}30` : 'rgba(255,255,255,0.06)'}`,
                        color: outputType === key ? color : '#7a9bb5',
                      }}>
                      <Icon size={18} />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Opportunity Summary */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} style={{ color: '#6C63FF' }} />
                  <h3 className="font-bold text-sm text-white">Key Talking Points</h3>
                </div>
                <div className="space-y-2">
                  {selectedLead.intentSignals.map((sig, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Zap size={10} className="flex-shrink-0 mt-0.5" style={{ color: '#ffa502' }} />
                      <span style={{ color: '#7a9bb5' }}>{sig.description}</span>
                    </div>
                  ))}
                  {selectedLead.opportunities.website.insights.slice(0, 2).map((ins, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Globe size={10} className="flex-shrink-0 mt-0.5" style={{ color: '#007BFF' }} />
                      <span style={{ color: '#7a9bb5' }}>{ins}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button onClick={handleGenerate} disabled={isGenerating}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-base transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 6px 24px rgba(0,123,255,0.35)' }}>
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate {OUTPUT_TYPES.find(t => t.key === outputType)?.label}
                  </>
                )}
              </button>
            </div>

            {/* Right Panel — Output */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-5 rounded-2xl h-full" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
                      <Brain size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">AI-Generated Output</h3>
                      <p className="text-xs" style={{ color: '#4a6580' }}>Personalized for {selectedLead.company}</p>
                    </div>
                  </div>
                  {generated && (
                    <div className="flex items-center gap-2">
                      <button onClick={handleGenerate}
                        className="p-2 rounded-lg transition-all hover:bg-white/5" style={{ color: '#4a6580', border: '1px solid rgba(255,255,255,0.06)' }} title="Regenerate">
                        <RefreshCw size={13} />
                      </button>
                      <button onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                        style={{ background: copied ? 'rgba(0,212,164,0.15)' : 'rgba(0,123,255,0.15)', color: copied ? '#00D4A1' : '#007BFF', border: `1px solid ${copied ? 'rgba(0,212,164,0.3)' : 'rgba(0,123,255,0.3)'}` }}>
                        {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                      </button>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!generated && !isGenerating ? (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(0,123,255,0.08)', border: '1px solid rgba(0,123,255,0.15)' }}>
                        <Sparkles size={28} style={{ color: '#007BFF' }} />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white mb-1">Ready to Generate</div>
                        <div className="text-sm" style={{ color: '#4a6580' }}>Select a lead and output type, then click Generate</div>
                      </div>
                    </motion.div>
                  ) : isGenerating ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-5">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
                        <div className="absolute inset-2 rounded-full border border-[#6C63FF] border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
                      </div>
                      <div className="text-center space-y-1">
                        {['Analyzing company profile...', 'Reading intent signals...', 'Personalizing message...'].map((step, i) => (
                          <div key={step} className="flex items-center gap-2 text-sm">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,123,255,0.15)' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#007BFF] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                            </div>
                            <span style={{ color: '#7a9bb5' }}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="p-4 rounded-xl text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'rgba(5,13,26,0.8)', color: '#b0c8e0', border: '1px solid rgba(255,255,255,0.06)', fontFamily: outputType === 'proposal' ? 'monospace' : 'inherit', fontSize: '13px', maxHeight: '60vh', overflowY: 'auto' }}>
                        {getContent()}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 4px 16px rgba(0,123,255,0.3)' }}>
                          <Send size={14} /> Send Now
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Plus size={14} /> Add to Sequence
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/5" style={{ color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Star size={14} /> Save Template
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Saved Templates */}
          <div className="mt-5 rounded-2xl overflow-hidden" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <FileText size={15} style={{ color: '#6C63FF' }} />
                <h3 className="font-bold text-sm text-white">Template Library</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {OUTREACH_TEMPLATES.map((tmpl, i) => (
                <div key={tmpl.id} className="p-4 transition-all hover:bg-white/5 cursor-pointer"
                  style={{ borderRight: i < OUTREACH_TEMPLATES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: tmpl.type === 'email' ? 'rgba(0,123,255,0.15)' : tmpl.type === 'linkedin' ? 'rgba(10,102,194,0.15)' : 'rgba(108,99,255,0.15)' }}>
                      {tmpl.type === 'email' ? <Mail size={12} style={{ color: '#007BFF' }} /> : tmpl.type === 'linkedin' ? <Linkedin size={12} style={{ color: '#0A66C2' }} /> : <RefreshCw size={12} style={{ color: '#6C63FF' }} />}
                    </div>
                    <span className="text-xs font-semibold text-white">{tmpl.name}</span>
                  </div>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#4a6580' }}>{tmpl.body.slice(0, 80)}...</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tmpl.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#4a6580' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
