import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  const adminProtectedRoutes = [
    "/Admin/dashboard",
    "/Admin/Consultant",
    "/Admin/Content",
  ];

  const isAdminProtected = adminProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isAdminProtected) {
    const token = request.cookies.get("auth-token")?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
      return NextResponse.redirect(new URL("/Admin", request.url));
    }

    const role = user.role;
    if (pathname.startsWith("/Admin/dashboard") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/Admin/Consultant") && role !== "consultant") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/Admin/Content") && role !== "content") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*", "/dashboard/:path*"],
};
