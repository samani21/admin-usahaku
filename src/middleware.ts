import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';
    const subdomain = hostname.split('.')[0];

    // 1. Logika untuk admin
    if (subdomain === 'admin') {
        // Jika user mengakses root (admin.localhost:3000/), rewrite ke /admin
        if (url.pathname === '/') {
            return NextResponse.rewrite(new URL('/admin', request.url));
        }
        // Untuk path lainnya (misal: /admin/manage), tambahkan prefix jika belum ada
        if (!url.pathname.startsWith('/admin')) {
            return NextResponse.rewrite(new URL(`/admin${url.pathname}`, request.url));
        }
    }

    // 2. Logika untuk home
    if (subdomain === 'home' || subdomain === 'localhost') {
        if (url.pathname === '/') {
            return NextResponse.rewrite(new URL('/home', request.url));
        }
        if (!url.pathname.startsWith('/home')) {
            return NextResponse.rewrite(new URL(`/home${url.pathname}`, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};