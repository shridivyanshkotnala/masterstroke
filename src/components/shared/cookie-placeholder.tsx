export function CookiePlaceholder() {
  return (
    <div
      aria-hidden="true"
      data-cookie-placeholder
      className="pointer-events-none fixed bottom-0 right-0 z-[var(--z-overlay)] m-4 hidden"
    />
  );
}
