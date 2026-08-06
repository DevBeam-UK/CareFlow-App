import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export const VERIFICATION_ROUTE = '/verify-email'
export const SUBSCRIPTION_ROUTE = '/subscription'
export const AGENCY_CREATION_ROUTE = '/create-agency'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const session = await auth();
  
  const isLoggedIn = !!session?.user;
  
  // STRICT EQUALITY (=== true) stops the infinite redirect loop on initial load
  const isEmailVerified = session?.user?.emailVerified === true;
  const hasActiveSubscription = session?.user?.hasActiveSubscription === true;
  const hasAgency = session?.user?.hasAgency === true;
  const userType = session?.user?.userType; // 'ADMIN_OWNER' | 'ADMIN_MEMBER' | 'STAFF' | 'NO_AGENCY'

  // Ignore NextAuth internal routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  // 1. Handle Auth Pages
  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Handle Unauthenticated Users
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. UNIVERSAL RULE: Email Verification is required for everyone
  if (!isEmailVerified && pathname !== VERIFICATION_ROUTE) {
    return NextResponse.redirect(new URL(VERIFICATION_ROUTE, request.url));
  }
  if (isEmailVerified && pathname === VERIFICATION_ROUTE) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. Handle Staff & Admin Members (Roles other than Admin Owner)
  // They belong to an agency, so they bypass subscription/agency creation checks entirely
  const isAgencyStaffOrMember = userType === 'STAFF' || userType === 'ADMIN_MEMBER';
  
  if (isAgencyStaffOrMember) {
    // If they somehow ended up on the sub or agency creation pages, kick them to dashboard
    if (pathname === SUBSCRIPTION_ROUTE || pathname === AGENCY_CREATION_ROUTE) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next(); // Let them access the dashboard
  }

  // 5. Handle Admin Owners & Users with No Agency (NO_AGENCY)
  // These users MUST go through the subscription -> create agency flow
  if (userType === 'ADMIN_OWNER' || userType === 'NO_AGENCY') {
    
    // Rule A: If they don't have a subscription, force them to the subscription page
    if (!hasActiveSubscription && pathname !== SUBSCRIPTION_ROUTE) {
      return NextResponse.redirect(new URL(SUBSCRIPTION_ROUTE, request.url));
    }

    // Rule B: If they just bought a subscription, don't let them stay on the subscription page
    if (hasActiveSubscription && pathname === SUBSCRIPTION_ROUTE) {
      return NextResponse.redirect(new URL(AGENCY_CREATION_ROUTE, request.url));
    }

    // Rule C: If they have a subscription but haven't created the agency yet, force creation
    if (hasActiveSubscription && !hasAgency && pathname !== AGENCY_CREATION_ROUTE) {
      return NextResponse.redirect(new URL(AGENCY_CREATION_ROUTE, request.url));
    }

    // Rule D: If they have a subscription AND an agency, don't let them access sub/creation pages
    if (hasActiveSubscription && hasAgency) {
      if (pathname === SUBSCRIPTION_ROUTE || pathname === AGENCY_CREATION_ROUTE) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Fallback: Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};