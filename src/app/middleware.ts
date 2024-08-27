import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute= createRouteMatcher([
    "/",
    "/home"
])

export default clerkMiddleware((auth,req)=>{
    const {userId}=auth();
    const currentURL=new URL(req.url);
    const isHomePage = currentURL.pathname === "/"
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};