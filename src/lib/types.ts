export interface Lead {
  id: string
  company: string
  website: string
  industry: string
  sector: string
  location: string
  country: string
  countryCode: string
  employees: string
  revenue: string
  founded: string
  description: string
  score: number
  scoreCategory: 'hot' | 'warm' | 'cold'
  opportunities: {
    website: OpportunityScore
    mobile: OpportunityScore
    erp: OpportunityScore
    marketing: OpportunityScore
    outsourcing: OpportunityScore
  }
  contacts: Contact[]
  social: SocialProfiles
  techStack: string[]
  intentSignals: IntentSignal[]
  lastActivity: string
  addedDate: string
  websiteScore: number
  seoScore: number
  mobileScore: number
  performanceScore: number
  securityScore: number
  aiInsight: string
  fundingStage?: string
  fundingAmount?: string
}

export interface OpportunityScore {
  score: number
  label: string
  insights: string[]
  impact: string
  priority: 'high' | 'medium' | 'low'
}

export interface Contact {
  name: string
  role: string
  email?: string
  linkedin?: string
  avatar?: string
}

export interface SocialProfiles {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
}

export interface IntentSignal {
  type: 'hiring' | 'funding' | 'tech-change' | 'website-update' | 'expansion' | 'launch'
  description: string
  date: string
  strength: 'strong' | 'medium' | 'weak'
}

export interface DashboardStats {
  totalLeads: number
  hotLeads: number
  warmLeads: number
  coldLeads: number
  opportunities: number
  pipelineValue: string
  conversionRate: number
  newThisWeek: number
  outreachSent: number
  responseRate: number
}

export interface OutreachTemplate {
  id: string
  name: string
  type: 'email' | 'linkedin' | 'followup'
  subject?: string
  body: string
  tags: string[]
}

export interface GlobeOpportunity {
  lat: number
  lng: number
  city: string
  country: string
  count: number
  industries: string[]
  marketSize: string
  color: string
}
