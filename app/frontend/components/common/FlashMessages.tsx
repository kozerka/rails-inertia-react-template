import { usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const styles = {
  notice: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  alert: "border-destructive/30 bg-destructive/10 text-destructive",
} as const;

/** Renders Rails flash messages (`notice` and `alert`) passed through Inertia. */
export function FlashMessages() {
  const { flash } = usePage();
  const entries = (Object.keys(styles) as Array<keyof typeof styles>)
    .filter((key) => flash[key])
    .map((key) => ({ key, message: flash[key] as string }));

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-2" role="status" aria-live="polite">
      {entries.map(({ key, message }) => (
        <p key={key} className={cn("rounded-lg border px-4 py-3 text-sm", styles[key])}>
          {message}
        </p>
      ))}
    </div>
  );
}
