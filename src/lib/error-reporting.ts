/**
 * Reports runtime errors to the browser console.
 * Replace this module with a real error-tracking service (e.g. Sentry)
 * when you are ready for production telemetry.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  console.error("[Spouzy error]", message, context);
}
