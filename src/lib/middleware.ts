import type { MiddlewareHandler } from "hono";
import { rateLimiter } from "hono-rate-limiter";

import { config } from "./config";
import { toCamelCase } from "./utils";

/* -----------------------------------------------------------------------------------------------
 * Rate Limit Middleware using Upstash Redis Ratelimit
 * -----------------------------------------------------------------------------------------------*/

export function rateLimitMiddleware(): MiddlewareHandler {
  const skipPaths = new Set(["/", "/openapi.json"]);

  return rateLimiter({
    windowMs: 1_000,
    limit: config.rateLimit.limitedReqCount,
    keyGenerator: (c) => {
      const xff = c.req.header("x-forwarded-for");
      const cf = c.req.header("cf-connecting-ip");
      const raw = xff ?? cf ?? "";
      const first = raw.split(",")[0]?.trim();
      return first || "anonymous";
    },
    message: (c) => {
      const rateLimitInfo = c.get("rateLimit");
      const resetMs = rateLimitInfo?.resetTime
        ? Math.max(0, rateLimitInfo.resetTime.getTime() - Date.now())
        : undefined;

      return {
        status: "Failed",
        message: "You have exceeded the rate limit. Please try again later.",
        limit: rateLimitInfo?.limit ?? config.rateLimit.limitedReqCount,
        remaining: rateLimitInfo?.remaining ?? 0,
        reset: resetMs ? `${resetMs}ms` : undefined,
      };
    },
    skip: (c) => {
      if (!config.rateLimit.enable) {
        return true;
      }

      const bypassHash = config.rateLimit.bypassKeyHash;
      if (bypassHash) {
        const provided = c.req.header("x-ratelimit-bypass") ?? "";
        if (provided && provided === bypassHash) {
          return true;
        }
      }

      const path = c.req.path;
      return skipPaths.has(path) || path.startsWith("/docs");
    },
  });
}

/* -----------------------------------------------------------------------------------------------
 * Camel Case Middleware
 * -----------------------------------------------------------------------------------------------*/

export function camelCaseMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const camel = c.req.query("camel");

    await next();

    if (
      (camel || camel === "") &&
      c.res.headers.get("Content-Type")?.startsWith("application/json")
    ) {
      const obj = await c.res.json();

      const camelCaseResponse = toCamelCase(obj as Record<string, unknown>);

      c.res = new Response(JSON.stringify(camelCaseResponse), c.res);
    }
  };
}
