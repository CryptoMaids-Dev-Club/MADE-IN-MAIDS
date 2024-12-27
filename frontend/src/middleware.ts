/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { defaultLanguage, availableLanguages } from '@/app/i18n/settings'

const getNegotiatedLanguage = (headers: Negotiator.Headers): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages])
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

export function middleware(request: NextRequest) {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  }
  const preferredLanguage = getNegotiatedLanguage(headers) || defaultLanguage
  const pathname = request.nextUrl.pathname

  // Redirect to TOP page if the user accesses the root path
  if (pathname === `/${defaultLanguage}` || pathname === `/${preferredLanguage}`) {
    return NextResponse.redirect(new URL(pathname + '/top', request.url))
  }

  // Redirect to the preferred language if the pathname is missing the locale
  const pathnameIsMissingLocale = availableLanguages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`
  )
  if (pathnameIsMissingLocale) {
    if (preferredLanguage !== defaultLanguage) {
      return NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url))
    } else {
      const newPathname = `/${defaultLanguage}${pathname}`
      return NextResponse.rewrite(new URL(newPathname, request.url))
    }
  }

  return NextResponse.next()
}
