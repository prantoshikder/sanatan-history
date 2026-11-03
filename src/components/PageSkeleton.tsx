export default function PageSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="h-56 bg-border/60" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
        <div className="h-8 w-1/2 rounded bg-border" />
        <div className="h-4 rounded bg-border" />
        <div className="h-4 rounded bg-border" />
        <div className="h-4 w-5/6 rounded bg-border" />
      </div>
    </div>
  );
}
