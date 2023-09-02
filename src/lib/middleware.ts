import { MiddlewareHandler } from "hono";
import { LRUCache } from "lru-cache";

import { config } from "../lib/config";

const tokenCache = new LRUCache({
  max: 500,
  ttl: 1000,
});

export function rateLimitMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    // skip middleware if rate limit is disabled
    if (config.enableRateLimit === false || c.req.path === "/") {
      return await next();
    }

    const limit = 5;

    const xff = c.req.headers.get("x-forwarded-for");

    const userIp = xff
      ? Array.isArray(xff)
        ? xff[0]
        : xff.split(",")[0]
      : "127.0.0.1";

    const tokenCount = (tokenCache.get(userIp) as number[]) || [0];

    if (tokenCount[0] === 0) tokenCache.set(userIp, tokenCount);

    tokenCount[0] += 1;

    const currentUsage = tokenCount[0];
    const isRateLimited = currentUsage > limit;

    c.res.headers.set(
      "x-ratelimit-remaining",
      isRateLimited ? "0" : (limit - currentUsage).toString()
    );

    c.res.headers.set("x-ratelimit-limit", limit.toString());

    if (isRateLimited) {
      c.status(429);

      return c.json({
        status: "Failed",
        message: "You have exceeded the rate limit. Please try again later.",
      });
    }

    await next();
  };
}
