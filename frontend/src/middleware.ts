import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/protectedPage"],
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: true });
  const { origin } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(
      new URL("/api/auth/error?error=AccessDenied", origin)
    );
  }

  return NextResponse.next();
}
