"use client";

import { type CSSProperties, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

import styles from "./company-problems-ecosystem.module.css";

type Challenge = {
  id: string;
  title: string;
  description: string;
  icon: "layers" | "scale" | "spark" | "merge";
};

type Outcome = {
  id: string;
  title: string;
  description: string;
  icon: "speed" | "growth" | "architecture" | "automation";
};

const challenges: Challenge[] = [
  { id: "p1", title: "Legacy Systems", description: "Modernize critical platforms without operational disruption.", icon: "layers" },
  { id: "p2", title: "Scaling Challenges", description: "Prepare architecture for sustained product and team growth.", icon: "scale" },
  { id: "p3", title: "AI Adoption", description: "Implement practical AI capabilities with governance and ROI.", icon: "spark" },
  { id: "p4", title: "Data & Integration", description: "Unify fragmented systems into one reliable data workflow.", icon: "merge" },
];

const outcomes: Outcome[] = [
  { id: "o1", title: "Operational Efficiency", description: "Reduce friction with cleaner workflows and faster execution.", icon: "speed" },
  { id: "o2", title: "Business Growth", description: "Align technology delivery with measurable expansion goals.", icon: "growth" },
  { id: "o3", title: "Scalable Architecture", description: "Build resilient foundations for long-term platform growth.", icon: "architecture" },
  { id: "o4", title: "Intelligent Automation", description: "Automate repetitive operations with AI-assisted orchestration.", icon: "automation" },
];

const problemConnectors = [
  { id: "p1", d: "M190 174 C250 226, 334 264, 455 302" },
  { id: "p2", d: "M390 174 C428 228, 458 264, 485 302" },
  { id: "p3", d: "M610 174 C572 228, 542 264, 515 302" },
  { id: "p4", d: "M810 174 C750 226, 666 264, 545 302" },
] as const;

const outcomeConnectors = [
  { id: "o1", d: "M455 350 C334 388, 250 426, 190 478" },
  { id: "o2", d: "M485 350 C458 388, 428 426, 390 478" },
  { id: "o3", d: "M515 350 C542 388, 572 426, 610 478" },
  { id: "o4", d: "M545 350 C666 388, 750 426, 810 478" },
] as const;

const problemConnectorsTablet = [
  { id: "p1", d: "M250 180 C320 236, 392 274, 460 306" },
  { id: "p2", d: "M470 180 C480 236, 488 274, 492 306" },
  { id: "p3", d: "M530 250 C520 280, 512 292, 508 306" },
  { id: "p4", d: "M750 250 C680 280, 608 292, 540 306" },
] as const;

const outcomeConnectorsTablet = [
  { id: "o1", d: "M460 350 C392 382, 320 420, 250 456" },
  { id: "o2", d: "M492 350 C488 382, 480 420, 470 456" },
  { id: "o3", d: "M508 350 C512 422, 520 474, 530 526" },
  { id: "o4", d: "M540 350 C608 422, 680 474, 750 526" },
] as const;

function NodeIcon({ icon }: { icon: Challenge["icon"] | Outcome["icon"] }) {
  switch (icon) {
    case "layers":
      return <path d="M4 8l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 18l8 4 8-4" strokeWidth="1.6" />;
    case "scale":
      return <path d="M12 4v14M7 9h10M5 9l-2 4h4l-2-4Zm14 0-2 4h4l-2-4M9 20h6" strokeWidth="1.6" />;
    case "spark":
      return <path d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2.8 2.8M14.7 14.7l2.8 2.8M17.5 6.5l-2.8 2.8M9.3 14.7l-2.8 2.8" strokeWidth="1.6" />;
    case "merge":
      return <path d="M6 6h4v4H6V6Zm8 8h4v4h-4v-4ZM10 8h4a3 3 0 0 1 3 3v3M10 18H6a3 3 0 0 1-3-3V9" strokeWidth="1.6" />;
    case "speed":
      return <path d="M4 14h7l-2 6 11-10h-7l2-6L4 14Z" strokeWidth="1.6" />;
    case "growth":
      return <path d="M5 19h14M8 15l3-3 2 2 5-5M14 9h4v4" strokeWidth="1.6" />;
    case "architecture":
      return <path d="M4 8h16M4 16h16M8 4v16M16 4v16" strokeWidth="1.6" />;
    case "automation":
      return <path d="M9 4h6M12 4v3m-6 4h12v5H6v-5Zm2 9h8M4 11h2m12 0h2" strokeWidth="1.6" />;
    default:
      return null;
  }
}

export function CompanyProblemsEcosystemSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="problems" className="border-t border-border/70 py-14 sm:py-16">
      <div className="layout-container">
        <Reveal className={styles.sectionReveal}>
          <header className={styles.headingBlock}>
            <p className={styles.kicker}>Business Challenges</p>
            <h2 className={styles.title}>Problems We Help Businesses Solve</h2>
            <p className={styles.intro}>
              Kotnala transforms complex technical bottlenecks into scalable business outcomes through enterprise engineering,
              AI consulting, and strategic CTO-level guidance.
            </p>
          </header>

          <div className={styles.ecosystemShell}>
            <div aria-hidden="true" className={styles.backdropLayer}>
              <span className={cn(styles.particle, styles.particleA)} />
              <span className={cn(styles.particle, styles.particleB)} />
            </div>

            <div className={styles.desktopJourney} data-active-node={activeNode ?? ""}>
              <div className={styles.storyLabels} aria-hidden="true">
                <span>Business Challenges</span>
                <span>Engineering &amp; Consulting Layer</span>
                <span>Business Outcomes</span>
              </div>

              <svg aria-hidden="true" className={styles.connectorMap} viewBox="0 0 1000 700" preserveAspectRatio="none">
                {problemConnectors.map((connector, index) => (
                  <g key={connector.id}>
                    <path d={connector.d} className={cn(styles.connectorBase, styles.desktopPath)} />
                    <path d={connector.d} pathLength={1} className={cn(styles.connectorDraw, styles.desktopPath)} style={{ "--path-order": index } as CSSProperties} />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorFlow, styles.problemFlow, styles.desktopPath, activeNode === connector.id && styles.connectorActive)}
                      style={{ "--path-order": index } as CSSProperties}
                    />
                  </g>
                ))}

                {problemConnectorsTablet.map((connector, index) => (
                  <g key={`${connector.id}-tablet`}>
                    <path d={connector.d} className={cn(styles.connectorBase, styles.tabletPath)} />
                    <path d={connector.d} pathLength={1} className={cn(styles.connectorDraw, styles.tabletPath)} style={{ "--path-order": index } as CSSProperties} />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorFlow, styles.problemFlow, styles.tabletPath, activeNode === connector.id && styles.connectorActive)}
                      style={{ "--path-order": index } as CSSProperties}
                    />
                  </g>
                ))}

                {outcomeConnectors.map((connector, index) => (
                  <g key={connector.id}>
                    <path d={connector.d} className={cn(styles.connectorBase, styles.desktopPath)} />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorDraw, styles.desktopPath)}
                      style={{ "--path-order": index + problemConnectors.length } as CSSProperties}
                    />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorFlow, styles.outcomeFlow, styles.desktopPath, activeNode === connector.id && styles.connectorActive)}
                      style={{ "--path-order": index + problemConnectors.length } as CSSProperties}
                    />
                  </g>
                ))}

                {outcomeConnectorsTablet.map((connector, index) => (
                  <g key={`${connector.id}-tablet`}>
                    <path d={connector.d} className={cn(styles.connectorBase, styles.tabletPath)} />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorDraw, styles.tabletPath)}
                      style={{ "--path-order": index + problemConnectorsTablet.length } as CSSProperties}
                    />
                    <path
                      d={connector.d}
                      pathLength={1}
                      className={cn(styles.connectorFlow, styles.outcomeFlow, styles.tabletPath, activeNode === connector.id && styles.connectorActive)}
                      style={{ "--path-order": index + problemConnectorsTablet.length } as CSSProperties}
                    />
                  </g>
                ))}
              </svg>

              <ul className={styles.problemLayer} aria-label="Business challenges">
                {challenges.map((item, index) => (
                  <li
                    key={item.id}
                    className={cn(styles.challengeItem, styles[`challenge${index + 1}` as keyof typeof styles])}
                    style={{ "--node-order": index } as CSSProperties}
                  >
                    <button
                      type="button"
                      className={styles.nodeButton}
                      onMouseEnter={() => setActiveNode(item.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      onFocus={() => setActiveNode(item.id)}
                      onBlur={() => setActiveNode(null)}
                      aria-describedby={`${item.id}-description`}
                    >
                      <span className={styles.nodeIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <NodeIcon icon={item.icon} />
                        </svg>
                      </span>
                      <span>
                        <span className={styles.nodeTitle}>{item.title}</span>
                        <span id={`${item.id}-description`} className={styles.nodeDescription}>{item.description}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.centerNode}>
                <p className={styles.centerBrand}>Kotnala Consultancy</p>
                <ul className={styles.centerCapabilities}>
                  <li>Enterprise Software</li>
                  <li>AI Consulting</li>
                  <li>CTO-as-a-Service</li>
                </ul>
              </div>

              <ul className={styles.outcomeLayer} aria-label="Business outcomes">
                {outcomes.map((item, index) => (
                  <li
                    key={item.id}
                    className={cn(styles.outcomeItem, styles[`outcome${index + 1}` as keyof typeof styles])}
                    style={{ "--outcome-order": index } as CSSProperties}
                  >
                    <button
                      type="button"
                      className={styles.outcomeButton}
                      onMouseEnter={() => setActiveNode(item.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      onFocus={() => setActiveNode(item.id)}
                      onBlur={() => setActiveNode(null)}
                      aria-describedby={`${item.id}-description`}
                    >
                      <span className={styles.nodeIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <NodeIcon icon={item.icon} />
                        </svg>
                      </span>
                      <span>
                        <span className={styles.outcomeTitle}>{item.title}</span>
                        <span id={`${item.id}-description`} className={styles.outcomeDescription}>{item.description}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mobileJourney}>
              <h3 className={styles.mobileHeading}>Business Challenges</h3>
              <ul className={styles.mobileList}>
                {challenges.map((item) => (
                  <li key={`mobile-${item.id}`} className={styles.mobileCard}>
                    <p className={styles.mobileCardTitle}>{item.title}</p>
                    <p className={styles.mobileCardDescription}>{item.description}</p>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileDivider} aria-hidden="true">
                <span />
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v14M7 13l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span />
              </div>

              <div className={styles.mobileCenterNode}>
                <p className={styles.centerBrand}>Kotnala Consultancy</p>
                <ul className={styles.centerCapabilities}>
                  <li>Enterprise Software</li>
                  <li>AI Consulting</li>
                  <li>CTO-as-a-Service</li>
                </ul>
              </div>

              <div className={styles.mobileDivider} aria-hidden="true">
                <span />
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v14M7 13l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span />
              </div>

              <h3 className={styles.mobileHeading}>Business Outcomes</h3>
              <ul className={styles.mobileList}>
                {outcomes.map((item) => (
                  <li key={`mobile-${item.id}`} className={styles.mobileCard}>
                    <p className={styles.mobileCardTitle}>{item.title}</p>
                    <p className={styles.mobileCardDescription}>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
