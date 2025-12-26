import { NextResponse } from 'next/server';

// Some crawlers (and browsers) still request /favicon.ico explicitly.
// We generate a simple ICO-compatible PNG response by redirecting to /icon.png.
export function GET() {
  return NextResponse.redirect(new URL('/icon.png', 'https://www.titancode.pl'));
}
