// app/api/profile/route.ts
//
// EXAMPLE ONLY. This uses an in-memory object so the app runs end to
// end, but an in-memory object resets on every server restart/redeploy
// and isn't per-user. Replace the TODOs with real auth + a real DB
// (Postgres/Prisma, Supabase, MongoDB, etc.) before shipping.

import { NextRequest, NextResponse } from "next/server";
import type { CustomerProfile } from "../../Customer-Dashboard/context/UserContext";

// TODO: replace with a row in your `users`/`profiles` table, keyed by
// the authenticated user's id (from your session/auth cookie/JWT).
let profileStore: CustomerProfile = {
  fullName: "Mahfuzur Rahman",
  email: "mahfuzur@gmail.com",
  phone: "+880 1XX-XXXXXXX",
  location: "Dhaka, Bangladesh",
  role: "Customer",
  avatarUrl: "https://i.pravatar.cc/300?img=12",
  language: "English",
};

export async function GET(_req: NextRequest) {
  // TODO: look up the current user from the session, then fetch their
  // row from the database instead of returning the in-memory object.
  // const session = await getServerSession();
  // const profile = await db.profile.findUnique({ where: { userId: session.user.id } });
  return NextResponse.json(profileStore);
}

export async function PATCH(req: NextRequest) {
  const updates = (await req.json()) as Partial<CustomerProfile>;

  // TODO: validate `updates` (e.g. with zod) before trusting it.
  // TODO: look up the current user and update THEIR row, e.g.:
  // const saved = await db.profile.update({
  //   where: { userId: session.user.id },
  //   data: updates,
  // });

  profileStore = { ...profileStore, ...updates };
  return NextResponse.json(profileStore);
}