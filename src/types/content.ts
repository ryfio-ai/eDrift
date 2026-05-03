export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: 'technical-guides' | 'oem-resources' | 'industry-insights';
  author: string;
  readingTime: string;
  excerpt: string;
  content: string;
  keywords: string[];
  featuredImage: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  category: string;
  tagBadge: string;
  headline: string;
  subheadline: string;
  meta: {
    industry: string;
    type: string;
    technology: string;
    status: string;
  };
  keyMetrics: {
    value: string;
    label: string;
    sub?: string;
  }[];
  clientOverview: {
    content: string;
    profile: { label: string; value: string }[];
  };
  challenge: {
    content: string;
    bullets: string[];
  };
  technicalConstraints?: {
    content: string;
    tables: {
      title: string;
      rows: { label: string; value: string }[];
    }[];
  };
  designApproach: {
    content: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  semiconductors?: {
    content: string;
    table: {
      headers: string[];
      rows: string[][];
    };
    rationale: string[];
    selected: { stage: string; device: string }[];
  };
  efficiency?: {
    content: string;
    table: { load: string; baseline: string; design: string }[];
    summary: string[];
  };
  thermal?: {
    content: string;
    strategy: string;
    path: string;
    measurements: {
      device: string;
      baseline: string;
      design: string;
      improvement: string;
    }[];
    result: string;
  };
  powerDensity?: {
    content: string;
    metrics: { label: string; baseline: string; design: string }[];
    recoveryPoints: string[];
    outcome: string;
  };
  validation?: {
    content: string;
    tables: {
      title: string;
      rows: { test: string; result: string }[];
    }[];
  };
  deployment: {
    content: string;
    metrics: { label: string; value: string }[];
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedLinks: {
    label: string;
    href: string;
  }[];
}

export interface Newsletter {
  issueNumber: number;
  title: string;
  slug: string;
  date: string;
  subject: string;
  preheader: string;
  excerpt: string;
  content: string;
  topics: string[];
  featuredImage?: string;
}
