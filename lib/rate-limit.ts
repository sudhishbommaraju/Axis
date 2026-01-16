const rateLimits = new Map<string, number[]>();

export interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
}

export const AUTH_LIMIT: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5 // 5 attempts
};

export const API_LIMIT: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20
};

export function checkRateLimit(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const timestamps = rateLimits.get(identifier) || [];

    // Filter timestamps within the window
    const validTimestamps = timestamps.filter(t => now - t < config.windowMs);

    if (validTimestamps.length >= config.maxRequests) {
        return false;
    }

    // Add current request
    validTimestamps.push(now);
    rateLimits.set(identifier, validTimestamps);

    // Cleanup old keys occasionally (simple optimization)
    if (rateLimits.size > 10000) {
        rateLimits.clear(); // naive cleanup to prevent memory leaks
    }

    return true;
}
