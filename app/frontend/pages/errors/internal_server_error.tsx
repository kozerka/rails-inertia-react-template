import { ErrorPage } from "@/components/common";

export default function InternalServerError() {
  return (
    <ErrorPage
      status={500}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again in a moment."
    />
  );
}
