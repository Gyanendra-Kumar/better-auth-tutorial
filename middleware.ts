// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   const pathname = request.nextUrl.pathname.replace(/\/$/, "");
//   console.log("pathname", pathname);

//   // Public auth-related pages
//   const authPages = [
//     "/sign-in",
//     "/sign-up",
//     "/reset-password",
//     "forgot-password",
//     "/change-password",
//     "/email-verified",
//   ];

//   if (session && authPages.includes(pathname)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!session) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: [
//     "/dashboard",
//     "/sign-in/:path*",
//     "/sign-up/:path*",
//     "/reset-password/:path*",
//     "forgot-password/:path*",
//     "/change-password/:path*",
//     "/email-verified/:path*",
//   ], // Apply middleware to specific routes
// };
