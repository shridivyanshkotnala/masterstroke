export type ServiceCategorySlug =
  | "software-development"
  | "ai-development"
  | "web-development"
  | "mobile-app-development"
  | "cloud-devops"
  | "business-technology-services";

export type ServiceKeywordCluster = {
  primary: string[];
  secondary: string[];
  semantic: string[];
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceCaseStudy = {
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
};

export type ServicePageData = {
  slug: string;
  category: ServiceCategorySlug;
  categoryTitle: string;
  categoryDescription: string;
  title: string;
  h1: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: ServiceKeywordCluster;
  problemStatement: string;
  whyNeed: string;
  approach: string[];
  capabilities: string[];
  technologyStack: string[];
  industriesServed: string[];
  businessBenefits: string[];
  deliveryProcess: string[];
  caseStudy: ServiceCaseStudy;
  whyKotnala: string[];
  faq: ServiceFaqItem[];
  ctaTitle: string;
  ctaDescription: string;
};

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  title: string;
  description: string;
};
