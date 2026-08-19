// app/api/profile/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  if (!process.env.API_URL) {
    console.error("API_URL env var is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/avatar/`, {
      method: "POST",
      headers: { Authorization: req.headers.get("authorization") ?? "" },
      body: formData,
    });

    const text = await res.text();
    console.log("Backend avatar upload status:", res.status, "body:", text);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Backend returned ${res.status}: ${text}` },
        { status: res.status }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    console.error("Avatar upload proxy failed:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}