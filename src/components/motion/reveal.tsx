"use client";

import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  once?: boolean;
  stagger?: boolean;
};

export function Reveal({
  as: Component = "div",
  className,
  children,
  delay = 0,
  once = true,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.dataset.mounted = "true";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      node.dataset.visible = "true";
      return;
    }

    if (!("IntersectionObserver" in window)) {
      node.dataset.visible = "true";
      return;
    }

    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "true";
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          node.dataset.visible = "false";
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    frameId = window.requestAnimationFrame(() => {
      node.dataset.visible = "false";
      observer.observe(node);
    });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      observer.disconnect();
    };
  }, [once]);

  return (
    <Component
      ref={ref}
      data-mounted="false"
      data-visible="true"
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("reveal", stagger && "reveal-stagger", className)}
    >
      {children}
    </Component>
  );
}
