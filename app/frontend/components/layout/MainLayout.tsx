import { Link } from "@inertiajs/react";
import type { ReactNode } from "react";
import { FlashMessages } from "@/components/common";
import { usePageProps } from "@/hooks";

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  const { app } = usePageProps();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <Link href="/" className="font-semibold">
            {app.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://inertia-rails.dev" target="_blank" rel="noreferrer">
              Inertia Rails
            </a>
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer">
              shadcn/ui
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <FlashMessages />
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {app.name}
        </div>
      </footer>
    </div>
  );
}
