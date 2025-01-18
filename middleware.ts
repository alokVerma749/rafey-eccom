import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname || '/';

  // Exclude webhook paths
  const excludedRoutes = ['/api/payment/webhook'];
  if (excludedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Define protected routes
  const userProtectedRoutes = ['/cart', '/api/cart', '/api/payment', '/api/shipment', '/api/admin', '/admin'];
  const adminProtectedRoutes = ['/admin', '/api/admin'];

  const isUserProtectedRoute = userProtectedRoutes.some(route => pathname.startsWith(route));
  const isAdminProtectedRoute = adminProtectedRoutes.some(route => pathname.startsWith(route));

  // Skip protection if not a protected route
  if (!isUserProtectedRoute && !isAdminProtectedRoute) {
    return NextResponse.next();
  }

  // Retrieve token from the request
  const token = await getToken({ req });
  if (!token || !token.email) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Fetch user data
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user?email=${token.email}`)
  const userData = await user.json();

  // Check if the user exists
  if (!userData) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Admin route protection
  if (isAdminProtectedRoute && userData.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/admin/:path*',
    '/api/cart/:path*',
    '/api/payment/:path*',
    '/api/shipment/:path*',
    '/api/webhooks/:path*', // Webhooks are excluded in the logic
  ],
};
