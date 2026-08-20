import type { IndustryPageData } from "@/content/industries/types";

const industrySeeds: Array<{ slug: string; title: string; summary: string }> = [
  { slug: "healthcare", title: "Healthcare", summary: "Digital transformation, HIPAA-ready systems, and clinical workflow automation." },
  { slug: "finance", title: "Finance", summary: "Financial systems, payments, compliance, and fintech integrations." },
  { slug: "insurance", title: "Insurance", summary: "Policy systems, claims automation, and underwriting platforms." },
  { slug: "manufacturing", title: "Manufacturing", summary: "Factory automation, ERP, MES, and IoT-ready software." },
  { slug: "retail", title: "Retail", summary: "Omnichannel commerce, POS, inventory and marketplace integrations." },
  { slug: "real-estate", title: "Real Estate", summary: "Property management, listings platforms and tenant workflows." },
  { slug: "education", title: "Education", summary: "Learning platforms, LMS integrations, and edtech products." },
  { slug: "construction", title: "Construction", summary: "Project management, field operations, and compliance tooling." },
  { slug: "logistics", title: "Logistics", summary: "TMS, route optimization, and warehouse inventory systems." },
  { slug: "hospitality", title: "Hospitality", summary: "Booking systems, PMS, and guest experience platforms." },
  { slug: "legal", title: "Legal", summary: "Document workflows, knowledge management and matter management." },
  { slug: "government", title: "Government", summary: "Secure, compliant systems for public sector and civic apps." },
  { slug: "automotive", title: "Automotive", summary: "Connected vehicle platforms, supply chain and dealer portals." },
];

const industryOverrides: Record<
  string,
  Partial<Pick<IndustryPageData, "keywords" | "faq" | "relatedIndustries" | "recommendedServices" | "recommendedSolutions">>
> = {
  healthcare: {
    keywords: {
      primary: ["Healthcare Software Development Company", "Healthcare ERP", "Hospital Management Software"],
      secondary: ["HIPAA compliant software", "Clinical workflow automation"],
      semantic: ["electronic health records", "clinical decision support"],
    },
    faq: [
      { question: "Do you build HIPAA-ready systems?", answer: "Yes — we design for compliance, audit trails, and secure data handling by default." },
      { question: "Can you integrate with popular EHRs?", answer: "We provide API-first integrations and custom adapters for major EHR vendors." },
    ],
    recommendedServices: ["enterprise-software-development", "ai-consulting", "cloud-devops"],
    recommendedSolutions: ["erp", "knowledge-management-system", "ai-assistant"],
  },
  manufacturing: {
    keywords: {
      primary: ["Manufacturing ERP", "Factory Automation Software", "MES Software"],
      secondary: ["production planning", "IoT manufacturing"],
      semantic: ["shop floor automation", "SCADA integration"],
    },
    faq: [
      { question: "Do you integrate with PLCs and OT systems?", answer: "Yes — we build secure edge integrations and telemetry pipelines for OT systems." },
    ],
    recommendedServices: ["erp-development", "api-development", "cloud-devops"],
    recommendedSolutions: ["erp", "inventory-management", "business-analytics"],
  },
  finance: {
    keywords: {
      primary: ["Finance Software Development", "Fintech Integrations", "Payment Gateway Integration"],
      secondary: ["regulatory compliance", "reconciliation automation"],
      semantic: ["ledger systems", "financial reporting"],
    },
    faq: [
      { question: "Can you help with PCI compliance?", answer: "We advise on PCI scope reduction and secure payment integrations." },
    ],
    recommendedServices: ["accounting-software", "api-development", "cloud-devops"],
    recommendedSolutions: ["accounting", "erp", "business-analytics"],
  },
  retail: {
    keywords: {
      primary: ["Retail POS Software", "Omnichannel Commerce Platform", "Retail Inventory Management"],
      secondary: ["point of sale", "omnichannel retail"],
      semantic: ["payments", "stock reconciliation"],
    },
    faq: [
      { question: "Do you support POS hardware integrations?", answer: "Yes — integrations with modern POS hardware and payment providers are supported." },
    ],
    recommendedServices: ["pos-systems", "ecommerce-platforms", "inventory-management"],
    recommendedSolutions: ["pos-systems", "inventory-management", "ecommerce-platforms"],
  },
};

const buildIndustry = (seed: { slug: string; title: string; summary: string }): IndustryPageData => {
  const title = seed.title;
  const override = industryOverrides[seed.slug] ?? {};

  const defaultKeywords = {
    primary: [`${title} Software Development Company`, `${title} ERP`, `${title} Software`],
    secondary: [`${title} digital transformation`, `${title} workflow automation`],
    semantic: [`${title.toLowerCase()} systems`, `${title.toLowerCase()} compliance`],
  };

  return {
    slug: seed.slug,
    title,
    h1: `${title} Software & Solutions`,
    summary: seed.summary,
    intro: `${title} digital transformation and enterprise software solutions tailored for ${title.toLowerCase()} organisations.`,
    metaTitle: `${title} Software Development Company`,
    metaDescription: `${seed.summary} Kotnala Consultancy builds compliant, scalable, and secure software for the ${title} sector.`,
    keywords: override.keywords ?? defaultKeywords,
    overview: `Kotnala Consultancy delivers enterprise-grade software for ${title} organisations, combining domain knowledge with secure engineering practices.`,
    challenges: [
      `Data silos and integration complexity`,
      `Regulatory and compliance requirements`,
      `Legacy systems and migration risk`,
    ],
    howKotnalaSolves: [
      `Business-aligned discovery and compliance-first design`,
      `API-first integrations and data platform consolidation`,
      `Incremental delivery with governance and testing`,
    ],
    recommendedServices: override.recommendedServices ?? ["custom-software-development", "ai-consulting", "cloud-devops"],
    recommendedSolutions: override.recommendedSolutions ?? ["erp", "crm", "knowledge-management-system"],
    technologyStack: ["TypeScript", "Node.js", "PostgreSQL", "Next.js", "AWS"],
    businessBenefits: [
      "Improved operational visibility",
      "Reduced manual effort through automation",
      "Faster compliance and reporting",
    ],
    developmentProcess: ["Discovery", "Architecture & Roadmap", "Implementation", "QA & Security", "Optimization"],
    caseStudy: {
      clientType: "Mid-market enterprise",
      problem: `Fragmented systems and slow operational workflows in ${title} context.`,
      solution: `Phased platform implementation integrating core transactional systems, data lakes and AI-driven automation.`,
      outcome: "Reduced cycle times and improved data accuracy across operations.",
    },
    whyKotnala: ["Domain-led engineering", "Security and compliance by default", "Senior architecture involvement"],
    faq: override.faq ?? generateIndustryFaqs(title),
    relatedIndustries: override.relatedIndustries ?? [],
    relatedServices: override.recommendedServices ?? ["enterprise-software-development", "api-development"],
    relatedSolutions: override.recommendedSolutions ?? ["erp", "hrms"],
    ctaTitle: `Build ${title} software that scales`,
    ctaDescription: "Book a strategy call to discuss compliance, integration and delivery for your organisation.",
  };
};

function generateIndustryFaqs(title: string) {
  return [
    {
      question: `How should ${title} organisations plan a digital transformation with minimal operational risk?`,
      answer:
        `Start with a tightly scoped discovery that maps high-value workflows, data owners and compliance requirements. Kotnala recommends phased delivery: run an initial pilot on a critical process, stabilise integrations with canonical data contracts, then expand incrementally. This approach delivers measurable ROI early, reduces migration risk, and maintains business continuity. We emphasise testable interfaces, feature toggles and strong rollback plans so transformation proceeds safely while teams adapt to new automation and reporting capabilities.`,
    },
    {
      question: `What are the typical integration pitfalls in ${title} systems and how do you mitigate them?`,
      answer:
        `Common pitfalls include inconsistent schemas, undocumented legacy interfaces and lack of observability. Kotnala mitigates these by designing a canonical data layer, building adapters for legacy protocols, and implementing API gateways and event-driven patterns where appropriate. We enforce idempotent syncs, schema validation and end-to-end monitoring to detect drift early. These practices reduce reconciliation overhead and improve trust in downstream reporting and automation.`,
    },
    {
      question: `How can Kotnala help ${title} teams adopt AI while maintaining compliance and data security?`,
      answer:
        `Kotnala builds AI capabilities with privacy and compliance as first-class concerns. We design data minimisation, anonymisation and role-based access into pipelines, choose private or VPC-hosted model inference when needed, and provide audit trails for model inputs and outputs. Pilot projects focus on narrow, high-impact use cases—like predictive maintenance or demand forecasting—so you can validate outcomes and governance before wider rollout.`,
    },
    {
      question: `What is a realistic timeline for an ERP or core systems implementation in a ${title} context?`,
      answer:
        `Timelines depend on scope, integrations and compliance scope. For many ${title} mid-market projects, an initial production milestone can be reached in 3–6 months using a phased approach (core transactions, key integrations, reporting). Full enterprise rollouts with extensive data migration and legacy rework typically span 6–12 months. Kotnala provides a delivery roadmap after discovery with clear milestones, acceptance criteria and mitigation plans.`,
    },
    {
      question: `How do you design ${title} applications for scale and predictable performance?`,
      answer:
        `Scalability begins at the architecture level: decouple concerns into bounded contexts, prefer stateless services for horizontal scaling, and use async processing for heavy workloads. Kotnala designs capacity plans, autoscaling policies and instrumentation from day one, and runs load tests to validate SLOs. Caching, read replicas and query optimisation are applied strategically to ensure consistent latency under peak loads.`,
    },
    {
      question: `Which security and compliance controls are critical for ${title} software projects?`,
      answer:
        `Critical controls include secure SDLC practices, threat modelling, RBAC, encryption in transit and at rest, and comprehensive audit logging. Kotnala maps regulatory obligations into the design—such as data residency or sector-specific controls—and automates compliance checks and vulnerability scanning. These measures reduce breach risk and simplify audits while enabling secure feature delivery.`,
    },
    {
      question: `What is Kotnala's recommended approach to modernising legacy systems in the ${title} sector?`,
      answer:
        `We favour incremental modernisation: preserve business continuity by introducing adapters, implement the strangler pattern to gradually replace legacy components, and migrate data using validated ETL runs with reconciliation checks. Kotnala pairs this with governance and testing to avoid regressions, enabling organisations to move to modular, cloud-ready architectures without disruptive big-bang cuts.`,
    },
  ];
}

export const industriesCatalog: IndustryPageData[] = industrySeeds.map(buildIndustry);

export const industriesBySlug: Record<string, IndustryPageData> = Object.fromEntries(
  industriesCatalog.map((i) => [i.slug, i]),
);

export const getAllIndustries = (): IndustryPageData[] => industriesCatalog;

export const getIndustryBySlug = (slug: string): IndustryPageData | undefined => industriesBySlug[slug];

export const getRelatedIndustries = (slug: string, limit = 5): IndustryPageData[] =>
  industriesCatalog.filter((i) => i.slug !== slug).slice(0, limit);
