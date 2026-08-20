import Image from "next/image";

import { cn } from "@/lib/utils";

type Logo = {
  name: string;
  src?: string;
  solution?: string;
};

type TrustedLogoWallProps = {
  logos: Logo[];
};

export function TrustedLogoWall({ logos }: TrustedLogoWallProps) {
  const marqueeRowOne = [...logos, ...logos];
  const marqueeRowTwo = [...logos.slice(3), ...logos.slice(0, 3), ...logos.slice(3), ...logos.slice(0, 3)];

  return (
    <div className="group/trusted relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--background)_93%,var(--brand)_7%),var(--background))] p-4 shadow-soft sm:p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/95 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/95 to-transparent"
      />

      <div className="space-y-3">
        <div className="logo-marquee-track logo-marquee-track-forward group-hover/trusted:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeRowOne.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group/logo flex h-16 min-w-[12.25rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(2,6,23,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(2,6,23,0.12)]"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={144}
                  height={40}
                  loading="lazy"
                  className={cn("h-8 w-auto max-w-[9.5rem] object-contain")}
                />
              ) : (
                <span className="text-sm font-semibold text-slate-700 transition-colors duration-200 group-hover/logo:text-slate-900">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="logo-marquee-track logo-marquee-track-reverse group-hover/trusted:[animation-play-state:paused] motion-reduce:animate-none">
          {marqueeRowTwo.map((logo, index) => (
            <div
              key={`${logo.name}-reverse-${index}`}
              className="group/logo flex h-16 min-w-[12.25rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(2,6,23,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(2,6,23,0.12)]"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={144}
                  height={40}
                  loading="lazy"
                  className="h-8 w-auto max-w-[9.5rem] object-contain"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-700 transition-colors duration-200 group-hover/logo:text-slate-900">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
