export default function Loading() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-6">
      <div className="tile col-span-1 h-64 md:col-span-4" />
      <div className="tile col-span-1 h-64 md:col-span-2" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="tile col-span-1 h-44 md:col-span-2" />
      ))}
      <div className="tile col-span-1 h-72 md:col-span-6" />
    </div>
  );
}
