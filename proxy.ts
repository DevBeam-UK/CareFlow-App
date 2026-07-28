import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export const VERIFICATION_ROUTE = '/verify-email'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const {pathname} = request.nextUrl
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isEmailVerified = session?.emailVerified
 
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/forgot-password");

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isEmailVerified && pathname !== VERIFICATION_ROUTE) {
    return NextResponse.redirect(new URL(VERIFICATION_ROUTE, request.url));
  }

  if (isEmailVerified && pathname === VERIFICATION_ROUTE) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};