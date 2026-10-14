import { NextRequest, NextResponse } from "next/server";
import {
  createRateLimiter,
  checkRateLimit,
  getClientIp,
} from "@/lib/rateLimit";

const limiter = createRateLimiter("auth:verify-otp", 5, "15 m");

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const rateLimit = await checkRateLimit(limiter, ip);

  if (!rateLimit.allowed) {
    return rateLimit.response;
  }

  // ادامهٔ منطق فعلی تأیید OTP را اینجا نگه دار.
  // کد فعلی verify-otp را حذف یا جایگزین نکن.
  return NextResponse.json(
    { success: false, message: "منطق فعلی تأیید OTP را اینجا حفظ کن." },
    { status: 501 },
  );
}
