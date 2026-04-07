import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function proxy(request, context) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  const { path } = await context.params;   // ✅ fix here
  const joinedPath = path.join("/");

  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`${process.env.BACKEND_URL}/${joinedPath}`);
  targetUrl.search = incomingUrl.search;

  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (token) {
    headers.set("Cookie", `jwt=${token}`);
  }

  const method = request.method;
  const hasBody = !["GET", "HEAD"].includes(method);

  const backendRes = await fetch(targetUrl.toString(), {
    method,
    headers,
    body: hasBody ? await request.text() : undefined,
    cache: "no-store",
  });

  const responseContentType = backendRes.headers.get("content-type") || "";

  if (responseContentType.includes("application/json")) {
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  }

  const text = await backendRes.text();
  return new NextResponse(text, {
    status: backendRes.status,
    headers: {
      "content-type": responseContentType || "text/plain",
    },
  });
}

export async function GET(request, context) {
  return proxy(request, context);
}

export async function POST(request, context) {
  return proxy(request, context);
}

export async function PUT(request, context) {
  return proxy(request, context);
}

export async function PATCH(request, context) {
  return proxy(request, context);
}

export async function DELETE(request, context) {
  return proxy(request, context);
}