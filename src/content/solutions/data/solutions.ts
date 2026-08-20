import type { SolutionPageData } from "@/content/solutions/types";

const solutionSeeds: Array<{ slug: string; title: string; summary: string }> = [
  { slug: "inventory-management", title: "Inventory Management", summary: "Inventory systems, WMS integrations and stock control." },
  { slug: "crm", title: "CRM Solutions", summary: "Customer data platforms, pipeline automation and sales workflows." },
  { slug: "hrms", title: "HRMS", summary: "People ops, payroll integrations and employee lifecycle management." },
  { slug: "erp", title: "ERP Solutions", summary: "Unified finance, inventory and operations platforms." },
  { slug: "accounting", title: "Accounting Software", summary: "Financial ledgers, reporting and regulatory compliance." },
  { slug: "pos-systems", title: "POS Systems", summary: "Point-of-sale platforms and payment integrations." },
  { slug: "ecommerce-platforms", title: "Ecommerce Platforms", summary: "Headless commerce and marketplace integrations." },
  { slug: "booking-systems", title: "Booking Systems", summary: "Reservation and scheduling platforms for services." },
  { slug: "marketplace-platforms", title: "Marketplace Platforms", summary: "Multi-vendor commerce and onboarding workflows." },
  { slug: "business-analytics", title: "Business Analytics", summary: "BI, dashboards and decision intelligence." },
  { slug: "ai-assistant", title: "AI Assistant", summary: "Conversational assistants and LLM-driven workflows." },
  { slug: "voice-assistant", title: "Voice Assistant", summary: "Voice interfaces, IVR and speech automation." },
  { slug: "knowledge-management-system", title: "Knowledge Management System", summary: "Document search, RAG and knowledge graphs." },
];

const buildSolution = (seed: { slug: string; title: string; summary: string }): SolutionPageData => {
  const title = seed.title;
  // per-solution overrides for richer SEO and related mappings
  const overrides: Record<string, Partial<Pick<SolutionPageData, "keywords" | "faq" | "relatedServices" | "relatedSolutions" | "supportedIndustries">>> = {
    erp: {
      keywords: { primary: ["ERP Software Company", "Custom ERP Development", "Manufacturing ERP"], secondary: ["ERP integration", "cloud ERP"], semantic: ["operational planning", "inventory control"] },
      faq: [{ question: "Can ERP be integrated with existing inventory systems?", answer: "Yes — we design canonical models and ETL/real-time sync based on consistency requirements." }],
      relatedServices: ["erp-development", "api-development"],
      relatedSolutions: ["inventory-management", "accounting"],
      supportedIndustries: ["manufacturing", "retail", "finance"],
    },
    crm: {
      keywords: { primary: ["CRM Software Company", "Custom CRM Development"], secondary: ["sales automation", "customer data platform"], semantic: ["pipeline automation", "lead management"] },
      faq: [{ question: "Can you migrate data from legacy CRMs?", answer: "Yes — we provide migration tooling and mapping to preserve history and data integrity." }],
      relatedServices: ["crm-development", "api-development"],
      relatedSolutions: ["marketplace-platforms", "ecommerce-platforms"],
      supportedIndustries: ["retail", "finance", "hospitality"],
    },
    "ai-assistant": {
      keywords: { primary: ["AI Assistant Development", "Enterprise AI Assistant"], secondary: ["RAG assistant", "LLM assistant"], semantic: ["conversational AI", "workflow automation"] },
      faq: [{ question: "How do you handle data privacy for AI assistants?", answer: "We implement data minimization, encryption, and retrieval policies to limit exposure and improve grounding." }],
      relatedServices: ["ai-consulting", "rag-systems"],
      relatedSolutions: ["knowledge-management-system", "business-analytics"],
      supportedIndustries: ["healthcare", "finance", "education"],
    },
  };

  const ov = overrides[seed.slug] ?? {};

  return {
    slug: seed.slug,
    title,
    h1: `${title} Software & Platforms`,
    summary: seed.summary,
    intro: `${title} platforms built for reliability, scale and integration across enterprise landscapes.`,
    metaTitle: `${title} Software Development Company`,
    metaDescription: `${seed.summary} Kotnala Consultancy delivers customizable ${title.toLowerCase()} platforms and integrations.`,
    keywords: ov.keywords ?? { primary: [`${title} Software`, `${title} Platform`], secondary: [`Custom ${title} Development`, `${title} integration`], semantic: [`${title.toLowerCase()} architecture`, `${title.toLowerCase()} features`] },
    problem: `Organisations need robust ${title.toLowerCase()} platforms to avoid data fragmentation and manual reconciliation.`,
    overview: `Kotnala designs ${title} with integration-first architecture, operational visibility and strong data guarantees.`,
    coreFeatures: ["API-first architecture", "Role-based access", "Audit & compliance", "Reporting & dashboards"],
    businessBenefits: ["Lower operational cost", "Faster decision cycles", "Improved customer experience"],
    technologyStack: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Next.js"],
    implementationProcess: ["Discovery & scoping", "Integration design", "Incremental delivery", "QA & compliance"],
    supportedIndustries: ov.supportedIndustries ?? ["manufacturing", "retail", "healthcare", "finance"],
    relatedServices: ov.relatedServices ?? ["erp-development", "api-development"],
    relatedSolutions: ov.relatedSolutions ?? ["inventory-management", "accounting"],
    caseStudy: {
      clientType: "Enterprise customer",
      problem: "Disconnected systems and manual reconciliation",
      solution: "Unified platform with canonical data model and real-time integrations.",
      outcome: "Significant reduction in manual effort and faster reporting.",
    },
    faq: ov.faq ?? generateSolutionFaqs(title),
    ctaTitle: `Ship a reliable ${title} platform`,
    ctaDescription: "Talk to our platform architects to design a robust implementation path.",
  };
};

export const solutionsCatalog: SolutionPageData[] = solutionSeeds.map(buildSolution);

export const solutionsBySlug: Record<string, SolutionPageData> = Object.fromEntries(
  solutionsCatalog.map((s) => [s.slug, s]),
);

export const getAllSolutions = (): SolutionPageData[] => solutionsCatalog;

export const getSolutionBySlug = (slug: string): SolutionPageData | undefined => solutionsBySlug[slug];

export const getRelatedSolutions = (slug: string, limit = 5): SolutionPageData[] =>
  solutionsCatalog.filter((s) => s.slug !== slug).slice(0, limit);

function generateSolutionFaqs(title: string) {
  return [
    {
      question: `What business problems does a ${title} platform solve?`,
      answer:
        `${title} platforms reduce manual reconciliation, centralise data and provide operational visibility for decision-makers. Kotnala focuses on aligning the platform to core business processes—improving throughput, reducing errors and enabling automation. By consolidating data and providing dashboards and APIs, organisations can make faster decisions, reduce headcount devoted to manual tasks, and scale processes without proportionate cost increases.`,
    },
    {
      question: `How long does it typically take to implement a ${title} solution?`,
      answer:
        `Implementation timelines depend on integration complexity, data migration and customisation. For many ${title} scopes, a phased delivery model allows an initial production milestone within 3–6 months, followed by iterative enhancements. Kotnala provides a roadmap and milestones during discovery so stakeholders have clarity on timelines, dependencies and go-live readiness.`,
    },
    {
      question: `Can a ${title} integrate with our existing enterprise systems?`,
      answer:
        `Yes. Kotnala designs integration layers—APIs, event streams and ETL pipelines—to connect ${title} with ERPs, CRMs, payment gateways and third-party services. We prioritise data contracts, idempotency and observability so integrations remain robust as you scale. This reduces duplicate work and ensures a single source of truth across systems.`,
    },
    {
      question: `How customisable is a ${title} platform to our business workflows?`,
      answer:
        `A ${title} platform should be built to reflect domain-specific processes. Kotnala uses a modular architecture enabling configuration of workflows, role-based access and business rules without heavy engineering for every change. When deep customisation is required, we scope it into incremental sprints so business users validate behaviour early and continuously.`,
    },
    {
      question: `Does ${title} support AI or automation capabilities later?`,
      answer:
        `Most ${title} platforms can be made AI-ready by ensuring data quality, instrumentation and a centralised data layer. Kotnala embeds telemetry and structured data pipelines so predictive models, RAG assistants or automation workflows can be added non-disruptively. We recommend starting with high-impact pilots and operationalising successful models into the platform.`,
    },
    {
      question: `What cloud and deployment options are available for ${title}?`,
      answer:
        `${title} solutions can be deployed on cloud providers (AWS, Azure, GCP), private cloud or hybrid architectures depending on compliance and latency requirements. Kotnala advises on the right model—balancing cost, security and performance—and automates deployments via CI/CD, infrastructure-as-code and observability tooling to support repeatable releases.`,
    },
    {
      question: `Which industries commonly benefit from ${title} platforms?`,
      answer:
        `${title} platforms are widely used across manufacturing, retail, finance, healthcare and logistics where transactional reliability and integration are critical. Kotnala maps common industry needs to platform capabilities during discovery so the solution supports domain requirements like compliance, auditability and scale.`,
    },
  ];
}

