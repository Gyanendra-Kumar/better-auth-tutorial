import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return NextResponse.json({ jwt: token });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 },
    );
  }
}
