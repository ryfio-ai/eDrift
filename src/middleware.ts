import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // If the request is coming to the .in domain, redirect it permanently to the .com domain
  if (host.includes('edriftelectric.in')) {
    // Construct the new URL with the .com domain
    const newUrl = new URL(url.pathname + url.search, 'https://www.edriftelectric.com');
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, favicon.ico, etc (public files)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
