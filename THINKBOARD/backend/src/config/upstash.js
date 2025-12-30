import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limit: 10 requests per 2 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "5 m"),
  analytics: true,
  prefix: "ratelimit",
});

export default ratelimit;
