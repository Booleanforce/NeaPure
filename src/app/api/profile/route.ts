// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch(`${process.env.API_URL}/api/auth/me/`, {
    headers: { Authorization: req.headers.get("authorization") ?? "" },
  });
  return NextResponse.json(await res.json(), { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${process.env.API_URL}/api/auth/me/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") ?? "",
    },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}