import { createInertiaApp } from "@inertiajs/react";
import { MainLayout } from "@/components/layout";
import { APP_NAME } from "@/config";

void createInertiaApp({
  pages: "../pages",

  strictMode: true,

  title: (title) => (title ? `${title} · ${APP_NAME}` : APP_NAME),

  // Default layout for every page. Override per page with `Page.layout = ...`
  // see https://inertia-rails.dev/guide/pages#default-layouts
  layout: () => MainLayout,

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    visitOptions: () => {
      return { queryStringArrayFormat: "brackets" };
    },
  },
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  if (document.getElementById("app")) {
    throw error;
  }

  console.error(
    "Missing root element.\n\n" +
      "If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n" +
      'Consider moving <%= vite_typescript_tag "inertia.tsx" %> to the Inertia-specific layout instead.',
  );
});
