export type IndustryKeywordCluster = {
  primary: string[];
  secondary: string[];
  semantic: string[];
};

export type IndustryFaqItem = {
  question: string;
  answer: string;
};

export type IndustryCaseStudy = {
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
};

export type IndustryPageData = {
  slug: string;
  title: string;
  h1: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: IndustryKeywordCluster;
  overview: string;
  challenges: string[];
  howKotnalaSolves: string[];
  recommendedServices: string[];
  recommendedSolutions: string[];
  technologyStack: string[];
  businessBenefits: string[];
  developmentProcess: string[];
  caseStudy: IndustryCaseStudy;
  whyKotnala: string[];
  faq: IndustryFaqItem[];
  relatedIndustries: string[];
  relatedServices: string[];
  relatedSolutions: string[];
  ctaTitle: string;
  ctaDescription: string;
};
