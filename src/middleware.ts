import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the routes that are public
const isPublicRoute = createRouteMatcher(['/']);

// Clerk middleware to check authentication
export default clerkMiddleware(async (auth, request) => {
  // Protect all routes except the ones defined in isPublicRoute
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// Config matcher to apply middleware only on relevant paths
export const config = {
  matcher: [ "/dashboard", "/(api|trpc)(.*)"],
};
