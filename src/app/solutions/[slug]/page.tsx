import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllSolutions, getSolutionBySlug, getRelatedSolutions } from "@/content/solutions";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/seo/schemas";
import { SolutionLandingPage } from "@/components/sections/solution-page-sections";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSolutions().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);

  if (!sol) {
    return generateSEOMetadata({ title: "Solution Not Found", description: "Requested solution not found.", canonical: canonicalFromPath("/solutions"), noIndex: true });
  }

  return generateSEOMetadata({
    title: sol.metaTitle,
    description: sol.metaDescription,
    canonical: canonicalFromPath(`/solutions/${sol.slug}`),
    keywords: [...sol.keywords.primary, ...sol.keywords.secondary, ...sol.keywords.semantic],
  });
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);

  if (!sol) {
    notFound();
  }

  const related = getRelatedSolutions(sol.slug, 6);
  const canonicalUrl = canonicalFromPath(`/solutions/${sol.slug}`);

  return (
    <main id="main-content" className="flex-1">
      <JsonLd id={`${sol.slug}-breadcrumb`} data={buildBreadcrumbSchema([{ name: "Home", item: canonicalFromPath("/") }, { name: "Solutions", item: canonicalFromPath("/solutions") }, { name: sol.title, item: canonicalUrl }])} />

      <JsonLd id={`${sol.slug}-faq`} data={buildFaqSchema(sol.faq.map((q) => ({ question: q.question, answer: q.answer })))} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: sol.title }]} />

      <SolutionLandingPage solution={sol} related={related} />
    </main>
  );
}
