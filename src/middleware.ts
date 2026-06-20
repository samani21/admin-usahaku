import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

export function middleware(req: NextRequest) {
    const host = req.headers.get("host") || "";
    const hostname = host.split(":")[0];
    const url = req.nextUrl.clone();

    // Cek token dari Cookies (BUKAN localStorage)
    const token = req.cookies.get("token")?.value;

    // 1. Kondisi khusus testing menggunakan IP Local
    // Jika hostname adalah IP lokal dan path dimulai dengan /admin
    const isIpAddress = /^[0-9.]+$/.test(hostname); // Regex sederhana mendeteksi IP
    if (isIpAddress && url.pathname.startsWith("/admin")) {
        // Jika tidak ada token dan bukan sedang di halaman login, lempar ke login
        if (!token && !url.pathname.startsWith("/admin/auth/login")) {
            url.pathname = "/admin/auth/login";
            return NextResponse.redirect(url);
        }
        // Biarkan lolos untuk testing IP
        return NextResponse.next();
    }

    // 2. Logika Root Domain -> Landing Page
    if (hostname === ROOT_DOMAIN) {
        return NextResponse.next();
    }

    // 3. Logika Subdomain (Production)
    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
        const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");

        // Proteksi Auth untuk Subdomain Admin
        if (subdomain === "admin") {
            if (!token && !url.pathname.startsWith("/auth/login")) {
                url.pathname = "/auth/login";
                // Gunakan redirect (agar URL browser berubah)
                return NextResponse.redirect(url);
            }
        }

        // Rewrite path sesuai subdomain agar struktur Next.js terbaca
        url.pathname = `/${subdomain}${req.nextUrl.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|api).*)"],
};