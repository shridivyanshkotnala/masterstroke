export default function Loading() {
  return (
    <main
      id="main-content"
      className="layout-container flex flex-1 items-center justify-center py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Loading content...</p>
    </main>
  );
}
