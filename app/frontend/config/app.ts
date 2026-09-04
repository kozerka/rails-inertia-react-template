/** Application name, read from the layout so Rails stays the single source of truth. */
export const APP_NAME =
  document.querySelector('meta[name="application-name"]')?.getAttribute("content") ?? "App";
