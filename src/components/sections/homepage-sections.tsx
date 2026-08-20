import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import {
  ArrowRight,
  Building2,
  Factory,
  HeartPulse,
  Landmark,
  Package,
  School,
  Star,
  Store,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { HomeHeroSection } from "@/components/sections/home-hero";
import { EngineeringProcessPipeline } from "./engineering-process-pipeline";
import { TestimonialExecutivePhoto } from "./testimonial-executive-photo";
import { TrustedLogoWall } from "@/components/sections/trusted-logo-wall";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trustedByEntries = [
  {
    name: "HP",
    src: "/logos/clients/hp.svg",
    solution: "Global IT Infrastructure Evolution",
  },
  {
    name: "Sony",
    src: "/logos/clients/sony.svg",
    solution: "Digital Media Operations Platform",
  },
  {
    name: "Amazon",
    src: "/logos/clients/amazon.svg",
    solution: "Scalable Commerce Workflow Engineering",
  },
  {
    name: "Larsen & Toubro (L&T)",
    src: "/logos/clients/lt.svg",
    solution: "Industrial Process Modernization",
  },
  {
    name: "Wells Fargo",
    src: "/logos/clients/wells-fargo.svg",
    solution: "Secure Financial Systems Architecture",
  },
  {
    name: "HDFC Bank",
    src: "/logos/clients/hdfc.svg",
    solution: "Banking Operations Automation",
  },
  {
    name: "Citi",
    src: "/logos/clients/citi.svg",
    solution: "Cross-border Data and Risk Workflow",
  },
  {
    name: "HubSpot",
    src: "/logos/clients/hubspot.svg",
    solution: "CRM and Revenue Intelligence Enhancements",
  },
  {
    name: "Nike",
    src: "/logos/clients/nike.svg",
    solution: "Omnichannel Experience Infrastructure",
  },
  {
    name: "ITC",
    src: "/logos/clients/itc.svg",
    solution: "Enterprise Resource Process Transformation",
  },
  {
    name: "Marriott International",
    src: "/logos/clients/marriott.svg",
    solution: "Hospitality Platform Reliability Uplift",
  },
] as const;

const businessImpactMetrics = [
  {
    value: "950+",
    label: "Projects Delivered",
  },
  {
    value: "130+",
    label: "ERP Systems Managed",
  },
  {
    value: "350+",
    label: "Businesses Trusted",
  },
  {
    value: "12+ Years",
    label: "Building Enterprise Software",
  },
] as const;

const services = [
  {
    title: "AI Development",
    problem: "Manual operations and fragmented decision flows reduce team velocity.",
    value:
      "Design and deploy AI agents, LLM workflows, and automation pipelines that lower operational load and improve response time.",
    cta: "Explore AI Consulting",
    href: "/services/ai-consulting",
  },
  {
    title: "Enterprise Software Engineering",
    problem: "Legacy systems slow down scaling, integration, and reporting.",
    value:
      "Build resilient software platforms with secure architecture, measurable reliability, and modular capabilities for long-term growth.",
    cta: "View Engineering Services",
    href: "/services/custom-software-development",
  },
  {
    title: "Cloud & Platform Modernization",
    problem: "Unoptimized infrastructure creates downtime risk and rising costs.",
    value:
      "Modernize workloads with cloud-native patterns, observability, and deployment automation to improve performance and predictability.",
    cta: "See Cloud Solutions",
    href: "/services/aws-consulting",
  },
] as const;

const industries = [
  {
    name: "Healthcare",
    icon: HeartPulse,
    summary: "Compliant systems for care operations, interoperability, and patient workflow reliability.",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    summary: "Digital operations for production planning, maintenance visibility, and supply chain control.",
  },
  {
    name: "Finance",
    icon: Landmark,
    summary: "Security-first platforms for approvals, reporting, auditability, and risk-aware automation.",
  },
  {
    name: "Retail",
    icon: Store,
    summary: "Connected commerce systems that unify inventory, customer journeys, and analytics.",
  },
  {
    name: "Construction",
    icon: Building2,
    summary: "Project tracking and workforce workflows tailored to multi-site execution complexity.",
  },
  {
    name: "Real Estate",
    icon: Package,
    summary: "Data-driven leasing, asset lifecycle management, and portfolio performance visibility.",
  },
  {
    name: "Logistics",
    icon: Package,
    summary: "Operational intelligence for routing, fulfillment speed, and cross-system coordination.",
  },
  {
    name: "Education",
    icon: School,
    summary: "Scalable digital platforms for learners, administrators, and measurable outcomes.",
  },
] as const;

const challenges = [
  "Manual processes and repeated data entry",
  "Legacy software that is difficult to scale",
  "Fragmented systems across teams",
  "Slow reporting and low visibility",
  "Inconsistent customer and internal workflows",
  "Limited use of AI and automation",
] as const;

const engineeringWorkflow = [
  {
    id: 1,
    title: "Technical Consulting",
  },
  {
    id: 2,
    title: "UI/UX Consultation",
  },
  {
    id: 3,
    title: "Development",
  },
  {
    id: 4,
    title: "Alpha & Beta Testing",
  },
  {
    id: 5,
    title: "Deployment",
  },
  {
    id: 6,
    title: "CTO-as-a-Service Support",
  },
] as const;

const caseStudies = [
  {
    client: "Pratham International",
    problem: "Pricing decisions took days due to manual calculations and disconnected data sources.",
    solution:
      "Delivered an AI-assisted pricing platform with scenario analysis, approval workflows, and role-based dashboards.",
    outcome: "Reduced pricing turnaround from days to hours and improved confidence in margin decisions.",
    stack: "Next.js, Python, OpenAI, PostgreSQL",
    href: "/case-studies/pratham-international-pricing-platform",
  },
  {
    client: "Fimansy Consulting",
    problem: "Finance operations depended on spreadsheet-heavy approvals and siloed updates.",
    solution:
      "Built a finance automation suite with process orchestration, audit logs, and real-time KPI monitoring.",
    outcome: "Cut manual reconciliation time and enabled faster executive reporting cycles.",
    stack: "React, Node.js, Redis, AWS",
    href: "/case-studies/fimansy-finance-automation",
  },
  {
    client: "ECI Promise",
    problem: "Public service request workflows lacked transparency and measurable status tracking.",
    solution:
      "Engineered a civic-tech platform with multi-channel intake, SLA tracking, and service intelligence.",
    outcome: "Improved response consistency and stakeholder visibility across service operations.",
    stack: "Next.js, TypeScript, PostgreSQL, Azure",
    href: "/case-studies/eci-promise-civictech-platform",
  },
] as const;

const enterpriseCertifications = [
  {
    name: "ISO 27001",
    description: "Information Security Management",
    logo: "/assets/certifications/iso-27001-mark.svg",
    alt: "ISO 27001 Information Security Management certification mark",
  },
  {
    name: "ISO 9001",
    description: "Quality Management System",
    logo: "/assets/certifications/iso-9001-mark.svg",
    alt: "ISO 9001 Quality Management System certification mark",
  },
  {
    name: "ISO/IEC 20000-1",
    description: "IT Service Management",
    logo: "/assets/certifications/iso-20000-1-mark.svg",
    alt: "ISO IEC 20000-1 IT Service Management certification mark",
  },
  {
    name: "SOC 2 Type II",
    description: "Security, Availability & Confidentiality Controls",
    logo: "/assets/certifications/soc-2-type-ii-mark.svg",
    alt: "SOC 2 Type II security availability and confidentiality controls mark",
  },
] as const;

const whyKotnala = [
  "Strategic CTO Guidance",
  "Business-driven Engineering",
  "Enterprise Architecture Expertise",
  "AI-powered Digital Transformation",
  "Continuous Innovation & Support",
  "Security Built into Every Layer",
  "Transparent Communication",
  "Long-term Growth Partnership",
] as const;

export const homeFaqItems = [
  {
    question: "What types of software projects does Kotnala Consultancy typically deliver?",
    answer:
      "Kotnala Consultancy designs and delivers enterprise-grade software solutions tailored to business growth and operational excellence. Our expertise includes ERP systems, CRM platforms, accounting and finance software, SaaS products, enterprise web and mobile applications, AI-powered automation, Agentic AI systems, OCR and intelligent document processing solutions, workflow automation platforms, cloud modernization initiatives, data warehousing, business intelligence, and data-centric digital transformation projects.",
  },
  {
    question: "Who is Kotnala?",
    answer:
      "Kotnala Consultancy is an enterprise software development and AI consulting company that helps startups, SMEs, and enterprises build scalable digital products through our CTO-as-a-Service model, specializing in ERP, CRM, SaaS, AI, automation, and custom enterprise software.",
  },
  {
    question: "Do you work only with enterprise clients?",
    answer:
      "We partner with startups, SMEs, and enterprise teams when the project has clear business objectives and a commitment to engineering quality.",
  },
  {
    question: "How does Kotnala approach AI implementation for businesses?",
    answer:
      "We begin with a business process audit, identify high-impact use cases, validate feasibility, and then build secure AI workflows with measurable outcomes.",
  },
  {
    question: "Can you modernize legacy systems without full replacement?",
    answer:
      "Yes. We often use phased modernization strategies that reduce disruption by progressively upgrading architecture, integrations, and user-facing layers.",
  },
  {
    question: "What industries does Kotnala have experience serving?",
    answer:
      "Kotnala Consultancy delivers technology solutions across healthcare, manufacturing, finance, banking, retail, jewellery, real estate, construction, logistics, education, hospitality, eCommerce, professional services, and startups.",
  },
  {
    question: "What happens during the strategy call with Kotnala?",
    answer:
      "We align on business goals, map your current systems, identify delivery risks, define priorities, and outline practical next steps for execution.",
  },
  {
    question: "How does Kotnala ensure delivery transparency?",
    answer:
      "We use milestone-based planning, written technical decisions, periodic demos, and measurable success criteria tied to business outcomes.",
  },
  {
    question: "Does Kotnala provide architecture and consulting without full development?",
    answer:
      "Yes. We offer architecture reviews, technical audits, AI strategy, cloud assessments, and advisory engagements.",
  },
  {
    question: "Can your team integrate with in-house developers?",
    answer:
      "Absolutely. We collaborate with internal teams through clear ownership boundaries, shared standards, and practical documentation.",
  },
  {
    question: "What technology stack does Kotnala usually recommend?",
    answer:
      "Stack choices are context-driven, but we commonly use Next.js, React, React Native, Node.js, Django, SpringBoot, Python, PostgreSQL, Redis, Docker, and major cloud platforms.",
  },
  {
    question: "How does Kotnala manage software security and compliance concerns?",
    answer:
      "We bake security into architecture, development workflows, access controls, and deployment practices, then document controls required by your domain.",
  },
  {
    question: "Does Kotnala support projects after launch?",
    answer:
      "Yes. We provide post-launch support, performance tuning, reliability monitoring, and iterative feature development with CTO-as-a-Service model or Fractional CTO.",
  },
  {
    question: "How quickly can a project start?",
    answer:
      "Most engagements begin within a few weeks after discovery and planning, depending on scope readiness and stakeholder availability.",
  },
  {
    question: "Can you help with both product strategy and engineering execution?",
    answer:
      "Yes. Our model combines business consulting, architecture planning, and implementation so decisions remain aligned end to end.",
  },
  {
    question: "How do you estimate project cost and timeline?",
    answer:
      "We estimate based on business scope, integration complexity, team dependencies, and risk profile, then provide phased roadmap options.",
  },
  {
    question: "What makes Kotnala different from a typical software agency?",
    answer:
      "We position as a long-term engineering consulting partner focused on business outcomes, architecture quality, and operational reliability.",
  },
] as const;

const insightArticles = [
  {
    title: "How Enterprise Teams Prioritize AI Automation Without Disrupting Operations",
    category: "AI",
    summary:
      "A practical framework to identify, validate, and deploy high-impact automation use cases with measurable ROI.",
    href: "/blog/enterprise-ai-automation-prioritization",
  },
  {
    title: "Modern Software Architecture Patterns for Scaling B2B Platforms",
    category: "Architecture",
    summary:
      "Design principles for reliability, maintainability, and faster release cycles across distributed product teams.",
    href: "/blog/modern-software-architecture-patterns",
  },
  {
    title: "Cloud Cost Discipline: Engineering Decisions That Improve Performance and Margin",
    category: "Cloud",
    summary:
      "How to balance infrastructure optimization, delivery speed, and product resilience in growth-stage environments.",
    href: "/blog/cloud-cost-discipline-for-engineering-leaders",
  },
] as const;

const testimonials = [
  {
    image: "/testimonials/amitgupta.jpeg",
    name: "Amit Gupta",
    designation: "Founder",
    company: "Pratham International",
    project: "AI Pricing Platform",
    rating: 5,
    testimonial:
      "Kotnala aligned technology with business priorities from day one. Their leadership transformed our pricing workflows into a faster, more reliable operating model.",
  },
  {
    image: "/testimonials/ishanattra-high.png",
    name: "Ishan Attra",
    designation: "Director",
    company: "Fimansy Consulting",
    project: "Finance Automation Platform",
    rating: 5,
    testimonial:
      "From architecture planning to delivery governance, Kotnala operated like an embedded CTO office. The execution quality and communication were consistently executive-grade.",
  },
  {
    image: "/testimonials/sanjeevkumar.png",
    name: "Sanjeev Kumar",
    designation: "Operations Lead",
    company: "ECI Promise",
    project: "Enterprise ERP Transformation",
    rating: 5,
    testimonial:
      "Their team brought strong technical leadership, security discipline, and long-term thinking. We gained a dependable engineering partner, not just a delivery vendor.",
  },
] as const;

const consultancyMeetings = [
  {
    image: "/meetings/meeting-1.jpg",
    title: "Technology Strategy Workshop",
    description: "Discussing enterprise architecture, delivery roadmap, and digital transformation.",
  },
  {
    image: "/meetings/meeting-2.jpg",
    title: "Product Discovery Session",
    description: "Collaborating with stakeholders to define business requirements and technical direction.",
  },
] as const;

type SectionProps = {
  id: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

function SectionShell({ id, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("section-space", className)}>
      <div className="layout-container space-y-6">
        <Reveal className="max-w-3xl space-y-3">
          <h2 id={`${id}-heading`} className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro ? <p className="text-balance text-base text-muted-foreground sm:text-lg">{intro}</p> : null}
        </Reveal>
        <Reveal stagger>{children}</Reveal>
      </div>
    </section>
  );
}

export function HeroSection() {
  return <HomeHeroSection />;
}

export function TrustedBySection() {
  return (
    <SectionShell
      id="trusted-by"
      title="Building Long-Term Technology Partnerships"
      intro={"Through our CTO-as-a-Service model, we help businesses scale with expert engineering, AI, and technology leadership."}
      className="border-b border-border/70 bg-surface/25"
    >
      <TrustedLogoWall logos={[...trustedByEntries]} />
    </SectionShell>
  );
}

export function BusinessImpactSection() {
  return (
    <SectionShell
      id="business-impact"
      title="Business Impact at a Glance"
      className="border-b border-border/70"
    >
      <Reveal stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {businessImpactMetrics.map((metric) => (
          <article
            key={metric.label}
            className="group interactive-card relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 hover:border-foreground/25"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--brand)_14%,transparent),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative z-10">
              <p className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-[2.7rem]">{metric.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </SectionShell>
  );
}

export function CoreServicesSection() {
  return (
    <SectionShell
      id="core-services"
      title="Core Services"
      intro="Each engagement starts with your operational challenge and ends with software outcomes that improve speed, clarity, and decision quality."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="interactive-card rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
            <h3 className="font-heading text-xl font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Problem:</span> {service.problem}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Business Value:</span> {service.value}
            </p>
            <Link
              href={service.href}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand"
            >
              {service.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function IndustriesSection() {
  return (
    <SectionShell
      id="industries"
      title="Industries We Serve"
      className="border-y border-border/70 bg-surface/25"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => {
          const Icon = industry.icon;

          return (
            <article
              key={industry.name}
              className="group interactive-card relative overflow-hidden rounded-xl border border-border/80 bg-background/90 p-5"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--brand)_16%,transparent),transparent_55%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex rounded-md border border-border/70 bg-surface/60 p-2 text-brand transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold">{industry.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{industry.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function ChallengesSolutionsSection() {
  return (
    <SectionShell
      id="business-challenges"
      title="Business Challenges We Solve"
      intro="Growing businesses often struggle with process inefficiencies and disconnected systems. Kotnala designs practical engineering solutions to remove those bottlenecks."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="interactive-card rounded-2xl border border-border/80 bg-card p-6">
          <h3 className="font-heading text-xl font-semibold">Growing businesses often struggle with</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {challenges.map((challenge) => (
              <li key={challenge} className="flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-brand" aria-hidden="true" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="interactive-card rounded-2xl border border-border/80 bg-brand/5 p-6">
          <h3 className="font-heading text-xl font-semibold">Here&apos;s how Kotnala solves them</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We combine architecture consulting, iterative delivery, and measurable operating metrics. Instead of isolated
            development tasks, we build connected systems that improve data flow, automate repetitive work, and enable
            better executive decision-making.
          </p>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="interactive-card rounded-lg border border-border/80 bg-background/80 p-3">Unified data architecture</div>
            <div className="interactive-card rounded-lg border border-border/80 bg-background/80 p-3">Automation-first workflows</div>
            <div className="interactive-card rounded-lg border border-border/80 bg-background/80 p-3">Reliable integrations</div>
            <div className="interactive-card rounded-lg border border-border/80 bg-background/80 p-3">Operational visibility dashboards</div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function EngineeringProcessSection() {
  return (
    <SectionShell
      id="engineering-process"
      title="Our Engineering Process"
      intro="A live engineering pipeline where strategy, design, development, quality, deployment, and CTO stewardship run as one continuous operating system."
      className="border-y border-border/70 bg-surface/25"
    >
      <div className="relative py-8">
        <EngineeringProcessPipeline steps={engineeringWorkflow} />
      </div>
    </SectionShell>
  );
}

export function CaseStudiesSection() {
  return (
    <SectionShell
      id="case-studies"
      title="Featured Case Studies"
      intro="Representative outcomes from engagements where engineering quality directly improved business performance."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <article key={study.client} className="interactive-card rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
            <h3 className="font-heading text-xl font-semibold tracking-tight">{study.client}</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Problem:</span> {study.problem}
              </p>
              <p>
                <span className="font-medium text-foreground">Solution:</span> {study.solution}
              </p>
              <p>
                <span className="font-medium text-foreground">Business Outcome:</span> {study.outcome}
              </p>
              <p>
                <span className="font-medium text-foreground">Tech Stack:</span> {study.stack}
              </p>
            </div>
            {/* Read Case Study link removed per request */}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function TechnologyStackSection() {
  return (
    <SectionShell
      id="technology-stack"
      title="Enterprise Standards & Compliance"
      intro="Building enterprise software with security, quality, governance, and operational excellence at the core of every engagement."
      className="border-y border-border/70 bg-surface/25"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(150deg,color-mix(in_oklch,var(--background)_94%,var(--brand)_6%),color-mix(in_oklch,var(--background)_88%,var(--brand)_12%))] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.64_0.01_255_/_0.08)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.64_0.01_255_/_0.08)_1px,transparent_1px)] bg-[size:34px_34px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,oklch(0.73_0.08_250_/_0.12)_0%,transparent_36%),radial-gradient(circle_at_78%_76%,oklch(0.69_0.09_248_/_0.11)_0%,transparent_40%)]" />
          <div className="enterprise-node enterprise-node-a" />
          <div className="enterprise-node enterprise-node-b" />
          <div className="enterprise-node enterprise-node-c" />
          <div className="enterprise-node enterprise-node-d" />
        </div>

        <Reveal stagger className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {enterpriseCertifications.map((certification) => (
            <article
              key={certification.name}
              tabIndex={0}
              className="group relative isolate overflow-hidden rounded-2xl border border-white/14 bg-background/44 p-5 backdrop-blur-[6px] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_10px_28px_oklch(0.14_0_0_/_0.34),0_0_22px_oklch(0.72_0.11_250_/_0.16)] focus-visible:-translate-y-1 focus-visible:border-brand/45 focus-visible:shadow-[0_10px_28px_oklch(0.14_0_0_/_0.34),0_0_22px_oklch(0.72_0.11_250_/_0.2)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-[linear-gradient(118deg,transparent_10%,oklch(0.96_0.01_250_/_0.2)_44%,transparent_70%)] opacity-0 transition-all duration-700 group-hover:translate-x-[130%] group-hover:opacity-100 group-focus-visible:translate-x-[130%] group-focus-visible:opacity-100"
              />
              <div className="relative z-10 space-y-4">
                <div className="flex min-h-16 items-center">
                  <Image
                    src={certification.logo}
                    alt={certification.alt}
                    width={320}
                    height={116}
                    className="h-12 w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                    sizes="(max-width: 640px) 110px, 120px"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">{certification.name}</h3>
                  <p className="text-sm text-muted-foreground">{certification.description}</p>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  );
}

export function WhyKotnalaSection() {
  return (
    <SectionShell
      id="why-kotnala"
      title="Why Kotnala?"
      className="border-y border-border/70 bg-surface/25"
    >
      <Reveal delay={40} className="why-ecosystem-reveal">
        <div className="why-ecosystem-shell">
          <div aria-hidden="true" className="why-ecosystem-blueprint">
            <span className="why-bg-particle why-bg-particle-a" />
            <span className="why-bg-particle why-bg-particle-b" />
            <span className="why-bg-particle why-bg-particle-c" />
            <span className="why-bg-particle why-bg-particle-d" />
            <span className="why-coordinate why-coordinate-a">X: 42.1 | Y: 18.6</span>
            <span className="why-coordinate why-coordinate-b">OPS • ARCH • AI</span>
          </div>

          <div className="why-ecosystem-stage">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 640"
              preserveAspectRatio="none"
              className="why-connectors"
            >
              {[
                "M175 120 Q300 150 500 320",
                "M380 70 Q450 130 500 320",
                "M620 70 Q560 130 500 320",
                "M825 120 Q700 150 500 320",
                "M825 520 Q700 500 500 320",
                "M620 570 Q560 500 500 320",
                "M380 570 Q450 500 500 320",
                "M175 520 Q300 500 500 320",
              ].map((path, index) => (
                <g key={path}>
                  <path d={path} className="why-connector-base" />
                  <path d={path} pathLength={1} className="why-connector-draw" style={{ "--path-order": index } as CSSProperties} />
                  <path d={path} pathLength={1} className={`why-connector-flow why-connector-flow-${index + 1}`} style={{ "--path-order": index } as CSSProperties} />
                  <path d={path} pathLength={1} className="why-connector-signal" style={{ "--path-order": index } as CSSProperties} />
                </g>
              ))}
            </svg>

            <div className="why-hub" aria-label="CTO-as-a-Service hub">
              <span aria-hidden="true" className="why-hub-aura" />
              <span aria-hidden="true" className="why-hub-ring" />
              <span aria-hidden="true" className="why-hub-ring why-hub-ring-secondary" />
              <div className="why-hub-core">
                <span className="why-hub-label">CTO-as-a-Service</span>
              </div>
            </div>

            <ul className="why-node-list" aria-label="Kotnala capabilities network">
              {whyKotnala.map((point, index) => (
                <li
                  key={point}
                  className={`why-node why-node-${index + 1}`}
                  style={{ "--node-order": index } as CSSProperties}
                >
                  <span className="why-node-button">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

export function FaqSection() {
  return (
    <SectionShell
      id="faqs"
      title="Frequently Asked Questions"
      intro="Clear executive answers on software delivery, AI consulting, and CTO-as-a-Service collaboration."
      className="border-y border-border/70 bg-surface/25"
    >
      <div className="faq-shell mx-auto w-full max-w-[62rem] rounded-3xl border border-border/75 bg-background/70 p-3 shadow-soft sm:p-4 lg:p-5">
        <div className="space-y-2">
          {homeFaqItems.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="faq-item group rounded-2xl border border-transparent bg-transparent px-4 py-2.5 transition-all duration-300 sm:px-5"
            >
              <summary className="faq-summary flex cursor-pointer list-none items-center justify-between gap-4 py-2.5">
                <h3 className="text-balance text-[1.04rem] leading-snug font-semibold tracking-tight text-foreground sm:text-[1.16rem]">
                  {item.question}
                </h3>
                <span aria-hidden="true" className="faq-icon">
                  <span className="faq-icon-line faq-icon-line-horizontal" />
                  <span className="faq-icon-line faq-icon-line-vertical" />
                </span>
              </summary>
              <div className="faq-answer-wrap">
                <div className="faq-answer pb-3.5">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function LatestInsightsSection() {
  return (
    <SectionShell
      id="latest-insights"
      title="Latest Insights"
      intro="Executive-focused perspectives on software delivery, AI implementation, cloud architecture, and engineering governance."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {insightArticles.map((article) => (
          <article key={article.title} className="interactive-card rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{article.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-balance">{article.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{article.summary}</p>
            <Link href={article.href} className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:text-brand">
              Read Article
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsSection() {
  return (
    <SectionShell
      id="client-testimonials"
      title="Client Testimonials & Reviews"
      intro="Detailed reviews from partners who trusted Kotnala to solve complex software and AI initiatives."
      className="border-y border-border/70 bg-surface/25"
    >
      <Reveal stagger className="testimonials-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={`${testimonial.company}-${testimonial.name}`}
            className="testimonial-card interactive-card flex h-full flex-col rounded-2xl border border-border/80 p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <TestimonialExecutivePhoto image={testimonial.image} name={testimonial.name} />
              <div className="min-w-0 space-y-1 pt-0.5">
                <h3 className="truncate text-[1.12rem] leading-tight font-semibold tracking-tight text-foreground">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-brand uppercase">{testimonial.company}</p>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-1 text-amber-500" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" aria-hidden="true" />
              ))}
            </p>

            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              “{testimonial.testimonial}”
            </blockquote>

            <div className="mt-5 border-t border-border/70 pt-4">
              <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Project Delivered
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{testimonial.project}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </SectionShell>
  );
}

export function ConsultancyMeetingsSection() {
  return (
    <section
      id="consultancy-meetings"
      aria-labelledby="consultancy-meetings-heading"
      className="section-space border-y border-border/70 bg-surface/25"
    >
      <div className="layout-container space-y-6">
        <Reveal className="max-w-4xl space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/65 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            CONSULTING • STRATEGY • EXECUTION
          </p>
          <h2
            id="consultancy-meetings-heading"
            className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Consultancy Meetings in Action
          </h2>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            Real strategy sessions with founders, business leaders, and decision-makers—where technology, business
            goals, and execution come together through our CTO-as-a-Service consulting approach.
          </p>
        </Reveal>

        <div className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(160deg,color-mix(in_oklch,var(--background)_94%,var(--brand)_6%),color-mix(in_oklch,var(--background)_88%,var(--brand)_12%))] p-4 sm:p-5 lg:p-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-25" />
          <div className="relative z-10 grid gap-5 md:grid-cols-2">
            {consultancyMeetings.map((meeting, index) => (
              <Reveal
                key={meeting.title}
                delay={index * 80}
                className={cn("meeting-reveal", index % 2 === 0 ? "meeting-reveal-left" : "meeting-reveal-right")}
              >
                <article className="meeting-card group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card/65 shadow-soft">
                  <div className="relative aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={meeting.image}
                      alt={meeting.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 48vw"
                      className="meeting-image object-cover"
                      loading="lazy"
                    />
                    <div
                      aria-hidden="true"
                      className="meeting-overlay absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent"
                    />
                    <div className="absolute right-4 bottom-4 left-4 space-y-1.5">
                      <h3 className="font-heading text-xl font-semibold tracking-tight text-white">{meeting.title}</h3>
                      <p className="text-sm leading-relaxed text-white/84">{meeting.description}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="section-space bg-[linear-gradient(to_bottom_right,color-mix(in_oklch,var(--brand)_8%,var(--background)),var(--background))]"
    >
      <div className="layout-container">
        <div className="rounded-3xl border border-border/80 bg-card/80 p-8 shadow-elevated sm:p-10">
          <div className="max-w-3xl space-y-5">
            <h2 id="final-cta-heading" className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to discuss your next software project?
            </h2>
            <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you&apos;re planning an AI initiative, building a SaaS platform, modernizing legacy software, or
              scaling your engineering team, our consultants are ready to help.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
                Book Strategy Call
              </Link>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline" })}>
                Request Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
