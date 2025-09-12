import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET!, // keep secret in env
    { expiresIn: "1h" },
  );

  return NextResponse.json({ jwt: token });
}
