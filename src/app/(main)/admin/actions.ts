"use server";

import { forbidden, unauthorized } from "next/navigation";
import { setTimeout } from "node:timers/promises";
import { getServerSession } from "../../../lib/get-session";

export async function deleteApplication() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.role !== "admin") forbidden();

  // Delete app...

  await setTimeout(800);
}
