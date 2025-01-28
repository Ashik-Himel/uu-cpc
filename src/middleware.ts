import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const loginRoutes = ["/login", "/join"];
  const superAdminRoutes = ["/admin/dashboard/members"];

  try {
    const user = jwt.decode(token);
    if (!user) {
      if (pathname.startsWith("/member/") || pathname.startsWith("/admin/")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      if (loginRoutes.includes(pathname)) {
        if (user?.role === "member") {
          return NextResponse.redirect(
            new URL("/member/dashboard", request.url)
          );
        } else if (user?.role === "admin" || user?.role === "super-admin") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
      }

      if (user?.role === "member" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/member/dashboard", request.url));
      }
      if (user?.role !== "super-admin" && superAdminRoutes.includes(pathname)) {
        if (user.role === "admin") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        } else if (user.role === "member") {
          return NextResponse.redirect(
            new URL("/member/dashboard", request.url)
          );
        }
      }
      if (
        (user?.role === "admin" || user?.role === "super-admin") &&
        pathname.startsWith("/member/")
      ) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return console.error(error);
    }
    console.error(error);
  }
}

export const config = {
  matcher: ["/login", "/join", "/member/:path*", "/admin/:path*"],
};
