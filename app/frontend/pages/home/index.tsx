import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
};

export default function Home({ name }: Props) {
  return (
    <>
      <Head title="Home" />
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Hello, {name}!</CardTitle>
          <CardDescription>Rails 8, Inertia.js, React, TypeScript and Tailwind CSS.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="https://inertia-rails.dev" target="_blank" rel="noreferrer">
              Read the Inertia Rails guide
            </a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
