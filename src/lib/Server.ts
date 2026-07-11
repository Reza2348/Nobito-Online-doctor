import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { NextResponse } from "next/server";
import type { cookies as CookiesFn } from "next/headers";

/**
 * Builds a Supabase server client for use inside a Route Handler.
 *
 * - Reads the incoming request cookies via `cookies()` (from next/headers).
 * - Writes any cookies Supabase needs to set (session tokens, refresh
 *   tokens, PKCE state, etc.) onto the outgoing `NextResponse`, so they are
 *   sent back as HttpOnly cookies instead of ever touching client-side
 *   storage (localStorage/sessionStorage).
 *
 * Usage inside a route handler:
 *
 *   const cookieStore = await cookies();
 *   const response = NextResponse.json({ ok: true });
 *   const supabase = createSupabaseRouteClient(cookieStore, response);
 */
export function createSupabaseRouteClient(
  cookieStore: Awaited<ReturnType<typeof CookiesFn>>,
  response: NextResponse,
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}
