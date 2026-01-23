import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // izinkan login & register
  if (
    pathname.startsWith("/dashboard/siswa/login") ||
    pathname.startsWith("/dashboard/volunteer/login") ||
    pathname.includes("/register")
  ) {
    return NextResponse.next()
  }

  const isLogin = request.cookies.get("EDUCARE_LOGIN")?.value
  const role = request.cookies.get("EDUCARE_ROLE")?.value

  if (!isLogin || !role) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/dashboard/siswa") && role !== "siswa") {
    return NextResponse.redirect(new URL("/dashboard/siswa/login", request.url))
  }

  if (pathname.startsWith("/dashboard/volunteer") && role !== "volunteer") {
    return NextResponse.redirect(new URL("/dashboard/volunteer/login", request.url))
  }

  return NextResponse.next()
}

/**
 * 🔥 INI YANG PALING PENTING
 * Batasi middleware HANYA ke halaman dashboard
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
}
