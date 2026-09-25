import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { NextResponse } from "next/server";
import type { cookies as CookiesFn } from "next/headers";
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
