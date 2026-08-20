"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Bot, Layers, ShoppingCart } from "lucide-react";

import { solutionsMegaMenuData } from "@/content/solutions";
import { cn } from "@/lib/utils";

const solutionIconMap = {
  Bot,
  Layers,
  ShoppingCart,
} as const;

export function SolutionsMegaMenuDesktop() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(() => {
    if (!pathname.startsWith("/solutions")) return undefined;
    return solutionsMegaMenuData.find((category) => category.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)))?.slug;
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="group relative">
      <button ref={triggerRef} type="button" aria-haspopup="menu" aria-expanded={open} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={() => setOpen((v) => !v)} className={cn("group/trigger relative inline-flex items-center transition-colors duration-200 hover:text-foreground", pathname.startsWith("/solutions") ? "text-foreground" : "") }>
        Solutions
        <span className={cn("absolute right-0 bottom-[-0.35rem] left-0 h-px origin-left bg-foreground/70 transition-transform duration-200", pathname.startsWith("/solutions") || open ? "scale-x-100" : "scale-x-0")} />
      </button>

      <div id="solutions-mega-navigation" ref={menuRef} role="navigation" aria-label="Solutions navigation" className={cn("fixed left-1/2 z-[85] w-[min(calc(100vw-2rem),86rem)] -translate-x-1/2 transition-all duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]", open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100")}>
        <div className="relative max-h-[82vh] touch-pan-y overflow-y-auto overscroll-contain rounded-[1.8rem] border border-border/65 bg-[linear-gradient(155deg,#0B1321_0%,#101A2B_56%,#172235_100%)] p-5 shadow-[0_24px_60px_oklch(0.1_0.01_255/0.35)] scrollbar-thin-dark md:p-6">
          <div className="relative grid gap-5 xl:grid-cols-[minmax(0,4fr)_minmax(0,1.2fr)]">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {solutionsMegaMenuData.map((category) => {
                const Icon = solutionIconMap[category.featuredIcon as keyof typeof solutionIconMap] ?? Bot;
                const categoryActive = activeCategory === category.slug;

                return (
                  <section key={category.slug} className={cn("group/card rounded-2xl border bg-background/42 p-4 transition-all duration-220", categoryActive ? "border-primary/35 bg-background/56" : "border-border/65")} style={{ animationDelay: `${solutionsMegaMenuData.findIndex((entry) => entry.slug === category.slug) * 35}ms` }}>
                    <div className="flex items-start gap-3">
                      <span className={cn("inline-flex size-9 items-center justify-center rounded-xl border bg-background/72", categoryActive ? "border-primary/45" : "border-border/70")}>
                        <Icon className={cn("size-4", categoryActive ? "text-primary" : "text-foreground")} />
                      </span>
                      <div>
                        <h3 className={cn("font-heading text-sm font-semibold tracking-wide uppercase", categoryActive ? "text-foreground" : "text-foreground/95")}>{category.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground/90">{category.description}</p>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {category.links.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} data-mega-link="true" className={cn("group/item flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-2 text-sm transition-all duration-200", pathname === item.href ? "border-primary/35 bg-background/70 text-foreground" : "text-muted-foreground/95")}>
                            <span>{item.label}</span>
                            <ArrowRight className="size-3.5 text-muted-foreground" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>

            <aside className="group/panel relative overflow-hidden rounded-2xl border border-white/18 bg-[linear-gradient(155deg,#0F172A_0%,#111827_52%,#1E293B_100%)] p-5 text-white shadow-[0_16px_34px_rgba(2,6,23,0.55)]">
              <h3 className="relative font-heading text-[1.9rem] leading-tight font-extrabold tracking-tight text-white">Need a Custom Enterprise Solution?</h3>
              <p className="relative mt-5 text-sm leading-6 text-[#CBD5E1]">Design and implement platforms that reduce operational cost and unlock new product channels.</p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionsMegaMenuMobile({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <details className={className}>
      <summary className="cursor-pointer list-none rounded-xl border border-border/70 px-4 py-3 font-medium text-foreground">Solutions</summary>
      <div className="mt-3 space-y-3 rounded-2xl border border-border/70 bg-[linear-gradient(155deg,oklch(0.22_0.015_255/0.94),oklch(0.17_0.01_252/0.95))] p-4">
        {solutionsMegaMenuData.map((category) => (
          <details key={category.slug} className="rounded-xl border bg-background/60 p-3">
            <summary className="cursor-pointer list-none text-sm font-semibold tracking-wide text-foreground uppercase">{category.title}</summary>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{category.description}</p>
            <ul className="mt-3 space-y-2">
              {category.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavigate} className={cn("group/item flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-all duration-200 hover:bg-background/70 hover:text-foreground", pathname === item.href ? "bg-background/70 text-foreground" : "text-muted-foreground")}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </details>
  );
}
