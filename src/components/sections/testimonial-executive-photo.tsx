"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type TestimonialExecutivePhotoProps = {
  image?: string;
  name: string;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialExecutivePhoto({ image, name }: TestimonialExecutivePhotoProps) {
  const [hasError, setHasError] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);
  const showImage = Boolean(image) && !hasError;

  return (
    <div className="testimonial-photo-frame relative size-[4.7rem] shrink-0 overflow-hidden rounded-[1.1rem] border border-border/75">
      <div className="testimonial-photo-placeholder absolute inset-0 grid place-items-center">
        <span className="text-sm font-semibold tracking-[0.08em] text-foreground/88">{initials}</span>
      </div>
      {showImage ? (
        <Image
          src={image as string}
          alt={`${name} portrait`}
          fill
          sizes="(max-width: 768px) 76px, 88px"
          className="testimonial-photo object-cover"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : null}
    </div>
  );
}
