"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { ServicesMegaMenuDesktop, ServicesMegaMenuMobile } from "@/components/navigation/services-mega-menu";
import { IndustriesMegaMenuDesktop, IndustriesMegaMenuMobile } from "@/components/navigation/industries-mega-menu";
import { SolutionsMegaMenuDesktop, SolutionsMegaMenuMobile } from "@/components/navigation/solutions-mega-menu";
import { buttonVariants } from "@/components/ui/button";
import { navigationConfig } from "@/config/navigation.config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-header)] border-b border-transparent transition-all duration-200",
        scrolled
          ? "border-border/80 bg-background/90 shadow-[0_8px_20px_oklch(0.2_0_0/0.08)] backdrop-blur-lg"
          : "bg-background/55 backdrop-blur-sm",
      )}
    >
      <div className="layout-container flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="font-heading text-base font-semibold tracking-tight" aria-label="Kotnala Consultancy home">
          Kotnala Consultancy
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {navigationConfig.primary.map((item) => (
              <li key={item.href}>
                {item.href === "/services" ? (
                  <ServicesMegaMenuDesktop />
                ) : item.href === "/industries" ? (
                  <IndustriesMegaMenuDesktop />
                ) : item.href === "/solutions" ? (
                  <SolutionsMegaMenuDesktop />
                ) : (
                  <Link
                    href={item.href}
                    className="relative transition-colors duration-200 hover:text-foreground after:absolute after:bottom-[-0.35rem] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
            Book Strategy Call
          </Link>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div id="mobile-site-nav" className="layout-container pb-4 lg:hidden">
          <div className="rounded-2xl border border-border/70 bg-background/90 p-4 shadow-[0_12px_30px_oklch(0.16_0.02_255/0.2)] backdrop-blur-lg">
            <ul className="space-y-2">
              <li>
                <ServicesMegaMenuMobile className="w-full" onNavigate={() => setMobileMenuOpen(false)} />
              </li>
              <li>
                <IndustriesMegaMenuMobile className="w-full" onNavigate={() => setMobileMenuOpen(false)} />
              </li>
              <li>
                <SolutionsMegaMenuMobile className="w-full" onNavigate={() => setMobileMenuOpen(false)} />
              </li>
              {navigationConfig.primary
                .filter((item) => !["/services", "/industries", "/solutions"].includes(item.href))
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl border border-border/70 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}
