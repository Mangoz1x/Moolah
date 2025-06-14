// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // 1️⃣ If user is authenticated and hitting any /auth/* page → send to /dashboard
    if (token && pathname.startsWith('/auth')) {
        const url = req.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // 2️⃣ If user is NOT authenticated and hits /dashboard/* → send to /auth/signin
    if (!token && pathname.startsWith('/dashboard')) {
        const url = req.nextUrl.clone();
        url.pathname = '/auth/signin';
        return NextResponse.redirect(url);
    }

    // Otherwise, let them through
    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/dashboard/:path*'],
};
