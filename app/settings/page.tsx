"use client";

import { useState } from "react";
import { Bell, Globe, Lock, Moon, Palette, User } from "lucide-react";
import { PageHeader, SurfaceCard } from "@/components/page-header";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [dark, setDark] = useState(true);

  return (
    <section>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Personalize how Orbit looks, how it notifies you, and how your data is handled."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <SectionHeader icon={User} title="Profile" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" defaultValue="Aria Kim" />
            <Field label="Email" type="email" defaultValue="aria.kim@uni.edu" />
            <Field label="Program" defaultValue="Computer Science" />
            <Field label="Year" defaultValue="Year 3" />
          </div>
          <div className="mt-5">
            <button className="rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan px-4 py-2 text-sm font-medium text-black transition hover:opacity-90">
              Save changes
            </button>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeader icon={Palette} title="Appearance" />
          <Toggle
            label="Dark mode"
            description="Easier on the eyes during late-night sessions."
            checked={dark}
            onChange={setDark}
          />
          <Toggle
            label="Reduce motion"
            description="Minimize animations across the dashboard."
            checked={false}
            onChange={() => {}}
          />
        </SurfaceCard>

        <SurfaceCard className="lg:col-span-2">
          <SectionHeader icon={Bell} title="Notifications" />
          <Toggle
            label="Email notifications"
            description="Assignment reminders and weekly digests."
            checked={emailNotif}
            onChange={setEmailNotif}
          />
          <Toggle
            label="Push notifications"
            description="Realtime alerts for upcoming lectures."
            checked={pushNotif}
            onChange={setPushNotif}
          />
          <Toggle
            label="Weekly progress report"
            description="A Sunday summary of your study activity."
            checked={weekly}
            onChange={setWeekly}
          />
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeader icon={Globe} title="Language & region" />
          <Field label="Language" defaultValue="English (US)" />
          <Field label="Timezone" defaultValue="GMT+02:00 — Europe/Berlin" />
        </SurfaceCard>

        <SurfaceCard className="lg:col-span-3">
          <SectionHeader icon={Lock} title="Security" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Current password" type="password" defaultValue="" />
            <Field label="New password" type="password" defaultValue="" />
            <Field label="Confirm new password" type="password" defaultValue="" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-xl border border-bg-border bg-bg-elevated px-4 py-2 text-sm text-white transition hover:bg-bg-elevated/70">
              Update password
            </button>
            <button className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/20">
              Delete account
            </button>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof Moon;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-bg-elevated text-accent-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
    </div>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-bg-border bg-bg-elevated/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-accent-violet/50 focus:outline-none focus:ring-1 focus:ring-accent-violet/30"
      />
    </label>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-bg-border py-3 first:border-t-0 first:pt-0">
      <div className="pr-4">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-gradient-to-r from-accent-violet to-accent-cyan" : "bg-bg-elevated"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
