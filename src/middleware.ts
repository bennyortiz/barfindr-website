import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { bars } from './lib/data';

/**
 * Middleware to handle redirects from old numeric IDs to new slugs
 * 
 * This ensures backward compatibility with existing links and bookmarks
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // Check if this is a bar detail page with a numeric ID
  const barDetailRegex = /^\/bars\/(\d+)$/;
  const match = pathname.match(barDetailRegex);
  
  if (match) {
    const numericId = match[1];
    
    // Find the bar with this numeric ID
    const bar = bars.find(b => b.id === numericId);
    
    if (bar && bar.slug) {
      // Redirect to the slug-based URL
      url.pathname = `/bars/${bar.slug}`;
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: [
    // Only run on bar detail pages with numeric IDs
    '/bars/:id*',
  ],
};
