import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const requireAuth = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname === '/') {
    if (!token) return NextResponse.redirect(new URL('/signin', request.url));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (requireAuth.some(path => pathname.startsWith(path))) {
    if (!token) return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    if (token) return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};
