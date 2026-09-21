import { NextResponse } from "next/server";

// Mock endpoint for /api/hero-content
// Replace this with a real DB/CMS/service call when ready —
// the shape (HeroContent) is what heroApi.ts expects back.
export async function GET() {
  return NextResponse.json({
    highlights: [
      "7+ Advanced Filtration Stages",
      "Removes 99.99% Harmful Contaminants",
      "Smart & Energy Efficient Technology",
    ],
    stats: [
      { value: "7+", label: "Filtration Stages" },
      { value: "100%", label: "Eco-Friendly" },
      { value: "0%", label: "Chemicals Used" },
    ],
  });
}