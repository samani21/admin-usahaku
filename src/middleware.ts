import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

export function middleware(req: NextRequest) {
    const host = req.headers.get("host") || "";

    // hapus port
    const hostname = host.split(":")[0];

    // root domain -> landing page
    if (hostname === ROOT_DOMAIN) {
        return NextResponse.next();
    }

    // cek subdomain
    if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
        const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");

        const url = req.nextUrl.clone();

        // // khusus admin
        // if (subdomain === "admin") {
        //     url.pathname = `/admin${req.nextUrl.pathname}`;
        //     return NextResponse.rewrite(url);
        // }
        // if (subdomain === "auth") {
        //     url.pathname = `/auth${req.nextUrl.pathname}`;
        //     return NextResponse.rewrite(url);
        // }

        // selain admin dianggap tenant
        url.pathname = `/${subdomain}${req.nextUrl.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};