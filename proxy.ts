import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Next.js 16+ requires a default export or a named 'proxy' export
export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // 1. Initialize the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Update request cookies for the current session
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          
          // Prepare the final response
          supabaseResponse = NextResponse.next({ request });
          
          // Apply cookies to the response
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    }
  );

  // 2. Refresh the session (Essential for auth persistence)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 3. Protect /chat/* routes
  // If no user is logged in, redirect them to the home page
  if (pathname.startsWith("/chat") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 4. Configure the paths to be intercepted by the proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (public assets)
     * - Any file extension like .svg, .png, .jpg, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};