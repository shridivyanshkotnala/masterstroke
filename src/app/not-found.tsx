import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="layout-container flex flex-1 flex-col justify-center gap-4 py-20">
      <h1 className="font-heading text-3xl font-semibold">Page not found</h1>
      <p className="max-w-prose text-muted-foreground">
        The page you requested does not exist or has moved.
      </p>
      <Link href="/" className="w-fit rounded-md bg-primary px-4 py-2 text-primary-foreground">
        Go to homepage
      </Link>
    </main>
  );
}
