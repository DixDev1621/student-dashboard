"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="tile mx-auto mt-10 max-w-xl p-8 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-accent-violet/15 text-accent-violet">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold text-white">Something disrupted the orbit</h2>
      <p className="mt-2 text-sm text-zinc-400">
        {error.message || "We couldn't load your dashboard. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-bg-border bg-bg-elevated px-5 py-2.5 text-sm font-medium text-white transition hover:border-accent-violet/50 hover:shadow-glow"
      >
        <RotateCw className="h-4 w-4" />
        Retry
      </button>
    </div>
  );
}
