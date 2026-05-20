import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const BOT_USER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "WhatsApp",
  "Twitterbot",
  "LinkedInBot",
  "Googlebot",
  "bingbot",
];

export default clerkMiddleware(async (auth, req) => {
  const userAgent = req.headers.get("user-agent") || "";

  // ✅ لو bot — اسمحله يعدي بدون Clerk
  const isBot = BOT_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase()),
  );

  if (isBot) {
    return NextResponse.next();
  }

  // ✅ لو مش bot — طبّق حماية الـ dashboard
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
    "/(api|trpc)(.*)",
  ],
};
