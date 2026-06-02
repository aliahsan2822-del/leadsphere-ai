'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Zap, Brain, Target, BarChart3, TrendingUp, Users, ArrowRight, ChevronRight, Star, Shield, Cpu, Search, CheckCircle2, Play } from 'lucide-react'

const Globe3D = dynamic(() => import('@/components/Globe3D'), { ssr: false, loading: () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-16 h-16 rounded-full border-2 border-[#007BFF] border-t-transparent animate-spin" />
  </div>
)})

const STATS = [
  { value: '4,872+', label: 'Opportunities Found', color: '#00D4FF', icon: Target },
  { value: '94%', label: 'AI Accuracy Rate', color: '#6C63FF', icon: Brain },
  { value: '$4.7M', label: 'Pipeline Value', color: '#00D4A1', icon: TrendingUp },
  { value: '180+', label: 'Countries Covered', color: '#FF6B9D', icon: Globe },
]

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Opportunity Discovery',
    description: 'Our proprietary AI engine scans millions of businesses globally, identifying companies with genuine digital transformation needs across website, mobile, ERP, and marketing.',
    color: '#007BFF',
    gradient: 'from-[#007BFF]/20 to-[#007BFF]/5',
  },
  {
    icon: Target,
    title: 'Predictive Lead Scoring',
    description: 'Advanced ML models score every lead across 47 signals — funding activity, hiring patterns, technology gaps, and digital maturity — to surface your highest-conversion opportunities.',
    color: '#6C63FF',
    gradient: 'from-[#6C63FF]/20 to-[#6C63FF]/5',
  },
  {
    icon: Globe,
    title: 'Global Intelligence Map',
    description: 'Interactive 3D globe visualizing opportunity density, service demand, and market potential across 180+ countries in real time.',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF]/20 to-[#00D4FF]/5',
  },
  {
    icon: Zap,
    title: 'AI Outreach Automation',
    description: 'Generate hyper-personalized emails, LinkedIn messages, and proposals for every prospect automatically — customized with their specific digital gaps and opportunities.',
    color: '#FF6B9D',
    gradient: 'from-[#FF6B9D]/20 to-[#FF6B9D]/5',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence Engine',
    description: 'Deep company profiles including technology stack analysis, decision-maker intelligence, intent signals, competitive landscape, and revenue impact estimates.',
    color: '#00D4A1',
    gradient: 'from-[#00D4A1]/20 to-[#00D4A1]/5',
  },
  {
    icon: Search,
    title: 'Natural Language Search',
    description: 'Ask in plain English: "Find healthcare companies in the UAE without mobile apps with 100+ employees." Get instant, filtered results.',
    color: '#FFA502',
    gradient: 'from-[#FFA502]/20 to-[#FFA502]/5',
  },
]

const SERVICES = [
  'Website Development', 'Mobile App Development', 'E-Commerce Solutions',
  'UI/UX Design', 'ERP Software', 'IT Outsourcing', 'Digital Marketing', 'AI Solutions'
]

const TESTIMONIALS = [
  { name: 'Ahmed Al-Rashid', role: 'Business Development, Fixels Media', quote: 'LeadSphere AI transformed how we find clients. In the first month, we identified 340 high-quality prospects and closed 3 major deals we would have never found otherwise.', rating: 5 },
  { name: 'Sarah Mitchell', role: 'Sales Director', quote: 'The AI insights are incredibly accurate. When the platform says a company needs website redesign, it\'s backed by real data — load times, bounce rates, competitor analysis. Game-changer.', rating: 5 },
  { name: 'Ravi Patel', role: 'Growth Manager', quote: 'The 3D globe view and heatmaps give us a strategic view of where the best opportunities are. We\'ve expanded to 3 new markets based purely on LeadSphere data.', rating: 5 },
]

const NAV_LINKS = ['Features', 'Intelligence', 'Pricing', 'Docs']

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden" style={{ background: '#050d1a' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-blue w-[600px] h-[600px]" style={{ top: '-200px', left: '-100px' }} />
        <div className="orb orb-purple w-[500px] h-[500px]" style={{ top: '20%', right: '-100px' }} />
        <div className="orb orb-cyan w-[400px] h-[400px]" style={{ bottom: '10%', left: '30%' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(5,13,26,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm">LeadSphere</span>
            <span className="font-bold text-sm ml-1 gradient-text">AI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-white" style={{ color: '#7a9bb5' }}>
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden sm:flex items-center text-sm font-medium transition-colors hover:text-white" style={{ color: '#7a9bb5' }}>
            Sign In
          </Link>
          <Link href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 4px 20px rgba(0,123,255,0.35)' }}>
            Start Free <ChevronRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10 text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(0,123,255,0.1)', border: '1px solid rgba(0,123,255,0.25)', backdropFilter: 'blur(10px)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: '#00D4FF' }}>Powered by Advanced AI • 180+ Countries • Real-Time Intelligence</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tight">
            <span className="text-white">Discover the World&apos;s</span>
            <br />
            <span className="gradient-text text-glow-blue">Most Valuable</span>
            <br />
            <span className="text-white">Business Opportunities</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: '#7a9bb5' }}>
            LeadSphere AI identifies companies worldwide with genuine digital transformation needs, analyzes their exact pain points, and generates the intelligence Fixels Media needs to convert them — all powered by AI.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link href="/dashboard"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #007BFF 0%, #6C63FF 100%)', boxShadow: '0 8px 32px rgba(0,123,255,0.4)' }}>
              <Zap size={20} />
              Launch Platform
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Play size={18} />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 text-xs mb-16" style={{ color: '#4a6580' }}>
            {['GDPR Compliant', 'SOC 2 Ready', 'Zero Cold Data', '256-bit Encryption'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <Shield size={11} style={{ color: '#00D4A1' }} />
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl mx-auto"
          style={{ height: 'clamp(400px, 55vw, 680px)' }}
        >
          {/* Glow ring behind globe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,123,255,0.12) 0%, transparent 70%)' }} />
          </div>

          <Globe3D />

          {/* Floating info cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 left-4 sm:left-12 glass rounded-2xl px-4 py-3 hidden sm:block"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
                <TrendingUp size={14} style={{ color: '#00D4FF' }} />
              </div>
              <div>
                <div className="text-white font-bold text-sm">342</div>
                <div className="text-xs" style={{ color: '#4a6580' }}>New York Leads</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-8 right-4 sm:right-12 glass rounded-2xl px-4 py-3 hidden sm:block"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <div>
                <div className="text-white font-bold text-sm">Hot: Dubai</div>
                <div className="text-xs" style={{ color: '#4a6580' }}>276 opportunities</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-20 left-4 sm:left-8 glass rounded-2xl px-4 py-3 hidden sm:block"
          >
            <div className="text-xs font-semibold text-white mb-1">AI Opportunity Score</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-full rounded-full" style={{ width: '87%', background: 'linear-gradient(90deg, #007BFF, #00D4FF)' }} />
              </div>
              <span className="text-xs font-bold" style={{ color: '#00D4FF' }}>87</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-24 right-4 sm:right-8 glass rounded-2xl px-4 py-3 hidden sm:block"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap size={12} style={{ color: '#ffa502' }} />
              <span className="text-xs font-semibold text-white">Intent Signal</span>
            </div>
            <div className="text-xs" style={{ color: '#4a6580' }}>Series B Funding Detected</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, color, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs" style={{ color: '#4a6580' }}>{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Natural Language Search Demo */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold" style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: '#6C63FF' }}>
              <Search size={12} />
              Natural Language AI Search
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Ask in Plain English</h2>
            <p className="text-lg mb-8" style={{ color: '#7a9bb5' }}>Just type what you&apos;re looking for — our AI understands complex business queries</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6" style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 80px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Search size={18} style={{ color: '#007BFF' }} />
              <span className="text-white font-medium">Find healthcare companies in the USA without mobile apps with 100+ employees</span>
              <div className="ml-auto w-2 h-5 bg-[#007BFF] animate-pulse rounded-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { company: 'Meridian Healthcare Group', loc: 'Chicago, IL', score: 85, signal: 'No mobile app' },
                { company: 'Rocky Mountain Health', loc: 'Denver, CO', score: 78, signal: 'Hiring Digital Lead' },
                { company: 'Coastal Medical Partners', loc: 'Miami, FL', score: 92, signal: 'Post Series A' },
              ].map((r, i) => (
                <div key={i} className="p-3 rounded-xl text-left" style={{ background: 'rgba(0,123,255,0.06)', border: '1px solid rgba(0,123,255,0.15)' }}>
                  <div className="font-semibold text-sm text-white mb-1">{r.company}</div>
                  <div className="text-xs mb-2" style={{ color: '#4a6580' }}>{r.loc}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.2)' }}>{r.signal}</span>
                    <span className="text-xs font-bold" style={{ color: '#00D4FF' }}>Score {r.score}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {['"Find e-commerce stores with slow websites"', '"Logistics companies needing ERP"', '"Startups hiring 10+ engineers"'].map(q => (
                <span key={q} className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all hover:border-[#007BFF]/50" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#7a9bb5' }}>
                  {q}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold" style={{ background: 'rgba(0,123,255,0.1)', border: '1px solid rgba(0,123,255,0.25)', color: '#007BFF' }}>
              <Cpu size={12} />
              Platform Features
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Everything You Need to Win</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#7a9bb5' }}>
              A complete business opportunity discovery ecosystem — from AI-powered intelligence to automated outreach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description, color, gradient }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`card-hover p-6 rounded-2xl bg-gradient-to-br ${gradient}`}
                style={{ border: `1px solid ${color}20` }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a9bb5' }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Find */}
      <section className="relative z-10 py-20 px-6" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Built for Fixels Media&apos;s Services</h2>
            <p className="text-lg" style={{ color: '#7a9bb5' }}>LeadSphere AI scores every prospect against each service category</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm"
                style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.08)', color: '#7a9bb5' }}
              >
                <CheckCircle2 size={14} style={{ color: '#00D4A1' }} />
                {service}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Trusted by Growth Teams</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, quote, rating }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(10,22,40,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(rating)].map((_, j) => <Star key={j} size={14} fill="#ffa502" style={{ color: '#ffa502' }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7a9bb5' }}>&quot;{quote}&quot;</p>
                <div>
                  <div className="font-semibold text-sm text-white">{name}</div>
                  <div className="text-xs" style={{ color: '#4a6580' }}>{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center rounded-3xl p-12"
          style={{ background: 'linear-gradient(135deg, rgba(0,123,255,0.12) 0%, rgba(108,99,255,0.12) 100%)', border: '1px solid rgba(0,123,255,0.2)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 10px 40px rgba(0,123,255,0.4)' }}>
            <Globe size={30} className="text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Ready to Discover the World&apos;s Best Opportunities?</h2>
          <p className="text-lg mb-8" style={{ color: '#7a9bb5' }}>
            Join Fixels Media&apos;s intelligence-driven approach to business development. LeadSphere AI is ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)', boxShadow: '0 8px 32px rgba(0,123,255,0.4)' }}>
              <Zap size={20} /> Launch Platform <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #6C63FF)' }}>
              <Globe size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm text-white">LeadSphere AI</span>
            <span className="text-xs" style={{ color: '#4a6580' }}>by Fixels Media</span>
          </div>
          <div className="text-xs" style={{ color: '#4a6580' }}>© 2026 Fixels Media. All rights reserved. GDPR & CCPA Compliant.</div>
        </div>
      </footer>
    </div>
  )
}
