import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, Plus } from "lucide-react";
import { getCourses } from "@/lib/courses";
import { PageHeader, SurfaceCard } from "@/components/page-header";

export const revalidate = 60;

export const metadata = { title: "Courses — Orbit" };

export default async function CoursesPage() {
  const courses = await getCourses();
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = courses.filter((c) => c.progress >= 100);

  return (
    <section>
      <PageHeader
        eyebrow="Learning"
        title="Your Courses"
        description="Track every course you're enrolled in, pick up where you left off, and queue what's next."
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl border border-bg-border bg-bg-elevated px-4 py-2 text-sm text-white transition hover:bg-bg-elevated/70">
            <Plus className="h-4 w-4" /> Add course
          </button>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Enrolled" value={courses.length} />
        <Stat label="In progress" value={inProgress.length} />
        <Stat label="Completed" value={completed.length} />
        <Stat
          label="Avg. progress"
          value={`${
            courses.length
              ? Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length)
              : 0
          }%`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <article
            key={c.id}
            className="group relative overflow-hidden rounded-2xl border border-bg-border bg-bg-surface/70 p-5 backdrop-blur transition hover:border-accent-violet/40"
          >
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-violet/10 blur-2xl transition group-hover:bg-accent-violet/20" />
            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-bg-elevated text-accent-cyan">
                  <BookOpen className="h-5 w-5" />
                </div>
                <Link
                  href="#"
                  className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-bg-elevated hover:text-white"
                  aria-label={`Open ${c.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <h2 className="text-base font-semibold text-white">{c.title}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="h-3 w-3" /> Updated{" "}
                {new Date(c.created_at).toLocaleDateString()}
              </p>
              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Progress</span>
                  <span className="font-medium text-white">{c.progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}

        {courses.length === 0 && (
          <SurfaceCard className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-zinc-400">
              No courses yet. Configure Supabase and seed the{" "}
              <code className="text-accent-cyan">courses</code> table to see them
              here.
            </p>
          </SurfaceCard>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-surface/70 p-4 backdrop-blur">
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
