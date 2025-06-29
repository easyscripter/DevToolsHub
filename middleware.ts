import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './constants'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(ROUTES.WORKSPACES, request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/',
} 