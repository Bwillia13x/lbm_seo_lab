export default function RootLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8" aria-busy="true" aria-live="polite">
      <div className="space-y-3">
        <div className="h-8 w-64 bg-muted rounded shimmer" />
        <div className="h-4 w-3/4 bg-muted rounded shimmer" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg elevated-card">
            <div className="h-5 w-40 bg-muted rounded shimmer mb-3" />
            <div className="h-4 w-full bg-muted rounded shimmer mb-2" />
            <div className="h-4 w-5/6 bg-muted rounded shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
