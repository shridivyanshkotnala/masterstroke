import type { Metadata } from "next";
import Link from "next/link";

import { BottomConversionBanner, TopConversionCta } from "@/components/sections/conversion-cta";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { getServicesByCategory, serviceCategories } from "@/content/services";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildBreadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = generateSEOMetadata({
  title: "Technology Services",
  description:
    "Explore Kotnala Consultancy services across software development, AI, web, mobile, cloud, DevOps, and strategic technology consulting.",
  canonical: canonicalFromPath("/services"),
  keywords: [
    "software development services",
    "ai development services",
    "web development services",
    "mobile app development services",
    "cloud devops consulting",
    "technology consulting services",
  ],
});

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Services" },
];

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <JsonLd
        id="services-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: "Home", item: canonicalFromPath("/") },
          { name: "Services", item: canonicalFromPath("/services") },
        ])}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="layout-container pb-10">
        <div className="rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_top_right,oklch(0.7_0.09_250/0.2),transparent_48%),linear-gradient(145deg,oklch(0.23_0.02_250/0.9),oklch(0.17_0.01_252/0.9))] p-8 text-white shadow-[0_20px_48px_oklch(0.12_0.01_255/0.32)] sm:p-12">
          <p className="text-xs tracking-[0.18em] text-slate-300 uppercase">Enterprise Services Architecture</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Service Ecosystem Built For Long-Term Topical Authority
          </h1>
        </div>
      </section>

      <section className="layout-container pb-10">
        <TopConversionCta
          badge="FREE STRATEGY SESSION"
          heading="Not Sure Which Service Fits Your Business?"
          description="Whether you're building a SaaS platform, modernizing legacy software, implementing AI, or planning enterprise architecture, our consultants will help define the right technical roadmap."
          primaryLabel="Book Strategy Call"
          primaryHref="/book-call"
          secondaryLabel="Explore Solutions"
          secondaryHref="/solutions"
          stats={[
            { value: 250, suffix: "+", label: "Projects Delivered" },
            { value: 99, suffix: "%", label: "Client Satisfaction" },
            { value: "24/7", label: "Global Support" },
            { value: "15 min", label: "Consultation" },
          ]}
        />
      </section>

      <section className="layout-container grid gap-6">
        {serviceCategories.map((category) => {
          const services = getServicesByCategory(category.slug);

          return (
            <article
              key={category.slug}
              className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_16px_42px_oklch(0.16_0.02_255/0.16)] backdrop-blur-sm sm:p-8"
            >
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{category.title}</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">{category.description}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group rounded-2xl border border-border/70 bg-muted/30 p-5 transition-colors hover:border-primary/45"
                  >
                    <h3 className="font-heading text-lg font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-foreground">Read service page</span>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="layout-container mt-12">
        <BottomConversionBanner
          heading="Ready to Build Your Next Software Product?"
          description="Let's discuss your requirements and create a scalable technical roadmap for your business."
          primaryLabel="Book Strategy Call"
          primaryHref="/book-call"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
        />
      </section>
    </main>
  );
}
