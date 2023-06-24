import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/restaurant')) {
        const locationCookie = request.cookies.get("x-restaurant-roulette-location");
        if (locationCookie === null || locationCookie === undefined) {
            console.log("No location cookie found");
            return NextResponse.redirect(new URL('/', request.url));
        }
        console.log("You may pass.");
        return NextResponse.next();
    }

    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path/',
}