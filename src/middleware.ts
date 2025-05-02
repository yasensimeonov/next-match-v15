import { auth } from '@/auth';
import {authRoutes, publicRoutes} from "@/routes";
import {NextResponse} from "next/server";

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    console.log('isLoggedIn: ', isLoggedIn);
    console.log('isPublicRoute: ', isPublic);
    console.log('isAuthRoute: ', isAuthRoute);

    if (isPublic) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/members', nextUrl));
        }
        return NextResponse.next();
    }

    if (!isPublic && !isLoggedIn) {
        const redirectUrl = new URL('/login', nextUrl);

        console.log('Trying to redirect to: ', redirectUrl.toString());

        NextResponse.redirect(new URL(redirectUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    ]
}
