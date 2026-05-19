import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userAgent = req.headers.get("user-agent") || "";

  // 👇 allow social media bots
  const isBot =
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("Facebot") ||
    userAgent.includes("WhatsApp");

  // لو bot → سيبه يعدي
  if (isBot) return;

  // حماية الداشبورد فقط
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};