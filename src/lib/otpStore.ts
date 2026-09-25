import { Redis } from "@upstash/redis";

const OTP_TTL_SECONDS = 5 * 60;
const OTP_MAX_ATTEMPTS = 5;

type StoredOtp = {
  code: string;
  attempts: number;
  createdAt: number;
};

function getRedis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();

  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token || !url.startsWith("https://")) {
    throw new Error("Invalid Upstash Redis configuration");
  }

  return new Redis({
    url,
    token,
  });
}

function normalizeIdentifier(identifier: string): string {
  return identifier.trim().toLowerCase();
}

function getOtpKey(identifier: string): string {
  return `auth:otp:${normalizeIdentifier(identifier)}`;
}

export async function saveOtp(identifier: string, code: string): Promise<void> {
  const redis = getRedis();

  const key = getOtpKey(identifier);

  const data: StoredOtp = {
    code,
    attempts: 0,
    createdAt: Date.now(),
  };

  await redis.set(key, data, {
    ex: OTP_TTL_SECONDS,
  });
}

export async function verifyStoredOtp(
  identifier: string,
  code: string,
): Promise<{
  success: boolean;
  reason?: "not_found" | "invalid" | "too_many_attempts";
}> {
  const redis = getRedis();

  const key = getOtpKey(identifier);

  const stored = await redis.get<StoredOtp>(key);

  if (!stored) {
    return {
      success: false,
      reason: "not_found",
    };
  }

  if (stored.attempts >= OTP_MAX_ATTEMPTS) {
    await redis.del(key);

    return {
      success: false,
      reason: "too_many_attempts",
    };
  }

  if (stored.code !== code.trim()) {
    stored.attempts += 1;

    const ttl = await redis.ttl(key);

    if (ttl > 0) {
      await redis.set(key, stored, {
        ex: ttl,
      });
    }

    return {
      success: false,
      reason: "invalid",
    };
  }

  await redis.del(key);

  return {
    success: true,
  };
}

export async function deleteOtp(identifier: string): Promise<void> {
  const redis = getRedis();

  await redis.del(getOtpKey(identifier));
}
