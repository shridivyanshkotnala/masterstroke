"use client";

import { type CSSProperties, type MouseEventHandler, useMemo, useState } from "react";
import { Bot, Cloud, Database, LineChart, Smartphone, Workflow } from "lucide-react";

import { cn } from "@/lib/utils";

const cards = [
  {
    label: "AI Agent",
    value: "Intent Router Active",
    icon: Bot,
    delay: "0ms",
  },
  {
    label: "Cloud Architecture",
    value: "Multi-region Ready",
    icon: Cloud,
    delay: "140ms",
  },
  {
    label: "Analytics",
    value: "KPI Stream Online",
    icon: LineChart,
    delay: "280ms",
  },
  {
    label: "Mobile App",
    value: "Release Candidate 2.4",
    icon: Smartphone,
    delay: "420ms",
  },
  {
    label: "API Flow",
    value: "42 Services Connected",
    icon: Workflow,
    delay: "560ms",
  },
  {
    label: "Infrastructure",
    value: "Availability 99.95%",
    icon: Database,
    delay: "700ms",
  },
] as const;

export function HeroDashboardPanel() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const transformStyle = useMemo<CSSProperties>(
    () => ({
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    }),
    [offset.x, offset.y],
  );

  const onMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setOffset({
      x: x * 4,
      y: y * 4,
    });
  };

  return (
    <div className="relative rounded-3xl border border-border/80 bg-card p-5 shadow-elevated sm:p-6" onMouseMove={onMove} onMouseLeave={() => setOffset({ x: 0, y: 0 })}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(circle_at_72%_22%,color-mix(in_oklch,var(--brand)_20%,transparent),transparent_50%)]"
      />

      <div style={transformStyle}>
        <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3">
          <div>
            <p className="text-sm font-semibold">Engineering Command Center</p>
            <p className="text-xs text-muted-foreground">Live architecture and delivery view</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Stable</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.label}
                style={{ "--float-delay": card.delay } as CSSProperties}
                className={cn(
                  "dashboard-float rounded-xl border border-border/80 bg-surface/55 p-3",
                  "transition duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-soft",
                )}
              >
                <p className="mb-1.5 text-xs text-muted-foreground">{card.label}</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="size-4 text-brand" aria-hidden="true" />
                  {card.value}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
