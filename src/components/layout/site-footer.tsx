import Link from "next/link";

import { navigationConfig } from "@/config/navigation.config";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom Software Development", href: "/services/custom-software-development" },
      { label: "AI Consulting", href: "/services/ai-consulting" },
      { label: "Next.js Development", href: "/services/nextjs-development" },
      { label: "AWS Consulting", href: "/services/aws-consulting" },
      { label: "Technology Consulting", href: "/services/technology-consulting" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail", href: "/industries/retail" },
    ],
  },
] as const;

const whatsappMessage = "Hi there, I want to learn more about Kotnala Consultancy's approach.";
const whatsappLink = `https://wa.me/917011804564?text=${encodeURIComponent(whatsappMessage)}`;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-brand text-brand-foreground">
      <div className="layout-container space-y-10 py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]">
          <div className="space-y-4">
            <p className="font-heading text-xl font-semibold tracking-tight">Kotnala Consultancy Pvt. Ltd.</p>
            <div className="space-y-1 text-sm text-brand-foreground/75">
              <p>CIN: U62099UT2026OPC021331</p>
              <p>Headquater: Shiv Shakti Enclave, Dehradun, UK - 248008</p>
              <p>Email: office@kotnala.com</p>
              <p>Phone: +91 7011804564</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-semibold tracking-wide uppercase">{column.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-brand-foreground/80">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="transition-colors hover:text-brand-foreground">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-t border-brand-foreground/20 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-3 lg:col-start-2 lg:text-right">
            <h2 className="text-sm font-semibold tracking-wide uppercase">Follow</h2>
            <ul className="flex flex-wrap gap-3 lg:justify-end">
              {[
                { label: "WhatsApp Contact", href: whatsappLink },
                { label: "LinkedIn Company", href: "https://linkedin.com/company/kotnala" },
                { label: "LinkedIn Founder", href: "https://linkedin.com/in/divyanshkotnala" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-md border border-brand-foreground/30 px-3 py-1.5 text-sm text-brand-foreground/90 transition-colors hover:bg-white/10 hover:text-brand-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-3 text-xs text-brand-foreground/65 lg:justify-end">
              {navigationConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-brand-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
