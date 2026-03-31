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
  challenge: string;
  solution: string;
  resultSummary: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  timeline: {
    month: string;
    task: string;
  }[];
}
