// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('userToken')?.value
  const { pathname } = request.nextUrl

  // If logged in and trying to access signup
  if (token && pathname === '/signup') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If not logged in and trying to access protected pages
  if (!token && pathname !== '/signup') {
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  return NextResponse.next()
}