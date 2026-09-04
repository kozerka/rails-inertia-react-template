import { ErrorPage } from "@/components/common";

export default function UnprocessableContent() {
  return (
    <ErrorPage
      status={422}
      title="Request could not be processed"
      description="The change you requested was rejected. Please go back and try again."
    />
  );
}
