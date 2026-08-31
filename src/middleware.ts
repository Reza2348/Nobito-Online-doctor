import { type NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

const ADMIN_LOGIN_PATH = "/Admin";

const roleRouteMap: Record<string, string> = {
  "/Admin/dashboard": "admin",
  "/Admin/Consultant": "consultant",
  "/Admin/Content": "content",
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  /**
   * ==============================
   * ADMIN PROTECTED ROUTES
   * ==============================
   */

  const adminProtectedRoute = Object.keys(roleRouteMap).find((route) =>
    pathname.startsWith(route),
  );

  if (adminProtectedRoute) {
    const token = request.cookies.get("auth-token")?.value;

    let user: {
      role?: string;
    } | null = null;

    /**
     * بررسی JWT
     */
    if (token) {
      try {
        user = await verifyToken(token);
      } catch {
        /**
         * Token نامعتبر یا منقضی شده
         */
        user = null;
      }
    }

    /**
     * کاربر وارد نشده
     */
    if (!user) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    }

    /**
     * Role مورد نیاز
     */
    const requiredRole = roleRouteMap[adminProtectedRoute];

    /**
     * بررسی Role
     */
    if (user.role !== requiredRole) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  /**
   * ==============================
   * DASHBOARD
   * ==============================
   *
   * اینجا عمداً هیچ redirect نداریم.
   *
   * چون می‌خواهیم DashboardLayout
   * ابتدا پیام عدم ورود را نمایش دهد
   * و بعد از 2 ثانیه کاربر را به
   * /auth/signup منتقل کند.
   */

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  /**
   * سایر مسیرها
   */
  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*", "/dashboard/:path*"],
};
