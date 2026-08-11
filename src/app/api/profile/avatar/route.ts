// app/api/profile/avatar/route.ts
//
// EXAMPLE ONLY. Swap the "save file" section for your real storage
// provider (S3, Cloudinary, Supabase Storage, Vercel Blob, etc.).
// Whatever it is, this route must return a durable, publicly
// reachable URL — that's what gets saved as avatarUrl and is what
// makes the photo survive a refresh.

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // ---- Example: Vercel Blob ----
  // import { put } from "@vercel/blob";
  // const blob = await put(`avatars/${Date.now()}-${file.name}`, file, {
  //   access: "public",
  // });
  // const url = blob.url;

  // ---- Example: Supabase Storage ----
  // const buffer = Buffer.from(await file.arrayBuffer());
  // const { data, error } = await supabase.storage
  //   .from("avatars")
  //   .upload(`${Date.now()}-${file.name}`, buffer, { contentType: file.type });
  // if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // const { data: pub } = supabase.storage.from("avatars").getPublicUrl(data.path);
  // const url = pub.publicUrl;

  // Placeholder so this route runs without any storage provider wired
  // up yet — replace before shipping, this does NOT persist anywhere.
  const url = `https://i.pravatar.cc/300?u=${Date.now()}`;

  // TODO: also persist `url` onto the current user's profile row here
  // (or let the client call PATCH /api/profile with it, as ProfilePage
  // already does after this upload succeeds).

  return NextResponse.json({ url });
}