export const STAGES = ['MQL', 'SQL', 'Champion', 'Stalled'] as const;
export type Stage = (typeof STAGES)[number];

export const SIGNALS = [
  'Series B Funding',
  'Hired New VP',
  'Job Posting',
  'Visited Pricing Page',
  'LinkedIn Post',
] as const;
export type Signal = (typeof SIGNALS)[number];

export const GOALS = ['Open Relationship', 'Book Meeting', 'Re-engage', 'Close Deal'] as const;
export type Goal = (typeof GOALS)[number];

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  ANALYTICS: '/analytics',
  KNOWLEDGE_BASE: '/knowledge-base',
  MARKETING_EVENTS: '/marketing-events',
  TEMPLATES: '/templates',
  WEBINARS: '/webinars',
  REPORTS: '/reports',
  PLAYBOOKS: '/playbooks',
  CASE_STUDIES: '/case-studies',
  ROADMAP: '/roadmap',
  CHANGELOG: '/changelog',
  INTEGRATIONS: '/integrations',
  COMMUNITY: '/community',
  SUPPORT: '/support',
  ACADEMY: '/academy',
  PARTNERS: '/partners',
  SECURITY: '/security',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'nxl:auth:token',
  SIDEBAR_COLLAPSED: 'nxl:sidebar:collapsed',
} as const;

export const PAGE_SIZE = 4;
export const SEARCH_DEBOUNCE_MS = 300;

export const BREAKPOINTS = {
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
} as const;
