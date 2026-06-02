'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target, Globe, TrendingUp, Shield, Zap, Brain, Search,
  ArrowUpRight, ArrowDownRight, CheckCircle2, XCircle,
  BarChart3, Users, Star, AlertTriangle, ChevronRight
} from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Sidebar from '@/components/Sidebar'

const COMPETITORS = [
  {
    id: 1,
    name: 'WebFX',
    website: 'webfx.com',
    type: 'Digital Agency',
    location: 'Pennsylvania, USA',
    employees: '500-1000',
    founded: '1996',
    strengths: ['Strong SEO focus', 'Large client portfolio', 'Data-driven approach', 'Revenue attribution tech'],
    weaknesses: ['Limited mobile dev', 'No ERP solutions', 'US-centric focus', 'No AI capabilities'],
    services: ['SEO', 'PPC', 'Web Design', 'Social Media'],
    techStack: ['React', 'WordPress', 'HubSpot'],
    scores: { webDesign: 82, mobile: 45, erp: 10, marketing: 95, ai: 30, global: 40 },
    threat: 'medium',
    marketShare: '3.2%',
    color: '#007BFF',
  },
  {
    id: 2,
    name: 'Toptal',
    website: 'toptal.com',
    type: 'IT Outsourcing',
    location: 'San Francisco, USA',
    employees: '1000-2000',
    founded: '2010',
    strengths: ['Top-tier talent network', 'Global reach', 'Fast matching', 'Vetted developers'],
    weaknesses: ['High cost', 'No end-to-end solutions', 'No AI products', 'Limited strategy'],
    services: ['IT Outsourcing', 'Web Dev', 'Design', 'Finance'],
    techStack: ['Various', 'Node.js', 'React', 'Python'],
    scores: { webDesign: 70, mobile: 75, erp: 55, marketing: 40, ai: 60, global: 88 },
    threat: 'high',
    marketShare: '5.1%',
    color: '#6C63FF',
  },
  {
    id: 3,
    name: 'Sapient/Publicis',
    website: 'publicissapient.com',
    type: 'Enterprise Consulting',
    location: 'New York, USA',
    employees: '10000+',
    founded: '1991',
    strengths: ['Enterprise relationships', 'Full-service', 'Global presence', 'Brand recognition'],
    weaknesses: ['Very expensive', 'Slow delivery', 'No SMB focus', 'Bureaucratic'],
    services: ['Digital Transformation', 'ERP', 'Consulting', 'Cloud'],
    techStack: ['SAP', 'Salesforce', 'Azure', 'AWS'],
    scores: { webDesign: 75, mobile: 68, erp: 90, marketing: 70, ai: 65, global: 95 },
    threat: 'low',
    marketShare: '8.4%',
    color: '#FFA502',
  },
  {
    id: 4,
    name: 'Intellectsoft',
    website: 'intellectsoft.net',
    type: 'Software Development',
    location: 'Norway / Ukraine',
    employees: '500-1000',
    founded: '2007',
    strengths: ['Mobile expertise', 'AI & ML focus', 'Competitive pricing', 'Agile delivery'],
    weaknesses: ['Limited marketing', 'Smaller team', 'Less brand recognition', 'No ERP depth'],
    services: ['Mobile App', 'Web Dev', 'AI/ML', 'Cloud'],
    techStack: ['Swift', 'Kotlin', 'React Native', 'Python', 'TensorFlow'],
    scores: { webDesign: 72, mobile: 91, erp: 42, marketing: 35, ai: 85, global: 65 },
    threat: 'high',
    marketShare: '1.8%',
    color: '#00D4A1',
  },
  {
    id: 5,
    name: 'Konstant Infosolutions',
    website: 'konstantinfo.com',
    type: 'Mobile & Web Agency',
    location: 'India / USA',
    employees: '250-500',
    founded: '2003',
    strengths: ['Cost-effective', 'Mobile specialists', 'E-commerce expertise', 'Fast delivery'],
    weaknesses: ['Quality varies', 'Limited AI', 'No ERP', 'Support issues'],
    services: ['Mobile App', 'Web Design', 'E-Commerce', 'UI/UX'],
    techStack: ['React Native', 'Flutter', 'Shopify', 'Laravel'],
    scores: { webDesign: 65, mobile: 80, erp: 25, marketing: 45, ai: 30, global: 55 },
    threat: 'medium',
    marketShare: '0.9%',
    color: '#FF6B9D',
  },
  {
    id: 6,
    name: 'Zco Corporation',
    website: 'zco.com',
    type: 'Custom Software',
    location: 'New Hampshire, USA',
    employees: '250-500',
    founded: '1989',
    strengths: ['Long track record', 'Custom dev expertise', 'US-based team', 'Gaming specialization'],
    weaknesses: ['Outdated tech stack', 'No AI focus', 'Limited marketing', 'No global reach'],
    services: ['Mobile App', 'AR/VR', 'Web Dev', 'Game Dev'],
    techStack: ['Unity', 'React', 'Node.js', '.NET'],
    scores: { webDesign: 60, mobile: 72, erp: 30, marketing: 28, ai: 25, global: 35 },
    threat: 'low',
    marketShare: '0.6%',
    color: '#00D4FF',
  },
]

const FIXELS_SCORES = { webDesign: 88, mobile: 85, erp: 82, marketing: 78, ai: 92, global: 70 }

const RADAR_KEYS = [
  { key: 'webDesign', label: 'Web Design' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'erp', label: 'ERP' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'ai', label: 'AI/Tech' },
  { key: 'global', label: 'Global' },
]

function ThreatBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    high: { bg: 'rgba(255,71,87,0.12)', color: '#ff4757', label: 'High Threat' },
    medium: { bg: 'rgba(255,165,2,0.12)', color: '#ffa502', label: 'Medium' },
    low: { bg: 'rgba(30,144,255,0.12)', color: '#1e90ff', label: 'Low Threat' },
  }
  const m = map[level]
  return <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: m.bg, color: m.color }}>{m.label}</span>
}

export default function CompetitorsPage() {
  const [selected, setSelected] = useState(COMPETITORS[0])

  const radarData = RADAR_KEYS.map(({ key, label }) => ({
    subject: label,
    Fixels: FIXELS_SCORES[key as keyof typeof FIXELS_SCORES],
    [selected.name]: selected.scores[key as keyof typeof selected.scores],
  }))

  return (
    <div className="flex min-h-screen" style={{ background: '#050d1a' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-30 px-6 py-4" style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Competitor Intelligence</h1>
              <p className="text-xs mt-0.5" style={{ color: '#4a6580' }}>AI-powered competitive landscape analysis</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,212,164,0.1)', border: '1px solid rgba(0,212,164,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold" style={{ color: '#00D4A1' }}>Fixels Media Advantage: High</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Market Position Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Competitors Tracked', value: '6', icon: Target, color: '#007BFF' },
              { label: 'High Threat', value: '2', icon: AlertTriangle, color: '#ff4757' },
              { label: 'Your Market Edge', value: 'AI + ERP', icon: Zap, color: '#00D4A1' },
              { label: 'Service Gaps Found', value: '14', icon: Brain, color: '#6C63FF' },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Content: List + Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Competitor List */}
            <div className="lg:col-span-2 space-y-2">
              {COMPETITORS.map((comp) => (
                <div key={comp.id} onClick={() => setSelected(comp)} className="p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: selected.id === comp.id ? 'rgba(0,123,255,0.08)' : 'rgba(10,22,40,0.8)', border: `1px solid ${selected.id === comp.id ? 'rgba(0,123,255,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-white text-sm">{comp.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#4a6580' }}>{comp.type} • {comp.location.split(',')[0]}</div>
                    </div>
                    <ThreatBadge level={comp.threat} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1 flex-wrap">
                      {comp.services.slice(0, 2).map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a9bb5' }}>{s}</span>
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: comp.color }}>Share: {comp.marketShare}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-3 space-y-4">
              {/* Radar Chart */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white">Fixels vs {selected.name}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#007BFF]" />Fixels Media</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: selected.color }} />{selected.name}</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#7a9bb5', fontSize: 11 }} />
                    <Radar name="Fixels Media" dataKey="Fixels" stroke="#007BFF" fill="#007BFF" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name={selected.name} dataKey={selected.name} stroke={selected.color} fill={selected.color} fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowUpRight size={14} style={{ color: '#ff4757' }} />
                    <span className="font-bold text-sm text-white">{selected.name} Strengths</span>
                  </div>
                  {selected.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5 text-xs" style={{ color: '#7a9bb5' }}>
                      <CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: '#ff4757' }} />{s}
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,212,164,0.06)', border: '1px solid rgba(0,212,164,0.15)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} style={{ color: '#00D4A1' }} />
                    <span className="font-bold text-sm text-white">Your Advantage</span>
                  </div>
                  {selected.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5 text-xs" style={{ color: '#7a9bb5' }}>
                      <XCircle size={11} className="flex-shrink-0 mt-0.5" style={{ color: '#00D4A1' }} />{w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h4 className="font-bold text-sm text-white mb-3">Their Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a9bb5', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,123,255,0.07)', border: '1px solid rgba(0,123,255,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Brain size={14} style={{ color: '#007BFF' }} />
                  <span className="font-bold text-sm text-white">AI Competitive Insight</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#7a9bb5' }}>
                  {selected.name} is a {selected.threat} competitive threat. Their primary weakness is <strong className="text-white">{selected.weaknesses[0].toLowerCase()}</strong>, which is a core strength of Fixels Media. When competing against them, emphasize your AI capabilities, ERP expertise, and full-stack delivery — areas where they consistently underperform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
