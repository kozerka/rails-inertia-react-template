import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

type Props = {
  status: number;
  title: string;
  description: string;
};

export function ErrorPage({ status, title, description }: Props) {
  return (
    <>
      <Head title={title} />
      <section className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-6xl font-semibold text-muted-foreground">{status}</p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="max-w-md text-muted-foreground">{description}</p>
        <Button asChild>
          <Link href="/">Go to the home page</Link>
        </Button>
      </section>
    </>
  );
}
