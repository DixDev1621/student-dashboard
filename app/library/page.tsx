import { Bookmark, Download, FileText, Film, Headphones, Search } from "lucide-react";
import { PageHeader, SurfaceCard } from "@/components/page-header";

export const metadata = { title: "Library — Orbit" };

type Resource = {
  id: string;
  title: string;
  course: string;
  type: "pdf" | "video" | "audio";
  size: string;
  saved?: boolean;
};

const RESOURCES: Resource[] = [
  { id: "1", title: "Introduction to Distributed Consensus", course: "Distributed Systems", type: "pdf", size: "2.4 MB", saved: true },
  { id: "2", title: "Gradient Descent Visualized", course: "Machine Learning", type: "video", size: "184 MB" },
  { id: "3", title: "RSA & Public-Key Cryptography", course: "Cryptography", type: "pdf", size: "3.1 MB" },
  { id: "4", title: "Algorithms Office Hours · Recording", course: "Algorithms", type: "audio", size: "42 MB", saved: true },
  { id: "5", title: "Linear Algebra Cheat Sheet", course: "Linear Algebra", type: "pdf", size: "0.8 MB" },
  { id: "6", title: "System Design Interviews", course: "Systems", type: "video", size: "256 MB" },
];

const TYPE_META: Record<Resource["type"], { Icon: typeof FileText; tint: string }> = {
  pdf: { Icon: FileText, tint: "text-accent-pink" },
  video: { Icon: Film, tint: "text-accent-cyan" },
  audio: { Icon: Headphones, tint: "text-accent-violet" },
};

export default function LibraryPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Resources"
        title="Library"
        description="Notes, recordings, and reading material — neatly organized across all your courses."
      />

      <SurfaceCard className="mb-6">
        <div className="flex items-center gap-3 rounded-xl border border-bg-border bg-bg-elevated/60 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Search notes, slides, recordings…"
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => {
          const { Icon, tint } = TYPE_META[r.type];
          return (
            <article
              key={r.id}
              className="group flex flex-col rounded-2xl border border-bg-border bg-bg-surface/70 p-5 backdrop-blur transition hover:border-accent-cyan/40"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-bg-elevated ${tint}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <button
                  aria-label="Bookmark"
                  className={`grid h-8 w-8 place-items-center rounded-lg transition hover:bg-bg-elevated ${
                    r.saved ? "text-accent-violet" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${r.saved ? "fill-current" : ""}`} />
                </button>
              </div>
              <h2 className="text-sm font-semibold text-white">{r.title}</h2>
              <p className="mt-1 text-xs text-zinc-500">{r.course}</p>
              <div className="mt-4 flex items-center justify-between border-t border-bg-border pt-3">
                <span className="text-xs uppercase tracking-wider text-zinc-500">
                  {r.type} · {r.size}
                </span>
                <button className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-zinc-300 transition hover:bg-bg-elevated hover:text-white">
                  <Download className="h-3.5 w-3.5" /> Open
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
