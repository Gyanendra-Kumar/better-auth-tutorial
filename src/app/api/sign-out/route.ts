import { NextResponse } from "next/server";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";

export async function POST() {
  try {
    await authClient.signOut();
    toast.success("Signed out successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign out error:", error);
    toast.error("Something went wrong");
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
