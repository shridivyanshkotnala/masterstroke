import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Layers3, Sparkles } from "lucide-react";

import type { ServicePageData } from "@/content/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServiceLandingPageProps = {
  service: ServicePageData;
  relatedServices: ServicePageData[];
};

const sectionCardClass =
  "rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_16px_42px_oklch(0.16_0.02_255/0.16)] backdrop-blur-sm sm:p-8";

export function ServiceLandingPage({ service, relatedServices }: ServiceLandingPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,oklch(0.62_0.09_250/0.18),transparent_45%),radial-gradient(circle_at_bottom_left,oklch(0.71_0.08_260/0.16),transparent_48%)]" />
        <div className="layout-container section-space pb-16">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{service.categoryTitle}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {service.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{service.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
              Book Strategy Call
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="layout-container section-space grid gap-6 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Problem Statement</h2>
          <p className="mt-4 text-muted-foreground">{service.problemStatement}</p>
        </article>
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Why Businesses Need This Service</h2>
          <p className="mt-4 text-muted-foreground">{service.whyNeed}</p>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Our Approach</h2>
          <ul className="mt-5 space-y-3">
            {service.approach.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Capabilities</h2>
          <ul className="mt-5 space-y-3">
            {service.capabilities.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <Layers3 className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Technology Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.technologyStack.map((item) => (
              <span key={item} className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Industries Served</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.industriesServed.map((item) => (
              <span key={item} className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Business Benefits</h2>
          <ul className="mt-5 space-y-3">
            {service.businessBenefits.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <Sparkles className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Delivery Process</h2>
          <ol className="mt-5 space-y-3">
            {service.deliveryProcess.map((item, index) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <span className="inline-flex size-6 items-center justify-center rounded-full border border-border/80 text-xs text-foreground">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Case Study / Success Story</h2>
          <p className="mt-3 text-sm tracking-[0.16em] text-muted-foreground uppercase">{service.caseStudy.clientType}</p>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Challenge:</strong> {service.caseStudy.problem}
            </p>
            <p>
              <strong className="text-foreground">Solution:</strong> {service.caseStudy.solution}
            </p>
            <p>
              <strong className="text-foreground">Outcome:</strong> {service.caseStudy.outcome}
            </p>
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Why Kotnala</h2>
          <ul className="mt-5 space-y-3">
            {service.whyKotnala.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <ChevronRight className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="layout-container pb-10">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Keyword Cluster Coverage</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <KeywordClusterCard title="Primary Keywords" items={service.keywords.primary} />
            <KeywordClusterCard title="Secondary Keywords" items={service.keywords.secondary} />
            <KeywordClusterCard title="Semantic Keywords" items={service.keywords.semantic} />
          </div>
        </article>
      </section>

      <section className="layout-container pb-10">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Related Services</h2>
          <p className="mt-3 text-muted-foreground">
            Strengthen technical strategy with adjacent capabilities and implementation pathways.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-2xl border border-border/70 bg-muted/30 p-5 transition-colors hover:border-primary/40"
              >
                <p className="font-heading text-lg font-semibold tracking-tight">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-foreground">
                  Explore service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="layout-container pb-10">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <div className="mt-5 divide-y divide-border/70 rounded-2xl border border-border/70 bg-background/30">
            {service.faq.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="cursor-pointer list-none font-medium text-foreground transition-colors group-open:text-primary">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </section>

      <section className="layout-container pb-20">
        <div
          className={cn(
            sectionCardClass,
            "border-primary/30 bg-[linear-gradient(130deg,#0F172A_0%,#111827_56%,#172235_100%)] text-white",
          )}
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">{service.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-[#CBD5E1]">{service.ctaDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-call" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Schedule Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

type KeywordClusterCardProps = {
  title: string;
  items: string[];
};

function KeywordClusterCard({ title, items }: KeywordClusterCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 block size-1.5 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
