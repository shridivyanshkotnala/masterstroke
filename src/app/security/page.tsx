import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { generateSEOMetadata } from "@/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Security",
  description:
    "Security practices of Kotnala Consultancy Pvt. Ltd. including application security, data controls, incident response, and responsible disclosure.",
});

const sections = [
  {
    title: "1. Security Commitment",
    body: [
      "Kotnala Consultancy Pvt. Ltd. applies a security-first approach across product engineering, consulting workflows, and operational systems.",
      "Our goal is to protect confidentiality, integrity, and availability of data processed through our digital services.",
    ],
  },
  {
    title: "2. Secure Development Practices",
    body: [
      "We follow secure coding principles, peer review processes, and defensive design patterns to reduce security vulnerabilities.",
      "Critical application paths are protected through input validation, authorization controls, request hardening, and robust error handling.",
    ],
  },
  {
    title: "3. Access Control",
    body: [
      "Access to systems and sensitive data is restricted by least-privilege principles and role-based controls.",
      "Administrative access is limited to authorized personnel and reviewed periodically.",
    ],
  },
  {
    title: "4. Infrastructure and Network Security",
    body: [
      "We use secured hosting environments, segmented service architecture where applicable, and transport encryption for sensitive communication channels.",
      "Operational safeguards may include firewalls, monitoring, service hardening, and protective middleware.",
    ],
  },
  {
    title: "5. Data Protection Controls",
    body: [
      "We apply practical controls for data minimization, retention limits, and secure handling of personal and business information.",
      "Sensitive records are protected with access restrictions and logging controls to support traceability and accountability.",
    ],
  },
  {
    title: "6. Monitoring and Logging",
    body: [
      "Security-relevant events are logged to support diagnostics, anomaly detection, and forensic analysis when required.",
      "Monitoring practices are designed to detect suspicious behavior, abuse patterns, and service degradation.",
    ],
  },
  {
    title: "7. Incident Response",
    body: [
      "If a security incident is detected, we initiate containment, impact assessment, remediation, and post-incident review procedures.",
      "Where required by law or contract, affected stakeholders are notified through official communication channels.",
    ],
  },
  {
    title: "8. Third-Party Risk Management",
    body: [
      "We assess the security posture of critical third-party tools and providers used for hosting, communication, scheduling, and analytics.",
      "Third-party access to data is governed by contractual and operational safeguards.",
    ],
  },
  {
    title: "9. Business Continuity",
    body: [
      "We maintain operational processes intended to support service continuity, controlled recovery, and resilience for core systems.",
      "Continuity planning includes backups, dependency review, and restoration priorities where applicable.",
    ],
  },
  {
    title: "10. Responsible Disclosure",
    body: [
      "If you identify a potential security vulnerability, please report it responsibly to our official channels. Include reproducible details and impact context.",
      "We review legitimate reports promptly and work in good faith toward remediation.",
    ],
  },
  {
    title: "11. Contact Information",
    body: [
      "Security Contact: office@kotnala.com",
      "Operations: divyansh@kotnala.consulting",
      "US Operations: divyansh@kotnala.us",
      "Kotnala Consultancy Pvt. Ltd., Shiv Shakti Enclave, Dehradun, UK - 248008",
    ],
  },
] as const;

export default function SecurityPage() {
  return (
    <main id="main-content" className="flex-1 bg-[#070d17] text-white">
      <div className="layout-container section-space">
        <Reveal>
          <header className="mb-10 rounded-3xl border border-white/12 bg-white/6 p-7 shadow-floating backdrop-blur-xl sm:p-10">
            <p className="text-xs font-semibold tracking-[0.15em] text-cyan-100 uppercase">Trust</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">Security</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
              Security controls and engineering safeguards followed by Kotnala Consultancy Pvt. Ltd.
              to protect systems, data, and client workflows.
            </p>
          </header>
        </Reveal>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 35}>
              <section className="rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl sm:p-8">
                <h2 className="font-heading text-xl font-semibold text-white sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/80 sm:text-base">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
