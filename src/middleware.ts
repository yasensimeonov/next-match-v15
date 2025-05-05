import { auth } from '@/auth';
import {authRoutes, privateRoutes} from "@/routes";
import {NextResponse} from "next/server";

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/members', nextUrl));
        }
        return NextResponse.next();
    }

    if (isPrivateRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
