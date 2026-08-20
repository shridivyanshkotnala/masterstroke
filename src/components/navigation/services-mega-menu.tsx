"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CloudCog,
  Globe,
  Sparkles,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { servicesMegaMenuData } from "@/content/services";
import { MegaMenuConversionPanel } from "@/components/sections/conversion-cta";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  BriefcaseBusiness,
  CloudCog,
  Code2: Terminal,
  Globe,
  Smartphone,
};

export function ServicesMegaMenuDesktop() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(78);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const activeCategory = useMemo(() => {
    if (!pathname.startsWith("/services")) {
      return undefined;
    }

    return servicesMegaMenuData.find((category) =>
      category.links.some((link) => pathname === link.href || pathname.startsWith(`${link.href}/`)),
    )?.slug;
  }, [pathname]);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    setMenuTop(rect.bottom + 14);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    updateMenuPosition();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      closeMenu();
    }, 150);
  };

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    updateMenuPosition();
    const onViewportChange = () => updateMenuPosition();
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("keydown", onEscape as unknown as EventListener);

    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("keydown", onEscape as unknown as EventListener);
    };
  }, [open]);

  const moveFocus = (direction: 1 | -1) => {
    const menu = menuRef.current;

    if (!menu) {
      return;
    }

    const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>("[data-mega-link='true']"));

    if (links.length === 0) {
      return;
    }

    const activeIndex = links.findIndex((link) => link === document.activeElement);
    const targetIndex = activeIndex === -1 ? (direction === 1 ? 0 : links.length - 1) : (activeIndex + direction + links.length) % links.length;
    links[targetIndex]?.focus();
  };

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => moveFocus(1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => moveFocus(-1));
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  const onMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(-1);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      className="group relative"
      onMouseEnter={openMenu}
      onPointerEnter={openMenu}
      onMouseLeave={(event) => {
        const next = event.relatedTarget as Node | null;

        if (menuRef.current?.contains(next) || triggerRef.current?.contains(next)) {
          return;
        }

        scheduleClose();
      }}
      onPointerLeave={(event) => {
        const next = event.relatedTarget as Node | null;

        if (menuRef.current?.contains(next) || triggerRef.current?.contains(next)) {
          return;
        }

        scheduleClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="services-mega-navigation"
        onMouseEnter={openMenu}
        onPointerEnter={openMenu}
        onMouseLeave={(event) => {
          const next = event.relatedTarget as Node | null;

          if (menuRef.current?.contains(next)) {
            return;
          }

          scheduleClose();
        }}
        onPointerLeave={(event) => {
          const next = event.relatedTarget as Node | null;

          if (menuRef.current?.contains(next)) {
            return;
          }

          scheduleClose();
        }}
        onClick={() => {
          updateMenuPosition();
          setOpen((value) => !value);
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "group/trigger relative inline-flex items-center transition-colors duration-200 hover:text-foreground focus-visible:outline-none",
          pathname.startsWith("/services") ? "text-foreground" : "",
        )}
      >
        Services
        <span
          className={cn(
            "absolute right-0 bottom-[-0.35rem] left-0 h-px origin-left bg-foreground/70 transition-transform duration-200",
            pathname.startsWith("/services") || open ? "scale-x-100" : "scale-x-0",
          )}
        />
      </button>

      <div
        id="services-mega-navigation"
        ref={menuRef}
        role="navigation"
        aria-label="Services navigation"
        onFocusCapture={() => setOpen(true)}
        onMouseEnter={openMenu}
        onPointerEnter={openMenu}
        onMouseLeave={(event) => {
          const next = event.relatedTarget as Node | null;

          if (triggerRef.current?.contains(next)) {
            return;
          }

          scheduleClose();
        }}
        onPointerLeave={(event) => {
          const next = event.relatedTarget as Node | null;

          if (triggerRef.current?.contains(next)) {
            return;
          }

          scheduleClose();
        }}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as Node | null;

          if (!event.currentTarget.contains(next) && !triggerRef.current?.contains(next)) {
            closeMenu();
          }
        }}
        onKeyDown={onMenuKeyDown}
        className={cn(
          "fixed left-1/2 z-[85] w-[min(calc(100vw-2rem),86rem)] -translate-x-1/2 transition-all duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
        )}
        style={{ top: menuTop }}
      >
        <div
          className="relative max-h-[82vh] touch-pan-y overflow-y-auto overscroll-contain rounded-[1.8rem] border border-border/65 bg-[linear-gradient(155deg,#0B1321_0%,#101A2B_56%,#172235_100%)] p-5 shadow-[0_24px_60px_oklch(0.1_0.01_255/0.35)] scrollbar-thin-dark md:p-6"
          onWheel={(event) => {
            const node = event.currentTarget;
            if (node.scrollHeight <= node.clientHeight) {
              return;
            }

            node.scrollTop += event.deltaY;
            event.preventDefault();
          }}
        >
          <div className="pointer-events-none sticky inset-x-0 bottom-0 z-20 -mx-5 -mb-5 mt-6 h-10 bg-gradient-to-b from-transparent via-background/18 to-background/70 md:-mx-6 md:-mb-6" />
          <div className="relative grid gap-5 xl:grid-cols-[minmax(0,4fr)_minmax(0,1.2fr)]">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {servicesMegaMenuData.map((category) => {
                const Icon = iconMap[category.featuredIcon] ?? Sparkles;
                const categoryActive = activeCategory === category.slug;

                return (
                  <section
                    key={category.slug}
                    className={cn(
                      "group/card rounded-2xl border bg-background/42 p-4 shadow-[inset_0_0_0_1px_oklch(0.86_0.02_255/0.08)] transition-all duration-220",
                      "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background/56 hover:shadow-[0_10px_24px_oklch(0.1_0.01_255/0.24)]",
                      categoryActive ? "border-primary/35 bg-background/56" : "border-border/65",
                    )}
                    style={{ animationDelay: `${servicesMegaMenuData.findIndex((entry) => entry.slug === category.slug) * 35}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "inline-flex size-9 items-center justify-center rounded-xl border bg-background/72 transition-transform duration-220 group-hover/card:-rotate-3 group-hover/card:scale-105",
                          categoryActive ? "border-primary/45" : "border-border/70",
                        )}
                      >
                        <Icon className={cn("size-4", categoryActive ? "text-primary" : "text-foreground")} />
                      </span>
                      <div>
                        <h3 className={cn("font-heading text-sm font-semibold tracking-wide uppercase", categoryActive ? "text-foreground" : "text-foreground/95")}>
                          {category.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground/90">{category.description}</p>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5">
                      {category.links.map((item) => (
                        <li key={item.href}>
                          <Link
                            data-mega-link="true"
                            href={item.href}
                            className={cn(
                              "group/item flex w-full items-center justify-between rounded-lg border border-transparent px-2.5 py-2 text-sm transition-all duration-200",
                              "hover:translate-x-0.5 hover:border-border/70 hover:bg-background/68 hover:text-foreground focus-visible:translate-x-0.5 focus-visible:border-border/70 focus-visible:bg-background/68 focus-visible:text-foreground focus-visible:outline-none",
                              pathname === item.href ? "border-primary/35 bg-background/70 text-foreground" : "text-muted-foreground/95",
                            )}
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="size-3.5 translate-x-0 text-muted-foreground transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-foreground" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>

            <MegaMenuConversionPanel
              heading="Need a Custom Enterprise Solution?"
              description="Book a technical strategy session with our engineering team to discuss architecture, AI adoption, cloud migration, automation, and enterprise software planning."
              primaryLabel="Book Strategy Call"
              primaryHref="/book-call"
              secondaryLabel="Explore Services"
              secondaryHref="/services"
              trustItems={[
                { label: "Free Initial Consultation" },
                { label: "Google Meet" },
                { label: "Timezone Friendly" },
                { label: "15 Minute Strategy Session" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ServicesMegaMenuMobileProps = {
  className?: string;
  onNavigate?: () => void;
};

export function ServicesMegaMenuMobile({ className, onNavigate }: ServicesMegaMenuMobileProps) {
  const pathname = usePathname();

  return (
    <details className={className}>
      <summary className="cursor-pointer list-none rounded-xl border border-border/70 px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted/40">
        Services
      </summary>
      <div className="mt-3 space-y-3 rounded-2xl border border-border/70 bg-[linear-gradient(155deg,oklch(0.22_0.015_255/0.94),oklch(0.17_0.01_252/0.95))] p-4">
        {servicesMegaMenuData.map((category) => (
          <details
            key={category.slug}
            className={cn(
              "rounded-xl border bg-background/60 p-3",
              pathname.startsWith("/services") && category.links.some((item) => pathname === item.href)
                ? "border-primary/35"
                : "border-border/65",
            )}
          >
            <summary className="cursor-pointer list-none text-sm font-semibold tracking-wide text-foreground uppercase">
              {category.title}
            </summary>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{category.description}</p>
            <ul className="mt-3 space-y-2">
              {category.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group/item flex items-center justify-between rounded-lg px-2 py-2 text-sm transition-all duration-200 hover:bg-background/70 hover:text-foreground",
                      pathname === item.href ? "bg-background/70 text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}

        <div className="rounded-xl border border-primary/25 bg-[linear-gradient(150deg,oklch(0.25_0.04_255/0.92),oklch(0.19_0.02_252/0.95))] p-4 text-primary-foreground">
          <p className="text-xs tracking-[0.16em] text-primary-foreground/70 uppercase">Featured</p>
          <p className="mt-2 text-sm font-medium">Need Strategic Technology Leadership?</p>
          <p className="mt-2 text-xs leading-5 text-primary-foreground/80">
            Align product roadmap, architecture, and delivery execution through CTO-as-a-Service.
          </p>
          <Link
            href="/services/virtual-cto"
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary-foreground"
          >
            Explore CTO-as-a-Service
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </details>
  );
}
