import Link from "next/link";
import Image from "next/image";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { buildBreadcrumbSchema, buildOrganizationSchema, buildPersonSchema } from "@/seo/schemas";
import { siteConfig } from "@/config/site.config";
import { joinUrl } from "@/lib/url";
import { buttonVariants } from "@/components/ui/button";
import { CompanyProblemsEcosystemSection } from "@/components/sections/company-problems-ecosystem";
import { CompanyInsideGallerySection } from "@/components/sections/company-inside-gallery";
import { CompanyConversionExperience } from "@/components/sections/company-conversion-experience";

export const metadata = {
  title: "Company — Kotnala Consultancy | Enterprise Software & AI Consulting",
  description:
    "Kotnala Consultancy partners with enterprises to build resilient software, adopt AI responsibly, and provide CTO-as-a-Service for long-term technical leadership.",
};

const canonical = joinUrl(siteConfig.siteUrl, "/company");
const founderImage = "/images/company/founder/divyansh-kotnala-portrait.png";

export default function CompanyPage() {
  return (
    <main>
      <JsonLd id="company-organization" data={buildOrganizationSchema()} />
      <JsonLd
        id="company-founder"
        data={buildPersonSchema({
          name: "Divyansh Kotnala",
          jobTitle: "Founder & Director",
          image: joinUrl(siteConfig.siteUrl, founderImage),
        })}
      />
      <JsonLd id="company-breadcrumb" data={buildBreadcrumbSchema([{ name: "Home", item: joinUrl(siteConfig.siteUrl, "/") }, { name: "Company", item: canonical }])} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company" }]} />

      {/* HERO: editorial two-column hero with company identity card */}
      <header className="layout-container section-space">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-muted/30 px-3 py-1 text-xs font-medium motion-safe-fade-up" style={{ animationDelay: '60ms' }}>About Kotnala Consultancy</span>
            <h1 className="mt-6 font-heading text-5xl font-extrabold leading-tight motion-safe-fade-up" style={{ animationDelay: '120ms' }}>Kotnala Consultancy Private Limited — engineering technology partnerships that scale businesses.</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-prose motion-safe-fade-up" style={{ animationDelay: '200ms' }}>
              We partner with executive teams to design, build, and operate resilient enterprise software and responsible AI systems. Our focus is measurable outcomes, technical stewardship, and long-term leadership through CTO-as-a-Service and architecture-led delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe-fade-up" style={{ animationDelay: '300ms' }}>
              <Link
                href="/book-call"
                className={buttonVariants({ size: "lg", className: "bg-white text-foreground hover:shadow-floating" })}
              >
                <span className="inline-flex items-center gap-2">
                  Book Strategy Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Company identity block (editorial panel) */}
            <div className="mt-8 rounded-2xl border border-border/60 p-4 max-w-sm motion-safe-fade-up" style={{ animationDelay: '380ms' }} role="region" aria-labelledby="company-identity-heading">
              <h3 id="company-identity-heading" className="text-sm font-medium">Company information</h3>
              <dl className="mt-3 grid gap-2">
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M3 7h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <dt className="text-sm font-semibold">Kotnala Consultancy Private Limited</dt>
                    <dd className="text-sm text-muted-foreground">Enterprise Software Development • AI Consulting • CTO-as-a-Service</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M12 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6 22h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <div>
                    <dt className="text-sm font-semibold">Headquarters</dt>
                    <dd className="text-sm text-muted-foreground">Dehradun, Uttarakhand, India (placeholder)</dd>
                  </div>
                </div>

              </dl>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 border border-border/60 shadow-floating dashboard-float" role="figure" aria-labelledby="company-card-title">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 id="company-card-title" className="text-lg font-semibold">Kotnala Consultancy</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Enterprise software • AI consulting • CTO-as-a-Service</p>
                </div>
                <div className="rounded-full bg-surface p-2" aria-hidden>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12h18" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 3v18" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <hr className="my-4 border-border/50" />

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm">Enterprise Software Development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M12 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M6 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm">AI Consulting & Adoption</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M12 5v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm">Architecture & CTO Leadership</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm">Digital Transformation & Automation</span>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Link href="/book-call" className={buttonVariants({ size: "lg", className: "bg-white text-foreground hover:shadow-floating" })}>
                  Book Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STORY: sticky editorial panel + animated milestone timeline */}
      <section id="our-story" className="border-t border-border/70 py-14 lg:py-20">
        <div className="layout-container story-shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <aside className="lg:col-span-4 story-panel lg:sticky lg:top-24">
              <p className="story-kicker">Our Story</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl">Why we started</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
                Kotnala exists to bridge the gap between executive ambition and engineering execution through architecture discipline,
                business alignment, and long-term technology stewardship.
              </p>
              <div className="story-progress mt-6" aria-hidden>
                <span className="story-progress-line" />
                <span className="story-progress-glow" />
              </div>
            </aside>

            <div className="lg:col-span-8">
              <ol className="story-timeline" aria-label="Kotnala story milestones">
                <li className="story-step story-step-1">
                  <span className="story-node" aria-hidden />
                  <article className="story-card" aria-labelledby="story-step-1-title">
                    <p className="story-step-number">01</p>
                    <h3 id="story-step-1-title" className="story-step-title">The Industry Problem</h3>
                    <p className="story-step-copy">
                      Businesses struggle with fragmented systems, disconnected data, and technology decisions that fail to support
                      long-term growth.
                    </p>
                  </article>
                </li>

                <li className="story-step story-step-2">
                  <span className="story-node" aria-hidden />
                  <article className="story-card" aria-labelledby="story-step-2-title">
                    <p className="story-step-number">02</p>
                    <h3 id="story-step-2-title" className="story-step-title">What We Observed</h3>
                    <p className="story-step-copy">
                      Projects often fail not because of tools, but because engineering lacks strategic direction, ownership clarity,
                      and business alignment.
                    </p>
                  </article>
                </li>

                <li className="story-step story-step-3">
                  <span className="story-node" aria-hidden />
                  <article className="story-card" aria-labelledby="story-step-3-title">
                    <p className="story-step-number">03</p>
                    <h3 id="story-step-3-title" className="story-step-title">Why Existing Approaches Fail</h3>
                    <p className="story-step-copy">
                      Tactical delivery alone creates technical debt. Without architecture governance and executive-level engineering
                      leadership, teams scale risk faster than value.
                    </p>
                  </article>
                </li>

                <li className="story-step story-step-4">
                  <span className="story-node" aria-hidden />
                  <article className="story-card" aria-labelledby="story-step-4-title">
                    <p className="story-step-number">04</p>
                    <h3 id="story-step-4-title" className="story-step-title">Our Response</h3>
                    <p className="story-step-copy">
                      We built Kotnala Consultancy to connect strategy with execution through enterprise architecture, AI consulting,
                      and CTO-as-a-Service partnerships.
                    </p>
                  </article>
                </li>

                <li className="story-step story-step-5">
                  <span className="story-node" aria-hidden />
                  <article className="story-card" aria-labelledby="story-step-5-title">
                    <p className="story-step-number">05</p>
                    <h3 id="story-step-5-title" className="story-step-title">The Kotnala Philosophy</h3>
                    <p className="story-step-copy">
                      Build meaningful technology that lasts: business-first decisions, high engineering standards, and systems
                      designed for resilience, clarity, and sustainable growth.
                    </p>
                  </article>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER: executive storytelling section */}
      <section id="founder" className="border-t border-border/70 py-14 lg:py-20">
        <div className="layout-container founder-vision-shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <figure className="founder-portrait-frame group relative mx-auto aspect-[4/5] max-w-[28rem] overflow-hidden rounded-3xl lg:mx-0 lg:max-w-none">
                <Image
                  src={founderImage}
                  alt="Portrait of Divyansh Kotnala, Founder and Director of Kotnala Consultancy"
                  fill
                  sizes="(max-width: 1024px) 92vw, 38vw"
                  className="founder-portrait object-cover"
                />
                <figcaption className="founder-photo-caption">
                  <p className="text-sm font-semibold">Divyansh Kotnala</p>
                  <p className="text-xs text-muted-foreground">Founder & Director</p>
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">Founder's Vision</p>

              <blockquote className="founder-quote mt-4 border-l-2 border-brand/50 pl-5">
                <p className="founder-quote-mark" aria-hidden>
                  “
                </p>
                <p className="founder-quote-text">
                  We don&apos;t just build software. We build <span className="text-foreground">technology leadership systems</span> that
                  help businesses make better decisions, ship with confidence, and scale without losing architectural integrity.
                </p>
              </blockquote>

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                <p>
                  Engineering leadership matters because technology decisions shape revenue, speed, and resilience. Great systems are not
                  accidental — they are outcomes of clear ownership, strong architecture, and disciplined execution.
                </p>
                <p>
                  At Kotnala Consultancy, we combine enterprise software architecture, AI consulting, and CTO-as-a-Service to bridge business
                  strategy with technical delivery. We prioritize long-term clarity over short-term velocity and measurable outcomes over
                  vanity progress.
                </p>
                <p>
                  Our philosophy is simple: build systems that remain reliable under growth, empower teams with decision-quality data, and
                  create a durable technology foundation for long-term partnerships.
                </p>
              </div>

              <article className="founder-profile-card mt-7" aria-labelledby="founder-profile-heading">
                <h3 id="founder-profile-heading" className="text-sm font-semibold tracking-wide uppercase">
                  Founder Profile
                </h3>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <li className="founder-profile-item">
                    <span className="founder-profile-key">Name</span>
                    <span className="founder-profile-value">Divyansh Kotnala</span>
                  </li>
                  <li className="founder-profile-item">
                    <span className="founder-profile-key">Role</span>
                    <span className="founder-profile-value">Founder & Director</span>
                  </li>
                  <li className="founder-profile-item sm:col-span-2">
                    <span className="founder-profile-key">Organization</span>
                    <span className="founder-profile-value">Kotnala Consultancy Private Limited</span>
                  </li>
                  <li className="founder-profile-item">
                    <span className="founder-profile-key">Expertise</span>
                    <span className="founder-profile-value">Enterprise Software Architect</span>
                  </li>
                  <li className="founder-profile-item">
                    <span className="founder-profile-key">Specialization</span>
                    <span className="founder-profile-value">AI Consultant</span>
                  </li>
                  <li className="founder-profile-item sm:col-span-2">
                    <span className="founder-profile-key">Leadership Offering</span>
                    <span className="founder-profile-value">CTO-as-a-Service</span>
                  </li>
                </ul>
              </article>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/book-call"
                  className={buttonVariants({ size: "lg", className: "bg-white text-foreground hover:shadow-floating" })}
                >
                  <span className="inline-flex items-center gap-2">
                    Book Strategy Call
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "outline", size: "lg", className: "border-border/70 bg-background/40" })}
                >
                  <span className="inline-flex items-center gap-2">
                    Connect With the Founder
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9 7h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION floating cards */}
      <section id="vision-mission" className="py-12">
        <div className="layout-container">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="interactive-card rounded-3xl p-6 border" role="article">
              <div className="text-xs text-muted-foreground uppercase">Vision</div>
              <h3 className="mt-3 font-semibold">Trusted technology partner for strategic growth</h3>
              <p className="mt-2 text-sm text-muted-foreground">We help organizations convert technical investments into measurable business outcomes.</p>
            </div>
            <div className="interactive-card rounded-3xl p-6 border" role="article">
              <div className="text-xs text-muted-foreground uppercase">Mission</div>
              <h3 className="mt-3 font-semibold">Deliver business-first engineering</h3>
              <p className="mt-2 text-sm text-muted-foreground">Practical architecture, reliable delivery, and responsible AI to unlock new capabilities.</p>
            </div>
            <div className="interactive-card rounded-3xl p-6 border" role="article">
              <div className="text-xs text-muted-foreground uppercase">Philosophy</div>
              <h3 className="mt-3 font-semibold">Simplicity, ownership, and measurable impact</h3>
              <p className="mt-2 text-sm text-muted-foreground">Prefer clear abstractions and operational designs that reduce long-term cost.</p>
            </div>
          </div>
        </div>
      </section>

      <CompanyProblemsEcosystemSection />

      {/* CONSULTING APPROACH: animated pipeline */}
      <section id="approach" className="py-12">
        <div className="layout-container">
          <h2 className="text-2xl font-semibold">Our consulting approach</h2>
          <div className="mt-6 delivery-stream-shell" aria-hidden>
            <div className="delivery-stream-blueprint" />
            <svg className="delivery-stream-svg" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid meet">
              <path className="delivery-stream-route-base" d="M40 110 H300 C420 110, 480 40, 600 40 H860 C980 40, 1060 110, 1160 110" stroke="rgba(148,163,184,0.14)" />
              <path className="delivery-stream-route-flow" d="M40 110 H300 C420 110, 480 40, 600 40 H860 C980 40, 1060 110, 1160 110" />
            </svg>
            <ul className="delivery-stream-grid">
              {['Discovery','Business Analysis','Architecture','Design','Development','QA','Deployment','CTO-as-a-Service'].map((s, i) => (
                <li key={s} className="delivery-stream-station" role="listitem">
                  <span className="delivery-stream-step">{i+1}</span>
                  <span className="delivery-stream-label">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link href="/book-call" className="btn-primary">Discuss Your Project</Link>
          </div>
        </div>
      </section>

      <CompanyInsideGallerySection />

      <CompanyConversionExperience />
    </main>
  );
}
