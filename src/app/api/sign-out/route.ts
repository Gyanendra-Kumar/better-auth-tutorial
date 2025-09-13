import { NextResponse } from "next/server";
import { authClient } from "../../../lib/auth-client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get("redirect") || "/";
  const decodedRedirectUrl = decodeURIComponent(redirectUrl);
  try {
    // const cookieStore = await cookies();
    await authClient.signOut();
    const res = NextResponse.redirect(decodedRedirectUrl);

    res.cookies.delete("better-auth.session_token");

    return res;
  } catch (error) {
    console.error("Sign out error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
