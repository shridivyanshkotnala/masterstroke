import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { generateSEOMetadata } from "@/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Kotnala Consultancy Pvt. Ltd. covering data collection, usage, retention, security, and user rights.",
});

const sections = [
  {
    title: "1. Introduction",
    body: [
      "Kotnala Consultancy Pvt. Ltd. (\"Kotnala Consultancy\", \"we\", \"our\") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, and protect personal information when you use our website, contact forms, consultation workflows, and related services.",
      "By accessing or using our services, you acknowledge this policy and our lawful processing of information for legitimate business purposes.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We may collect contact information such as name, email address, phone number, company name, and consultation details that you voluntarily provide.",
      "We also collect technical metadata including IP address, browser user agent, approximate geolocation, referral source, session activity, and timestamps to secure our platform and improve service quality.",
      "Where applicable, authenticated booking workflows may process third-party profile information required for scheduling and communication.",
    ],
  },
  {
    title: "3. How We Use Information",
    body: [
      "We use submitted data to respond to inquiries, schedule consultations, provide requested services, maintain service records, and deliver relevant operational communication.",
      "Information is also used for platform security, abuse prevention, diagnostics, analytics, legal compliance, and internal quality improvement.",
      "We do not sell personal data to third parties.",
    ],
  },
  {
    title: "4. Legal Basis and Consent",
    body: [
      "We process data based on consent, contractual necessity, legal obligations, and legitimate interests such as operational security and fraud prevention.",
      "Where consent is required, you may withdraw consent by contacting us. Withdrawal may affect our ability to provide certain services.",
    ],
  },
  {
    title: "5. Data Sharing",
    body: [
      "We may share information with trusted service providers that support hosting, communication, analytics, payment processing, or scheduling infrastructure under confidentiality and data protection obligations.",
      "We may disclose information when required by law, regulation, court order, or to protect legal rights and security interests.",
    ],
  },
  {
    title: "6. Data Retention",
    body: [
      "We retain personal data only for as long as necessary for service delivery, legal compliance, dispute resolution, and security auditing.",
      "Retention periods may vary by data type, contractual requirements, and statutory obligations.",
    ],
  },
  {
    title: "7. Security Measures",
    body: [
      "We implement appropriate administrative, technical, and operational controls to protect data against unauthorized access, misuse, alteration, and loss.",
      "Controls may include access management, transport encryption, application-level protections, rate limiting, audit logs, and regular monitoring.",
    ],
  },
  {
    title: "8. Cookies and Analytics",
    body: [
      "Our website may use cookies or similar technologies for session continuity, security, and performance analytics.",
      "You can control cookie behavior through browser settings, though disabling essential cookies may impact functionality.",
    ],
  },
  {
    title: "9. International Transfers",
    body: [
      "If data is processed outside your region, we apply reasonable safeguards and contractual protections to maintain privacy standards aligned with applicable laws.",
    ],
  },
  {
    title: "10. Your Rights",
    body: [
      "Subject to applicable law, you may request access, correction, deletion, restriction, portability, or objection to certain processing activities.",
      "To exercise these rights, contact us through the official channels listed below. We may verify identity before processing requests.",
    ],
  },
  {
    title: "11. Children's Privacy",
    body: [
      "Our services are intended for business and professional audiences. We do not knowingly collect data from children in violation of applicable laws.",
    ],
  },
  {
    title: "12. Policy Updates",
    body: [
      "We may update this Privacy Policy from time to time to reflect legal, technical, or operational changes. Revised versions become effective upon publication on this page.",
    ],
  },
  {
    title: "13. Contact Information",
    body: [
      "Kotnala Consultancy Pvt. Ltd.",
      "Shiv Shakti Enclave, Dehradun, UK - 248008",
      "Email: office@kotnala.com",
      "Phone: +91 7011804564",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="flex-1 bg-[#070d17] text-white">
      <div className="layout-container section-space">
        <Reveal>
          <header className="mb-10 rounded-3xl border border-white/12 bg-white/6 p-7 shadow-floating backdrop-blur-xl sm:p-10">
            <p className="text-xs font-semibold tracking-[0.15em] text-cyan-100 uppercase">Legal</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
              This policy explains how Kotnala Consultancy Pvt. Ltd. handles personal and technical data
              across contact, consultation, and service workflows.
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
