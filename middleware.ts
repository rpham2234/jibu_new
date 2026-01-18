// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  const map: Record<string, string> = {
    'ug.jibuco.com': '/uganda',
    'ke.jibuco.com': '/kenya',
    'gh.jibuco.com': '/ghana',
    'rw.jibuco.com': '/rwanda',
    'zambia.jibuco.com': '/zambia',
    'goma.jibuco.com': '/drc',
    'tz.jibuco.com': '/tanzania',
  };

  const match = map[hostname];
  if (match && !url.pathname.startsWith(match)) {
    url.pathname = `${match}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
