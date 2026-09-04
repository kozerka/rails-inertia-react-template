import type { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

/** Typed access to the current page props, including props shared from Rails. */
export function usePageProps<T extends PageProps = PageProps>() {
  return usePage<T>().props;
}
