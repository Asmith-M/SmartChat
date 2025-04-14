// server/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 10, // limit each IP
  message: "Too many attempts, try again later.",
});

