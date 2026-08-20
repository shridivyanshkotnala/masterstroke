import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { generateSEOMetadata } from "@/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms and Conditions",
  description:
    "Read Kotnala Consultancy terms and conditions for consultations, payments, confidentiality, intellectual property, and jurisdiction.",
});

const sections = [
  {
    title: "1. Introduction",
    body: [
      "These Terms and Conditions govern professional consulting engagements provided by Kotnala Consultancy Private Limited (\"Kotnala Consultancy\", \"we\", \"our\"). By booking or requesting a consultation, you agree to these terms.",
      "These terms apply to strategic sessions, architecture advisory, engineering consultations, AI and cloud modernization discussions, and associated advisory services unless superseded by a signed master services agreement.",
    ],
  },
  {
    title: "2. Consultation Process",
    body: [
      "Bookings are accepted through our approved channels and are scheduled based on consultant availability.",
      "Rescheduling requests should be submitted in advance via official email. We make reasonable efforts to accommodate timezone differences and client scheduling constraints.",
      "Standard meeting duration is defined during booking confirmation. Session extensions may be offered based on availability and commercial terms.",
      "Consultation calls are typically delivered through Google Meet or another mutually agreed platform.",
    ],
  },
  {
    title: "3. Payment Terms",
    body: [
      "Certain consultations may be complimentary while others are billable depending on scope, engagement type, and prior agreement.",
      "Where applicable, invoices are payable by the due date stated on the invoice and may include taxes, duties, and processing charges as required by law.",
      "Late payments may result in delayed deliverables, paused support, or cancellation of upcoming sessions.",
      "Refunds, cancellations, and rescheduling are handled according to the commercial terms communicated at the time of booking or contracting.",
    ],
  },
  {
    title: "4. Client Responsibilities",
    body: [
      "Clients must provide accurate project, technical, and business information relevant to consultation objectives.",
      "Clients are expected to attend scheduled sessions on time, nominate decision-makers where required, and maintain professional communication.",
      "Actioning recommendations remains the client\'s responsibility unless separate implementation services are contracted.",
    ],
  },
  {
    title: "5. Confidentiality",
    body: [
      "We treat consultation discussions as confidential and use reasonable safeguards for client information.",
      "Where a mutual NDA or enterprise agreement is signed, confidentiality obligations are governed by that agreement and prevail in case of conflict.",
      "We do not intentionally disclose proprietary information to third parties except where legally required or contractually authorized.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "General advisory insights, frameworks, and methodologies used during consultation remain the intellectual property of Kotnala Consultancy.",
      "Client-owned source code, internal architecture artifacts, trademarks, and business data remain the property of the client.",
      "Any custom deliverables, code, or formal architecture documents are governed by the applicable statement of work or separate contract.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "Consultation guidance is provided on a professional best-effort basis and does not constitute legal, tax, financial, or regulatory advice.",
      "Kotnala Consultancy is not liable for indirect, incidental, consequential, or special damages arising from use of consultation outcomes.",
      "To the maximum extent permitted by law, aggregate liability is limited to fees paid for the specific consultation engagement giving rise to the claim.",
    ],
  },
  {
    title: "8. Privacy",
    body: [
      "Contact and booking data is collected to manage consultations, communicate with you, and maintain operational records.",
      "We apply appropriate technical and organizational controls to protect submitted information and process data in accordance with applicable privacy obligations.",
    ],
  },
  {
    title: "9. Communication",
    body: [
      "Official communications should be sent to office@kotnala.com, divyansh@kotnala.consulting, divyansh.consultant@kotnala.consulting, divyansh.consultant@kotnala.us, or divyansh@kotnala.us.",
      "Operational notices, schedule updates, and service clarifications delivered from these channels are considered authoritative.",
    ],
  },
  {
    title: "10. Jurisdiction",
    body: [
      "These Terms and Conditions are governed by the laws of India.",
      "Courts in Uttarakhand, India, shall have exclusive jurisdiction over disputes unless a separate signed agreement specifies otherwise.",
    ],
  },
  {
    title: "11. Contact Information",
    body: [
      "Kotnala Consultancy Private Limited",
      "Shiv Shakti Enclave, Mamchand Chowk, Balawala, Nakronda, Dehradun, Uttarakhand, India 248008",
      "Email: office@kotnala.com",
      "Regional Operations: divyansh@kotnala.consulting, divyansh@kotnala.us",
      "Regional Consultation: divyansh.consultant@kotnala.consulting, divyansh.consultant@kotnala.us",
    ],
  },
] as const;

export default function TermsAndConditionsPage() {
  return (
    <main id="main-content" className="flex-1 bg-[#070d17] text-white">
      <div className="layout-container section-space">
        <Reveal>
          <header className="mb-10 rounded-3xl border border-white/12 bg-white/6 p-7 shadow-floating backdrop-blur-xl sm:p-10">
            <p className="text-xs font-semibold tracking-[0.15em] text-cyan-100 uppercase">Legal</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-5xl">Terms &amp; Conditions</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/78 sm:text-base">
              Please review these terms before engaging Kotnala Consultancy for strategic or technical
              consultations. These terms establish process clarity, commercial standards, and mutual
              responsibilities for both parties.
            </p>
          </header>
        </Reveal>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 40}>
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
