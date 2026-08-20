"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="layout-container flex min-h-screen flex-col justify-center gap-4 py-16">
        <h1 className="font-heading text-3xl font-semibold">Application error</h1>
        <p className="max-w-prose text-muted-foreground">
          A critical rendering error occurred. Please retry the request.
        </p>
        <p className="text-xs text-muted-foreground">{error.digest}</p>
        <button
          type="button"
          onClick={reset}
          className="w-fit rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Retry
        </button>
      </body>
    </html>
  );
}
