"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Replace this path anytime with a new approved headquarters image.
const HERO_BUILDING_IMAGE_PATH = "/images/company/kotnala-hq-hero.png";

export function HomeHeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const imageY = useTransform(scrollYProgress, [0, 0.7], [0, prefersReducedMotion ? 0 : -20]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, prefersReducedMotion ? 1 : 1.03]);

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden border-b border-border/70 bg-[linear-gradient(180deg,#050912_0%,#070d17_58%,#060a12_100%)]"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[54%] lg:w-[52%]"
        style={{ y: imageY, scale: imageScale }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={HERO_BUILDING_IMAGE_PATH}
            alt="Kotnala Consultancy corporate headquarters building"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 54vw, 52vw"
            className="object-cover object-center saturate-[0.96] contrast-[1.12] brightness-[1.03]"
          />

          <div className="absolute inset-0 bg-black/22 md:bg-black/20" />

          <div className="absolute inset-0 bg-[radial-gradient(115%_82%_at_92%_48%,transparent_50%,rgba(0,0,0,0.16)_86%,rgba(0,0,0,0.28)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_left,transparent_0%,rgba(0,0,0,0.16)_30%,rgba(0,0,0,0.34)_54%,rgba(0,0,0,0.52)_70%,rgba(0,0,0,0.68)_83%,rgba(0,0,0,0.85)_94%,rgba(0,0,0,0.92)_100%)] md:bg-[linear-gradient(to_left,transparent_0%,rgba(0,0,0,0.14)_33%,rgba(0,0,0,0.3)_56%,rgba(0,0,0,0.46)_72%,rgba(0,0,0,0.62)_84%,rgba(0,0,0,0.8)_94%,rgba(0,0,0,0.9)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_42%,rgba(5,9,18,0.32)_68%,rgba(5,9,18,0.58)_82%,rgba(5,9,18,0.84)_93%,#060a12_100%)]" />
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050912_0%,rgba(5,9,18,0.97)_38%,rgba(5,9,18,0.9)_50%,rgba(5,9,18,0.72)_62%,rgba(5,9,18,0.5)_73%,rgba(5,9,18,0.28)_82%,transparent_90%)] md:bg-[linear-gradient(90deg,#050912_0%,rgba(5,9,18,0.96)_34%,rgba(5,9,18,0.82)_50%,rgba(5,9,18,0.58)_66%,rgba(5,9,18,0.34)_78%,transparent_90%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_52%,rgba(6,10,18,0.32)_70%,rgba(6,10,18,0.58)_82%,#060a12_100%)]"
      />

      <div className="layout-container relative z-10 flex min-h-[74vh] items-center py-16 sm:min-h-[78vh] sm:py-20 lg:min-h-[82vh] lg:py-24">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="max-w-[650px] space-y-7"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/75 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden="true" />
              Enterprise Software • AI • Digital Transformation
            </p>

            <div className="space-y-5">
              <h1
                id="home-hero-heading"
                className="font-heading text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.7rem]"
              >
                Where Software Engineering Meets Business Strategy.
              </h1>
              <p className="max-w-3xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                Delivering enterprise software, AI solutions, and technology consulting that solve operational
                challenges-not just technical ones.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/book-call" className={buttonVariants({ size: "lg" })}>
                Book Strategy Call
              </Link>
              <Link href="/services" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-black/15") }>
                Explore Services
              </Link>
            </div>
          </motion.div>

          <div aria-hidden="true" className="hidden h-full min-h-[340px] lg:block" />
        </div>
      </div>
    </section>
  );
}
