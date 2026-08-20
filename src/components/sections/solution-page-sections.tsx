import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Layers3, Sparkles } from "lucide-react";

import type { SolutionPageData } from "@/content/solutions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  solution: SolutionPageData;
  related: SolutionPageData[];
};

const sectionCardClass =
  "rounded-3xl border border-border/70 bg-card/70 p-6 shadow-[0_16px_42px_oklch(0.16_0.02_255/0.16)] backdrop-blur-sm sm:p-8";

export function SolutionLandingPage({ solution, related }: Props) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="layout-container section-space pb-16">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Solution</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{solution.h1}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{solution.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
              Book Strategy Call
            </Link>
            <Link href="/solutions" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore Related Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="layout-container section-space grid gap-6 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Business Problem</h2>
          <p className="mt-4 text-muted-foreground">{solution.problem}</p>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Core Features</h2>
          <ul className="mt-5 space-y-3">
            {solution.coreFeatures.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <ChevronRight className="mt-0.5 size-4 text-primary" />
                <div>
                  <strong className="text-foreground">{item}</strong>
                  <p className="mt-1 text-sm text-muted-foreground">Enterprise-grade implementation details and examples for {item.toLowerCase()}.</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Technology Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {solution.technologyStack.map((t) => (
              <span key={t} className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </article>

        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Supported Industries</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {solution.supportedIndustries.map((s) => (
              <Link key={s} href={`/industries/${s}`} className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="layout-container grid gap-6 pb-10 lg:grid-cols-2">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Business Benefits</h2>
          <ul className="mt-5 space-y-3">
            {solution.businessBenefits.map((item) => (
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
            {solution.implementationProcess.map((item, index) => (
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

      <section className="layout-container pb-10">
        <article className={sectionCardClass}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Related Solutions</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/solutions/${r.slug}`} className="group rounded-lg border p-4 hover:border-primary/40">
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
            {solution.faq.map((item) => (
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
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">{solution.ctaTitle}</h2>
          <p className="mt-4 max-w-3xl text-[#CBD5E1]">{solution.ctaDescription}</p>
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
