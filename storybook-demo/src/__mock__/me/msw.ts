import { http, HttpResponse } from "msw";
import { Mock } from "vitest";

export function handleMe(args?: {
  mock?: Mock;
  status?: number;
  delay?: number;
}) {
  return http.get("/api/me", async () => {
    args?.mock?.();
    if (args?.status) {
      return HttpResponse.json({}, { status: args.status });
    }
    if (args?.delay) {
      // 遅延
      await new Promise((resolve) => setTimeout(resolve, args.delay));
    }
    return HttpResponse.json({ name: "user" });
  });
}

export const handlers = [handleMe()];