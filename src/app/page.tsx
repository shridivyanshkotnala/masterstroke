import type { Metadata } from "next";

import {
  BusinessImpactSection,
  CaseStudiesSection,
  ConsultancyMeetingsSection,
  CoreServicesSection,
  EngineeringProcessSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  homeFaqItems,
  IndustriesSection,
  TechnologyStackSection,
  TestimonialsSection,
  TrustedBySection,
  WhyKotnalaSection,
} from "@/components/sections/homepage-sections";
import { JsonLd } from "@/components/shared/json-ld";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildFaqSchema } from "@/seo/schemas";

export const metadata: Metadata = generateSEOMetadata({
  title: "Software Development Company & AI Consulting",
  description:
    "Kotnala Consultancy helps startups, SMEs, and enterprises solve business-critical challenges through enterprise software development, AI consulting, and cloud-native engineering.",
  keywords: [
    "software development company",
    "enterprise software development",
    "ai consulting company",
    "ai development services",
    "digital transformation consulting",
    "technology consulting",
  ],
});

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd
        id="home-faq-schema"
        data={buildFaqSchema(homeFaqItems.map((item) => ({ question: item.question, answer: item.answer })))}
      />

      <HeroSection />
      <TrustedBySection />
      <BusinessImpactSection />
      <CoreServicesSection />
      <IndustriesSection />
      <EngineeringProcessSection />
      <CaseStudiesSection />
      <TechnologyStackSection />
      <WhyKotnalaSection />
      <TestimonialsSection />
      <ConsultancyMeetingsSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
