import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const backendRes = await fetch(`${process.env.BACKEND_URL}/donor/profile`, {
    method: "GET",
    headers: {
      Cookie: `jwt=${token}`,
    },
    cache: "no-store",
  });

  const data = await backendRes.json();

  return NextResponse.json(data, { status: backendRes.status });
}