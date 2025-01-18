import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname || '/';

  const excludedRoutes = ['/api/payment/webhook'];
  if (excludedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const userProtectedRoutes = ['/cart', '/api/cart', '/api/payment', '/api/shipment', '/admin'];
  const adminProtectedRoutes = ['/admin', '/api/admin'];

  const isUserProtectedRoute = userProtectedRoutes.some(route => pathname.startsWith(route));
  const isAdminProtectedRoute = adminProtectedRoutes.some(route => pathname.startsWith(route));

  if (!isUserProtectedRoute && !isAdminProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req });
    if (!token || !token.email) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user?email=${token.email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();

    if (!userData) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (isAdminProtectedRoute && userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    '/cart/:path*',
    '/admin/:path*',
    '/api/cart/:path*',
    '/api/payment/:path*',
    '/api/shipment/:path*',
    '/api/payment/webhook',
  ],
};
