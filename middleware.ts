import { NextRequest, NextResponse } from "next/server";

let locales = ["en-US", "fr"];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // // Redirect if there is no locale
  // if (pathnameIsMissingLocale) {
  //   // e.g. incoming request is /products
  //   // The new URL is now /en-US/products


  //   return NextResponse.redirect(new URL(`/fr/${pathname}`, request.url));
  // }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
