import { mongoRequest } from "@/services/mongoFallback.service";
import type { AuthStatus, FailoverAction, FailoverStatus } from "@/Types/types";

const API_URL = "/api/admin/database-mode";

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error("پاسخ سرور معتبر نیست.");
  }
}

function getMessage(value: unknown, fallback: string): string {
  if (
    value !== null &&
    typeof value === "object" &&
    "message" in value &&
    typeof value.message === "string"
  ) {
    return value.message;
  }

  return fallback;
}

function isFailoverStatus(value: unknown): value is FailoverStatus {
  if (!value || typeof value !== "object") return false;

  const status = value as Record<string, unknown>;

  return (
    (status.databaseMode === "mongo" || status.databaseMode === "supabase") &&
    typeof status.supabaseEnabled === "boolean" &&
    typeof status.supabaseReachable === "boolean" &&
    typeof status.mongoReachable === "boolean" &&
    typeof status.automaticFailover === "boolean"
  );
}

export async function getFailoverStatus(): Promise<FailoverStatus> {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
  });

  const result = await readJson(response);

  if (!response.ok) {
    throw new Error(getMessage(result, "دریافت وضعیت دیتابیس ناموفق بود."));
  }

  if (!isFailoverStatus(result)) {
    throw new Error("ساختار وضعیت دیتابیس معتبر نیست.");
  }

  return result;
}

export async function saveFailoverAction(
  action: FailoverAction,
): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  });

  const result = await readJson(response);

  if (!response.ok) {
    throw new Error(getMessage(result, "تغییر تنظیمات ناموفق بود."));
  }

  return getMessage(result, "تنظیمات با موفقیت تغییر کرد.");
}

export async function getAuthStatus(): Promise<AuthStatus> {
  return mongoRequest<AuthStatus>("POST", "/api/auth/status", {});
}
