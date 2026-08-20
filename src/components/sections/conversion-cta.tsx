"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TrustItem = {
  label: string;
};

type MegaMenuConversionPanelProps = {
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  trustItems: TrustItem[];
};

type ConversionStat = {
  value: number | string;
  suffix?: string;
  label: string;
};

type TopConversionCtaProps = {
  badge: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  stats: ConversionStat[];
};

type BottomConversionBannerProps = {
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function CountUpValue({ target, suffix }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(progress * target));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {display}
      {suffix ?? ""}
    </span>
  );
}

function CtaLinkButton({ href, label, variant = "primary" }: { href: string; label: string; variant?: "primary" | "secondary" }) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "lg", variant: isPrimary ? "default" : "outline" }),
        "group/button relative overflow-hidden transition-all duration-250",
        "hover:-translate-y-[3px] hover:shadow-[0_12px_26px_oklch(0.14_0.02_250/0.28)]",
        isPrimary
          ? "border-white bg-white text-slate-900 hover:bg-slate-100"
          : "border-white/45 bg-transparent text-white hover:border-white hover:bg-white/12",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-500 group-hover/button:translate-x-[110%]"
      />
      <span className="relative inline-flex items-center gap-2">
        {label}
        <ArrowRight className="size-4 transition-transform duration-250 group-hover/button:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function MegaMenuConversionPanel({
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  trustItems,
}: MegaMenuConversionPanelProps) {
  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="group/panel relative overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(155deg,#0F172A_0%,#111827_52%,#1E293B_100%)] p-5 text-white shadow-[0_16px_34px_rgba(2,6,23,0.55)] transition-all duration-250 hover:border-cyan-200/55 hover:shadow-[0_20px_42px_rgba(2,6,23,0.66)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(56,189,248,0.16),transparent_44%),radial-gradient(circle_at_90%_84%,rgba(16,185,129,0.12),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(0deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />

      <h3 className="relative font-heading text-[1.8rem] leading-tight font-extrabold tracking-tight text-white text-balance">{heading}</h3>
      <p className="relative mt-4 text-sm leading-6 text-slate-200">{description}</p>

      <div className="relative mt-6 flex flex-col gap-3">
        <CtaLinkButton href={primaryHref} label={primaryLabel} variant="primary" />
        <CtaLinkButton href={secondaryHref} label={secondaryLabel} variant="secondary" />
      </div>

      <ul className="relative mt-5 grid gap-2 text-xs text-slate-200 sm:grid-cols-2">
        {trustItems.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-2 rounded-lg border border-white/14 bg-white/6 px-2.5 py-2">
            <CheckCircle2 className="size-3.5 text-emerald-300" aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

export function TopConversionCta({
  badge,
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  stats,
}: TopConversionCtaProps) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-border/70 bg-[radial-gradient(circle_at_18%_12%,oklch(0.78_0.11_236/0.22),transparent_44%),linear-gradient(140deg,oklch(0.23_0.02_250/0.9),oklch(0.17_0.01_252/0.94))] p-6 text-white shadow-[0_20px_46px_oklch(0.12_0.01_255/0.3)] sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-white/25 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
            {badge}
          </p>
          <h2 className="mt-4 font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLinkButton href={primaryHref} label={primaryLabel} variant="primary" />
            <CtaLinkButton href={secondaryHref} label={secondaryLabel} variant="secondary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.58, delay: index * 0.08 }}
              whileHover={{ y: -3, scale: 1.03 }}
              animate={{ y: [0, -3, 0] }}
              className="rounded-2xl border border-white/16 bg-white/8 p-4 shadow-[0_10px_24px_rgba(15,23,42,0.3)]"
            >
              <p className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {typeof stat.value === "number" ? <CountUpValue target={stat.value} suffix={stat.suffix} /> : stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-200 sm:text-sm">{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export function BottomConversionBanner({
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: BottomConversionBannerProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: `cta-p-${index}`,
        left: 5 + index * 9,
        duration: 5.5 + (index % 3),
        delay: index * 0.24,
      })),
    [],
  );

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(130deg,#070f1f_0%,#0a1324_52%,#0d1b2a_100%)] p-8 text-white shadow-[0_24px_52px_oklch(0.12_0.01_255/0.36)] sm:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(34,211,238,0.14),transparent_36%),radial-gradient(circle_at_86%_82%,rgba(56,189,248,0.14),transparent_42%)]" />

      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute top-full h-2 w-2 rounded-full bg-cyan-100/45"
            style={{ left: `${particle.left}%` }}
            animate={{ y: [0, -280], opacity: [0, 0.65, 0] }}
            transition={{ duration: particle.duration, repeat: Number.POSITIVE_INFINITY, delay: particle.delay, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">{description}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <CtaLinkButton href={primaryHref} label={primaryLabel} variant="primary" />
          <CtaLinkButton href={secondaryHref} label={secondaryLabel} variant="secondary" />
        </div>
      </div>
    </motion.section>
  );
}
