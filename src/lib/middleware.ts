import { MiddlewareHandler } from "hono";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { config } from "./config";
import { toCamelCase } from "./utils";

/* -----------------------------------------------------------------------------------------------
 * Rate Limit Middleware using Upstash Redis Ratelimit
 * -----------------------------------------------------------------------------------------------*/

export function rateLimitMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    // skip middleware if rate limit is disabled
    if (!config.rateLimit.enable || c.req.path === "/") {
      return await next();
    }

    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(config.rateLimit.limitedReqCount, "1s"),
    });

    const ip = c.req.header("x-forwarded-for") ?? "anonymous";

    const { limit, remaining, reset, success } = await ratelimit.limit(ip);

    if (!success) {
      c.status(429);

      return c.json({
        status: "Failed",
        message: "You have exceeded the rate limit. Please try again later.",
        limit,
        remaining,
        reset: `${reset - Date.now()}ms`,
      });
    }

    c.res.headers.set("x-ratelimit-limit", limit.toString());
    c.res.headers.set("x-ratelimit-remaining", remaining.toString());

    await next();
  };
}

/* -----------------------------------------------------------------------------------------------
 * Rate Limit Middleware using LRUCache
 * -----------------------------------------------------------------------------------------------*/

// export function rateLimitMiddleware(): MiddlewareHandler {
//   return async (c, next) => {
//     // skip middleware if rate limit is disabled
//     if (config.rateLimit.enable === false || c.req.path === "/") {
//       return await next();
//     }

//     const limit = 5;

//     const xff = c.req.header("x-forwarded-for");

//     const userIp = xff
//       ? Array.isArray(xff)
//         ? xff[0]
//         : xff.split(",")[0]
//       : "127.0.0.1";

//     const tokenCount = (tokenCache.get(userIp) as number[]) || [0];

//     if (tokenCount[0] === 0) tokenCache.set(userIp, tokenCount);

//     tokenCount[0] += 1;

//     const currentUsage = tokenCount[0];
//     const isRateLimited = currentUsage > limit;

//     c.res.headers.set(
//       "x-ratelimit-remaining",
//       isRateLimited ? "0" : (limit - currentUsage).toString()
//     );

//     c.res.headers.set("x-ratelimit-limit", limit.toString());

//     if (isRateLimited) {
//       c.status(429);

//       return c.json({
//         status: "Failed",
//         message: "You have exceeded the rate limit. Please try again later.",
//       });
//     }

//     await next();
//   };
// }

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
