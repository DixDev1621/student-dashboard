import "server-only";
import { createSupabaseServerClient } from "./supabase/server";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Course[];
}
