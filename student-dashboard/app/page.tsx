import { getCourses } from "@/lib/courses";
import { buildActivity } from "@/lib/activity";
import { DashboardGrid } from "@/components/dashboard-grid";

export const revalidate = 60;

export default async function DashboardPage() {
  const courses = await getCourses();
  const activity = buildActivity(16);

  const avgProgress = courses.length
    ? Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length)
    : 0;

  return (
    <DashboardGrid
      courses={courses}
      activity={activity}
      stats={{
        streak: 12,
        avgProgress,
        coursesCount: courses.length,
        hoursThisWeek: 14,
      }}
    />
  );
}
