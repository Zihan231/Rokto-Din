import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (token) {
    try {
      await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Cookie: `jwt=${token}`,
        },
        cache: "no-store",
      });
    } catch (e) {
      // ignore backend logout errors; frontend cookie removal is the key part
    }
  }

  const isProd = process.env.NODE_ENV === "production";
  const res = NextResponse.json(
    { success: true, message: "Successfully logged out" },
    { status: 200 }
  );

  res.cookies.set("jwt", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}