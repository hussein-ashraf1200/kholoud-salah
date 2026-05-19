import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userAgent = req.headers.get("user-agent") || "";

  const isBot =
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("Facebot") ||
    userAgent.includes("WhatsApp") ||
    userAgent.includes("Twitterbot") ||
    userAgent.includes("LinkedInBot");

  // ✅ لازم NextResponse.next()
  if (isBot) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});