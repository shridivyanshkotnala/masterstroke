"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";

import styles from "./company-conversion-experience.module.css";

type Reason = {
  title: string;
  description: string;
  detail: string;
  icon: "briefcase" | "architecture" | "leadership" | "ai" | "partnership" | "shield" | "delivery" | "scale";
};

type Value = {
  title: string;
  description: string;
  supporting: string;
  icon: "ownership" | "engineering" | "innovation" | "transparency" | "success" | "learning" | "quality" | "trust";
  size: "large" | "wide" | "normal";
};

const whyReasons: Reason[] = [
  {
    title: "Business-first Engineering",
    description: "Every technical decision starts with business outcomes, not feature count or trend chasing.",
    detail: "We align architecture and execution to revenue, efficiency, and risk goals.",
    icon: "briefcase",
  },
  {
    title: "Enterprise-grade Architecture",
    description: "Systems are designed for reliability, governance, and long-term maintainability from day one.",
    detail: "Our approach reduces rework, technical debt, and operational surprises at scale.",
    icon: "architecture",
  },
  {
    title: "CTO-level Leadership",
    description: "You get strategic technology leadership alongside delivery oversight and engineering direction.",
    detail: "From roadmap planning to technical execution, decisions remain coherent and accountable.",
    icon: "leadership",
  },
  {
    title: "AI with Practical ROI",
    description: "AI initiatives are scoped for measurable value, not experiments that stall in proof-of-concept mode.",
    detail: "We prioritize use cases that improve workflows, speed decisions, and create clear business impact.",
    icon: "ai",
  },
  {
    title: "Long-term Partnership",
    description: "Kotnala works as an extension of your team through structured collaboration and shared ownership.",
    detail: "We stay involved beyond launch to strengthen systems, teams, and delivery maturity.",
    icon: "partnership",
  },
  {
    title: "Security & Reliability",
    description: "Security, resilience, and compliance are integrated into architecture and delivery practices.",
    detail: "We build trust by treating reliability and protection as foundational product capabilities.",
    icon: "shield",
  },
  {
    title: "Transparent Delivery",
    description: "Progress, trade-offs, and technical risks are communicated clearly at every stage.",
    detail: "You always have visibility into timelines, priorities, and implementation confidence.",
    icon: "delivery",
  },
  {
    title: "Scalable Engineering",
    description: "Delivery models are designed to support growth in product complexity, team size, and demand.",
    detail: "We optimize for speed today and structural flexibility for what comes next.",
    icon: "scale",
  },
];

const values: Value[] = [
  {
    title: "Ownership",
    description: "We take end-to-end responsibility for architecture, execution, and measurable outcomes.",
    supporting: "Accountability over activity.",
    icon: "ownership",
    size: "large",
  },
  {
    title: "Engineering Excellence",
    description: "Strong foundations, clear abstractions, and maintainable systems define our delivery standards.",
    supporting: "Quality as a discipline.",
    icon: "engineering",
    size: "wide",
  },
  {
    title: "Innovation",
    description: "We apply modern technology intentionally to solve real operational and strategic problems.",
    supporting: "Practical progress, not noise.",
    icon: "innovation",
    size: "normal",
  },
  {
    title: "Transparency",
    description: "Clear communication on decisions, risks, and progress builds confident partnerships.",
    supporting: "No hidden complexity.",
    icon: "transparency",
    size: "normal",
  },
  {
    title: "Client Success",
    description: "Our benchmark is business impact, not just technical delivery milestones.",
    supporting: "Outcomes over outputs.",
    icon: "success",
    size: "wide",
  },
  {
    title: "Continuous Learning",
    description: "We evolve systems and teams through feedback, retrospectives, and iterative improvement.",
    supporting: "Better with every cycle.",
    icon: "learning",
    size: "normal",
  },
  {
    title: "Quality",
    description: "Reliability, performance, and consistency are engineered into every stage of delivery.",
    supporting: "Precision in execution.",
    icon: "quality",
    size: "normal",
  },
  {
    title: "Trust",
    description: "Long-term relationships are built through integrity, predictability, and delivery confidence.",
    supporting: "Partnership with clarity.",
    icon: "trust",
    size: "normal",
  },
];

const engagementChecklist = [
  "Architecture Review",
  "Technical Strategy",
  "AI Adoption Planning",
  "CTO Consultation",
];

const engagementSummary = [
  { label: "Response timeline", value: "Within 24 hours" },
  { label: "Meeting duration", value: "45-60 minutes" },
  { label: "Discovery workshop", value: "Optional deep-dive" },
  { label: "Architecture review", value: "Actionable roadmap" },
  { label: "Technical consultation", value: "Senior engineering leadership" },
];

function Icon({ icon }: { icon: Reason["icon"] | Value["icon"] }) {
  switch (icon) {
    case "briefcase":
      return <path d="M9 6V4h6v2m-9 3h12v8H6V9Zm4 3h4" strokeWidth="1.6" />;
    case "architecture":
      return <path d="M4 8h16M4 16h16M8 4v16M16 4v16" strokeWidth="1.6" />;
    case "leadership":
      return <path d="M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-5 14a5 5 0 0 1 10 0" strokeWidth="1.6" />;
    case "ai":
      return <path d="M12 3v4M12 17v4M4 12h4M16 12h4M7.2 7.2l2.2 2.2m5.2 5.2 2.2 2.2m0-9.6-2.2 2.2m-5.2 5.2-2.2 2.2" strokeWidth="1.6" />;
    case "partnership":
      return <path d="m7 12 3 3 7-7M4 12a8 8 0 1 0 16 0" strokeWidth="1.6" />;
    case "shield":
      return <path d="M12 3 5 6v6c0 4.2 2.9 7.2 7 8.8 4.1-1.6 7-4.6 7-8.8V6l-7-3Z" strokeWidth="1.6" />;
    case "delivery":
      return <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.6" />;
    case "scale":
      return <path d="M4 18h16M8 18V9m4 9V6m4 12v-7" strokeWidth="1.6" />;
    case "ownership":
      return <path d="M12 4 6 7v4c0 3.2 2.1 5.5 6 7 3.9-1.5 6-3.8 6-7V7l-6-3Zm0 6v4" strokeWidth="1.6" />;
    case "engineering":
      return <path d="m7 7 10 10M17 7 7 17m-2 2h14" strokeWidth="1.6" />;
    case "innovation":
      return <path d="M12 4a4 4 0 0 0-4 4c0 1.8.9 2.9 2 4v2h4v-2c1.1-1.1 2-2.2 2-4a4 4 0 0 0-4-4Zm-2 14h4" strokeWidth="1.6" />;
    case "transparency":
      return <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Zm9-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" strokeWidth="1.6" />;
    case "success":
      return <path d="M5 19h14M8 15l3-3 2 2 5-5M14 9h4v4" strokeWidth="1.6" />;
    case "learning":
      return <path d="M5 6h10a3 3 0 0 1 3 3v9H8a3 3 0 0 0-3 3V6Zm0 0v12" strokeWidth="1.6" />;
    case "quality":
      return <path d="m12 4 2.2 4.4 4.8.7-3.5 3.4.9 4.8-4.4-2.4-4.4 2.4.9-4.8L5 9.1l4.8-.7L12 4Z" strokeWidth="1.6" />;
    case "trust":
      return <path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6l-7-3Zm-2 9 1.5 1.5L14 11" strokeWidth="1.6" />;
    default:
      return null;
  }
}

export function CompanyConversionExperience() {
  return (
    <>
      <section id="why-choose-us" className="border-t border-border/70 py-14 sm:py-16">
        <div className="layout-container">
          <Reveal className={styles.whyHeader}>
            <p className={styles.kicker}>Why Kotnala</p>
            <h2 className={styles.sectionTitle}>Why Businesses Choose Kotnala</h2>
            <p className={styles.sectionIntro}>
              Companies partner with Kotnala for structured technology leadership that connects architecture, delivery, and measurable
              business outcomes.
            </p>
          </Reveal>

          <div className={styles.whyShell}>
            <div aria-hidden="true" className={styles.ambientLayer} />
            <div aria-hidden="true" className={styles.timelineRail} />
            <div className={styles.whyGrid}>
              {whyReasons.map((reason, index) => (
                <Reveal key={reason.title} delay={70 + index * 55} className={styles.whyReveal}>
                  <article className={styles.whyCard} tabIndex={0}>
                    <div className={styles.cardTopRow}>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <Icon icon={reason.icon} />
                        </svg>
                      </span>
                      <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{reason.title}</h3>
                    <p className={styles.cardDescription}>{reason.description}</p>
                    <p className={styles.cardDetail}>{reason.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="py-14 sm:py-16">
        <div className="layout-container">
          <Reveal className={styles.valuesHeader}>
            <p className={styles.kicker}>Values</p>
            <h2 className={styles.sectionTitle}>How We Operate as a Consultancy</h2>
            <p className={styles.sectionIntro}>
              Our values drive how we architect solutions, lead teams, communicate with stakeholders, and deliver long-term results.
            </p>
          </Reveal>

          <div className={styles.valuesShell}>
            <div aria-hidden="true" className={styles.ambientLayer} />
            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <Reveal key={value.title} delay={70 + index * 50}>
                  <article className={`${styles.valueCard} ${styles[value.size]}`} tabIndex={0}>
                    <span className={styles.iconWrap} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <Icon icon={value.icon} />
                      </svg>
                    </span>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDescription}>{value.description}</p>
                    <p className={styles.valueSupporting}>{value.supporting}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="final-cta" className="border-t border-border/70 py-16 sm:py-20">
        <div className="layout-container">
          <Reveal className={styles.ctaShell}>
            <div aria-hidden="true" className={styles.ctaAmbient} />
            <div className={styles.ctaGrid}>
              <div className={styles.ctaLeft}>
                <p className={styles.kicker}>Start Your Engagement</p>
                <h2 className={styles.ctaTitle}>Let&apos;s engineer your next competitive advantage.</h2>
                <p className={styles.ctaIntro}>
                  Whether you&apos;re planning a new platform, modernizing legacy systems, adopting AI, or looking for long-term CTO
                  leadership, we&apos;ll help you build a practical roadmap aligned with your business goals.
                </p>
                <ul className={styles.checklist} aria-label="Engagement focus areas">
                  {engagementChecklist.map((item) => (
                    <li key={item} className={styles.checkItem}>
                      <span aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.trustLine}>Trusted by growth-stage and enterprise teams for architecture-led delivery.</p>
              </div>

              <aside className={styles.ctaRight} aria-label="Call booking details">
                <div className={styles.actionGroup}>
                  <Link href="/book-call" className={styles.primaryCta}>
                    <span>Book Strategy Call</span>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link href="/contact" className={styles.secondaryCta}>
                    <span>Schedule Technical Consultation</span>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                <ul className={styles.summaryList}>
                  {engagementSummary.map((item) => (
                    <li key={item.label} className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>{item.label}</span>
                      <span className={styles.summaryValue}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
