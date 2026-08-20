export type SolutionKeywordCluster = {
  primary: string[];
  secondary: string[];
  semantic: string[];
};

export type SolutionFaqItem = {
  question: string;
  answer: string;
};

export type SolutionCaseStudy = {
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
};

export type SolutionPageData = {
  slug: string;
  title: string;
  h1: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: SolutionKeywordCluster;
  problem: string;
  overview: string;
  coreFeatures: string[];
  businessBenefits: string[];
  technologyStack: string[];
  implementationProcess: string[];
  supportedIndustries: string[];
  relatedServices: string[];
  relatedSolutions: string[];
  caseStudy: SolutionCaseStudy;
  faq: SolutionFaqItem[];
  ctaTitle: string;
  ctaDescription: string;
};
