// app/not-found.tsx
//
// Next.js App Router renders this automatically for:
//  1. Any unmatched route that doesn't have a closer not-found.tsx in its
//     own segment (e.g. /admin-dashboard/xyz, /login/xyz, /random-url)
//  2. Any explicit notFound() call from a server component/action that
//     isn't inside a segment with its own not-found.tsx
//
// No imports or wiring needed anywhere else — just having this file here
// at the app root is enough to make it the global fallback.

import Link from "next/link";
import { Droplet } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-900 px-6 py-16 sm:px-12">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* top-right splash blob */}
        <svg
          className="absolute -right-10 -top-16 h-56 w-56 text-blue-500/30 sm:h-72 sm:w-72"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M45.6,-58.3C58.2,-49.9,67,-35.5,70.6,-19.8C74.2,-4.1,72.6,13,65.4,27.3C58.2,41.6,45.4,53.1,30.6,60.6C15.8,68.1,-1,71.6,-17.7,68.8C-34.4,66,-51,56.9,-61.5,42.9C-72,28.9,-76.4,10,-73.8,-7.5C-71.2,-25,-61.6,-41.1,-48.2,-49.6C-34.8,-58.1,-17.4,-59,0.3,-59.3C18,-59.6,33,-66.7,45.6,-58.3Z" transform="translate(100 100)" />
        </svg>

        {/* bottom-left star burst */}
        <svg
          className="absolute -left-8 bottom-16 h-24 w-24 text-orange-400/40 sm:h-32 sm:w-32"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 0 L58 38 L96 30 L64 52 L88 84 L50 62 L12 84 L36 52 L4 30 L42 38 Z" />
        </svg>

        {/* scribble */}
        <svg
          className="absolute bottom-10 left-1/4 h-10 w-24 text-blue-400/50 sm:h-14 sm:w-32"
          viewBox="0 0 120 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <path d="M5 30 C 20 5, 30 5, 35 20 S 50 35, 55 15 S 70 0, 75 20" />
        </svg>

        {/* wavy line */}
        <svg
          className="absolute right-16 top-1/2 h-6 w-28 -translate-y-1/2 text-teal-400/60 sm:w-40"
          viewBox="0 0 140 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <path d="M2 10 Q 12 0, 22 10 T 42 10 T 62 10 T 82 10" />
        </svg>

        {/* floating steps, bottom right */}
        <div className="absolute -bottom-4 -right-4 hidden sm:flex items-end gap-1 opacity-80">
          <div className="h-10 w-14 rounded-t-md bg-blue-800" />
          <div className="h-16 w-14 rounded-t-md bg-blue-700" />
          <div className="h-24 w-14 rounded-t-md bg-blue-600" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-500/30">
          <Droplet className="h-5 w-5 fill-white text-white" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
          Error
        </p>

        <h1 className="mt-3 text-7xl font-extrabold leading-none text-white sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-xl font-semibold text-blue-100 sm:text-2xl">
          This page has run out of water
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-500"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}