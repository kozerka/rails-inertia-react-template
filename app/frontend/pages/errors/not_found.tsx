import { ErrorPage } from "@/components/common";

export default function NotFound() {
  return (
    <ErrorPage
      status={404}
      title="Page not found"
      description="The page you are looking for does not exist or has been moved."
    />
  );
}
