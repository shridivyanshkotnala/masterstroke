"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <main id="main-content" className="layout-container flex flex-1 flex-col justify-center gap-4 py-20">
      <h1 className="font-heading text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-prose text-muted-foreground">
        We could not render this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="w-fit rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Retry
      </button>
    </main>
  );
}
