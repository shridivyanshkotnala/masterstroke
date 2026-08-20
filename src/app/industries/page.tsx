import type { Metadata } from "next";

import Link from "next/link";
import { BottomConversionBanner, TopConversionCta } from "@/components/sections/conversion-cta";
import { getAllIndustries } from "@/content/industries";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Industries",
    description: "Industries served by Kotnala Consultancy — healthcare, finance, manufacturing and more.",
    canonical: canonicalFromPath("/industries"),
    keywords: ["industries", "industry software", "enterprise software"],
  });
}

export default async function IndustriesIndexPage() {
  const all = getAllIndustries();

  return (
    <main id="main-content" className="flex-1">
      <section className="layout-container section-space">
        <h1 className="font-heading text-4xl font-semibold">Industries</h1>
        <p className="mt-3 text-muted-foreground">Explore industry-specific software and solutions we deliver.</p>

        <div className="mt-8">
          <TopConversionCta
            badge="INDUSTRY STRATEGY"
            heading="Let's Solve Your Industry Challenges"
            description="Every industry has unique operational and technology requirements. Book a consultation to discuss your goals."
            primaryLabel="Book Strategy Call"
            primaryHref="/book-call"
            secondaryLabel="Explore Services"
            secondaryHref="/services"
            stats={[
              { value: 18, suffix: "+", label: "Industries Covered" },
              { value: 99, suffix: "%", label: "Delivery Focus" },
              { value: "Global", label: "Consulting Coverage" },
              { value: "AI + Cloud", label: "Transformation Lens" },
            ]}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((item) => (
            <Link
              key={item.slug}
              href={`/industries/${item.slug}`}
              className="group rounded-2xl border border-border/70 bg-muted/30 p-6 hover:border-primary/40"
            >
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <BottomConversionBanner
            heading="Let's Transform Your Industry Together"
            description="Schedule a strategy session to discuss AI, automation, enterprise software, cloud migration, and digital transformation."
            primaryLabel="Book Strategy Call"
            primaryHref="/book-call"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
          />
        </div>
      </section>
    </main>
  );
}
