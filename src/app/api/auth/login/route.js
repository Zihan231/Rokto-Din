import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const backendRes = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  const setCookie = backendRes.headers.get("set-cookie");
  const match = setCookie?.match(/jwt=([^;]+)/);

  if (!match) {
    return NextResponse.json(
      { message: "Login succeeded but jwt cookie was not returned by backend" },
      { status: 500 },
    );
  }

  const token = decodeURIComponent(match[1]);
  const res = NextResponse.json(data, { status: 200 });

  const isProd = process.env.NODE_ENV === "production";

  res.cookies.set("jwt", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
