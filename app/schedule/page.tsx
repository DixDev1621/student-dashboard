import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { PageHeader, SurfaceCard } from "@/components/page-header";

export const metadata = { title: "Schedule — Orbit" };

type Session = {
  id: string;
  day: string;
  date: string;
  title: string;
  time: string;
  location: string;
  kind: "lecture" | "lab" | "seminar" | "exam";
  online?: boolean;
};

const WEEK: Session[] = [
  { id: "1", day: "Mon", date: "Jun 1", title: "Distributed Systems", time: "09:00 – 10:30", location: "Hall A · Eng Block", kind: "lecture" },
  { id: "2", day: "Mon", date: "Jun 1", title: "Machine Learning Lab", time: "14:00 – 16:00", location: "Lab 204", kind: "lab" },
  { id: "3", day: "Tue", date: "Jun 2", title: "Algorithms Seminar", time: "11:00 – 12:00", location: "Zoom", kind: "seminar", online: true },
  { id: "4", day: "Wed", date: "Jun 3", title: "Cryptography", time: "10:00 – 11:30", location: "Hall C", kind: "lecture" },
  { id: "5", day: "Thu", date: "Jun 4", title: "Systems Design Workshop", time: "13:00 – 15:00", location: "Studio 3", kind: "lab" },
  { id: "6", day: "Fri", date: "Jun 5", title: "Linear Algebra Midterm", time: "09:00 – 11:00", location: "Exam Hall 1", kind: "exam" },
];

const KIND_STYLES: Record<Session["kind"], string> = {
  lecture: "bg-accent-violet/15 text-accent-violet ring-accent-violet/30",
  lab: "bg-accent-cyan/15 text-accent-cyan ring-accent-cyan/30",
  seminar: "bg-accent-pink/15 text-accent-pink ring-accent-pink/30",
  exam: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

export default function SchedulePage() {
  const grouped = WEEK.reduce<Record<string, Session[]>>((acc, s) => {
    (acc[s.day] ??= []).push(s);
    return acc;
  }, {});

  return (
    <section>
      <PageHeader
        eyebrow="This week"
        title="Schedule"
        description="Lectures, labs, and exams pulled together — never miss a session."
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl border border-bg-border bg-bg-elevated px-4 py-2 text-sm text-white transition hover:bg-bg-elevated/70">
            <Calendar className="h-4 w-4" /> Sync calendar
          </button>
        }
      />

      <SurfaceCard className="mb-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-violet/15 text-accent-violet">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Next up</p>
            <p className="text-sm font-medium text-white">
              Distributed Systems · 09:00 — Hall A
            </p>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {Object.entries(grouped).map(([day, sessions]) => (
          <div
            key={day}
            className="rounded-2xl border border-bg-border bg-bg-surface/70 p-4 backdrop-blur"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-sm font-semibold text-white">{day}</h2>
              <span className="text-xs text-zinc-500">{sessions[0].date}</span>
            </div>
            <ul className="flex flex-col gap-3">
              {sessions.map((s) => (
                <li
                  key={s.id}
                  className="rounded-xl border border-bg-border bg-bg-elevated/60 p-3"
                >
                  <span
                    className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ${KIND_STYLES[s.kind]}`}
                  >
                    {s.kind}
                  </span>
                  <p className="text-sm font-medium text-white">{s.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" /> {s.time}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                    {s.online ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    {s.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
