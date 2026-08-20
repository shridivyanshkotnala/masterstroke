import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Layers3, Sparkles } from "lucide-react";

import type { IndustryPageData } from "@/content/industries";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  industry: IndustryPageData;
  related: IndustryPageData[];
};

const sectionCardClass =
  "rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_16px_42px_oklch(0.16_0.02_255/0.16)] backdrop-blur-sm sm:p-8";

export function IndustryLandingPage({ industry, related }: Props) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="layout-container section-space pb-16">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Industry</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{industry.h1}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{industry.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
              Book Strategy Call
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore Related Services
            </Link>
          </div>
        </div>
      </section>

      <section className="layout-container section-space grid gap-6 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Business Overview</h2>
          <p className="mt-4 text-muted-foreground">{industry.overview}</p>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Core Challenges</h3>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-muted-foreground">
                  <ChevronRight className="mt-0.5 size-4 text-primary" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Why Businesses Need Industry-led Software</h2>
          <p className="mt-4 text-muted-foreground">
            Modern businesses in this industry struggle with legacy systems, regulatory requirements and fragmented
            workflows that slow decisions. A purpose-built software platform brings operational efficiency, auditability
            and faster time-to-insight.
          </p>
          <p className="mt-3 text-muted-foreground">{industry.intro}</p>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">How Kotnala Solves Them</h2>
          <ul className="mt-5 space-y-3">
            {industry.howKotnalaSolves.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/book-call" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Discuss This Industry
            </Link>
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Recommended Solutions & Services</h2>
          <p className="mt-3 text-muted-foreground">Adjacency recommendations to accelerate delivery and reduce risk.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {industry.recommendedServices.map((s) => (
              <Link key={s} href={`/services/${s}`} className="group rounded-2xl border border-border/70 bg-muted/30 p-4">
                <p className="font-heading text-lg font-semibold">{s.replace(/-/g, " ")}</p>
                <p className="mt-2 text-sm text-muted-foreground">Explore service</p>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Technology Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {industry.technologyStack.map((t) => (
              <span key={t} className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Business Benefits</h2>
          <ul className="mt-5 space-y-3">
            {industry.businessBenefits.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <Sparkles className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Delivery Process</h2>
          <ol className="mt-5 space-y-3">
            {industry.developmentProcess.map((item, index) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <span className="inline-flex size-6 items-center justify-center rounded-full border border-border/80 text-xs text-foreground">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Why Kotnala</h2>
          <ul className="mt-5 space-y-3">
            {industry.whyKotnala.map((item) => (
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
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Related Industries</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/industries/${r.slug}`} className="group rounded-lg border p-4 hover:border-primary/40">
                <p className="font-heading text-lg font-semibold">{r.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm">
                  Explore
                  <ArrowRight className="size-4" />
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
            {industry.faq.map((item) => (
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
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">{industry.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-[#CBD5E1]">{industry.ctaDescription}</p>
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
