import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl?.pathname || "/";

  // Routes that don't require authentication
  const excludedRoutes = ["/api/payment/webhook"];
  if (excludedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protected routes for authenticated users
  const userProtectedRoutes = ["/cart", "/api/cart", "/api/payment", "/api/shipment", "/profile"];
  // Protected routes only for admin users
  const adminProtectedRoutes = ["/admin", "/api/admin"];

  const isUserProtectedRoute = userProtectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminProtectedRoute = adminProtectedRoutes.some((route) => pathname.startsWith(route));

  if (!isUserProtectedRoute && !isAdminProtectedRoute) {
    return NextResponse.next();
  }

  try {
    // Get token from next-auth
    const token = await getToken({ req });
    if (!token || !token.email) {
      console.warn("Unauthorized access attempt, redirecting to home.");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Fetch user data from database
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user?email=${token.email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();

    if (!userData) {
      console.warn("User data not found, redirecting to home.");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If route is admin protected but user is not an admin, redirect
    if (isAdminProtectedRoute && userData.user.role !== "admin") {
      console.warn("Non-admin user attempted to access admin route.");
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/profile/:path*", // Ensure /profile is protected correctly
    "/admin/:path*",
    "/api/cart/:path*",
    "/api/payment/:path*",
    "/api/shipment/:path*",
    "/api/admin/:path*",
    "/api/payment/webhook",
  ],
};
