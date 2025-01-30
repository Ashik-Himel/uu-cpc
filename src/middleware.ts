import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { serverDomain } from "./lib/variables";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  console.log(token);

  const loginRoutes = ["/login", "/join"];
  const superAdminRoutes = ["/admin/dashboard/members"];

  try {
    const res = await fetch(`${serverDomain}/api/auth/fetch-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const result = await res.json();
    const user = result?.user || null;

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
    console.error(error);
  }
}

export const config = {
  matcher: ["/login", "/join", "/member/:path*", "/admin/:path*"],
};
