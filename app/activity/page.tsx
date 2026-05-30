import { Award, BookOpen, CheckCircle2, Flame, MessageSquare } from "lucide-react";
import { buildActivity } from "@/lib/activity";
import { PageHeader, SurfaceCard } from "@/components/page-header";

export const metadata = { title: "Activity — Orbit" };

const FEED = [
  { id: "1", icon: CheckCircle2, color: "text-emerald-400", title: "Completed quiz", detail: "Distributed Systems · Chapter 4", time: "2h ago" },
  { id: "2", icon: BookOpen, color: "text-accent-cyan", title: "Studied for 45 minutes", detail: "Machine Learning · Gradient descent", time: "5h ago" },
  { id: "3", icon: Award, color: "text-accent-violet", title: "Earned badge", detail: "7-day streak unlocked", time: "Yesterday" },
  { id: "4", icon: MessageSquare, color: "text-accent-pink", title: "Posted in discussion", detail: "Cryptography · RSA in practice", time: "2d ago" },
  { id: "5", icon: CheckCircle2, color: "text-emerald-400", title: "Submitted assignment", detail: "Algorithms · Problem set 6", time: "3d ago" },
];

export default function ActivityPage() {
  const days = buildActivity(16);
  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const total = days.reduce((a, d) => a + d.count, 0);
  const active = days.filter((d) => d.count > 0).length;

  return (
    <section>
      <PageHeader
        eyebrow="Insights"
        title="Activity"
        description="Your learning rhythm over the last 16 weeks."
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Flame} label="Streak" value="12 days" />
        <StatCard icon={BookOpen} label="Study sessions" value={String(active)} />
        <StatCard icon={CheckCircle2} label="Tasks done" value={String(total)} />
        <StatCard icon={Award} label="Badges" value="6" />
      </div>

      <SurfaceCard className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Contribution heatmap</h2>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span>Less</span>
            {[0, 2, 4, 6, 8].map((n) => (
              <span
                key={n}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: heatColor(n) }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.count}`}
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: heatColor(d.count) }}
                />
              ))}
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="mb-4 text-sm font-semibold text-white">Recent activity</h2>
        <ul className="flex flex-col gap-3">
          {FEED.map((f) => {
            const Icon = f.icon;
            return (
              <li
                key={f.id}
                className="flex items-start gap-3 rounded-xl border border-bg-border bg-bg-elevated/60 p-3"
              >
                <div className={`mt-0.5 ${f.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{f.title}</p>
                  <p className="text-xs text-zinc-500">{f.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-zinc-500">{f.time}</span>
              </li>
            );
          })}
        </ul>
      </SurfaceCard>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-surface/70 p-4 backdrop-blur">
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-bg-elevated text-accent-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function heatColor(n: number): string {
  if (n <= 0) return "rgba(255,255,255,0.04)";
  if (n <= 2) return "rgba(139, 92, 246, 0.25)";
  if (n <= 4) return "rgba(139, 92, 246, 0.45)";
  if (n <= 6) return "rgba(139, 92, 246, 0.7)";
  return "rgba(34, 211, 238, 0.85)";
}
