import type { Metadata } from "next";

import Link from "next/link";
import { BottomConversionBanner, TopConversionCta } from "@/components/sections/conversion-cta";
import { getAllSolutions } from "@/content/solutions";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Solutions",
    description: "Solutions by Kotnala Consultancy — ERP, CRM, AI assistants, analytics and more.",
    canonical: canonicalFromPath("/solutions"),
    keywords: ["solutions", "software platforms", "enterprise solutions"],
  });
}

export default async function SolutionsIndexPage() {
  const all = getAllSolutions();

  return (
    <main id="main-content" className="flex-1">
      <section className="layout-container section-space">
        <h1 className="font-heading text-4xl font-semibold">Solutions</h1>
        <p className="mt-3 text-muted-foreground">Platform solutions and product offerings for enterprise systems.</p>

        <div className="mt-8">
          <TopConversionCta
            badge="CUSTOM ARCHITECTURE"
            heading="Need a Custom Solution Instead?"
            description="Not every business fits inside a predefined solution. We design custom enterprise software tailored to your workflows."
            primaryLabel="Book Strategy Call"
            primaryHref="/book-call"
            secondaryLabel="Talk to an Architect"
            secondaryHref="/contact"
            stats={[
              { value: 120, suffix: "+", label: "Architecture Workshops" },
              { value: 99, suffix: "%", label: "Stakeholder Alignment" },
              { value: "Cloud-native", label: "Build Standards" },
              { value: "15 min", label: "Initial Consultation" },
            ]}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((item) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className="group rounded-2xl border border-border/70 bg-muted/30 p-6 hover:border-primary/40"
            >
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <BottomConversionBanner
            heading="Let's Design the Right Technology Stack"
            description="Discuss architecture, scalability, integrations, cloud infrastructure, AI adoption, and long-term maintenance before development begins."
            primaryLabel="Book Strategy Call"
            primaryHref="/book-call"
            secondaryLabel="Contact Team"
            secondaryHref="/contact"
          />
        </div>
      </section>
    </main>
  );
}
