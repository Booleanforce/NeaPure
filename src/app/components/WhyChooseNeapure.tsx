/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Shield,
  ShieldCheck,
  Sparkles,
  Wrench,
  FileText,
  Smartphone,
  Headphones,
  Play,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  useGetWhyChooseUsQuery,
  type WhyChooseFeature,
} from "../../features/home/api/whychoose/Whychooseapi";

// Backend sends an icon *key* (string) per feature; map it to the
// actual lucide-react component here on the client.
const ICON_MAP: Record<string, LucideIcon> = {
  guarantee: Sparkles,
  genuine: ShieldCheck,
  installation: Wrench,
  warranty: FileText,
  app: Smartphone,
  support: Headphones,
};

export default function WhyChooseNeaPure() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetWhyChooseUsQuery();

  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) {
    return <WhyChooseSkeleton />;
  }

  if (isError || !data) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
          <p className="text-sm text-gray-500">
            Could not load this section right now.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const { video, trustBadge, features, chapters } = data;
  const activeChapter = chapters[currentChapter];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
              <Shield className="h-4 w-4" />
              WHY CHOOSE NEAPURE
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
              Why Thousands of Families
              <br />
              <span className="text-blue-600">Trust NeaPure</span>
            </h2>

            <p className="mt-6 max-w-xl text-gray-600 leading-8">
              We don't just sell water purifiers. We provide complete peace of
              mind with safe drinking water, genuine products, expert service
              and lifetime customer support.
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mx-auto lg:mx-0">
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-2 border-blue-100 bg-white shadow-md">
              <Shield className="mb-3 h-9 w-9 text-blue-600" />
              <span className="text-[11px] uppercase tracking-widest text-gray-500">
                Trusted By
              </span>
              <span className="text-3xl font-bold text-blue-600">
                {trustBadge.count}
              </span>
              <span className="text-sm text-gray-500">{trustBadge.label}</span>
            </div>
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* VIDEO SECTION */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              {isPlaying ? (
                <video
                  src={video.src}
                  poster={video.poster}
                  className="aspect-video w-full bg-black object-cover"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <>
                  <Image
                    src={video.poster}
                    alt="NeaPure Family"
                    width={1200}
                    height={700}
                    className="aspect-video w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play NeaPure brand video"
                    className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110"
                  >
                    <Play fill="currentColor" className="ml-1 h-8 w-8 text-blue-600" />
                  </button>

                  <div className="absolute bottom-16 left-8 max-w-xl">
                    <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                      HEALTHY BANGLADESH HOMES
                    </span>

                    <h3 className="mt-5 text-3xl font-bold leading-tight text-white">
                      Over {trustBadge.count} Families
                      <br />
                      Saved from Contaminated Water
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-200">
                      We proudly serve families across Bangladesh with premium
                      water purification systems and lifetime after-sales
                      support.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/60 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Play fill="currentColor" className="ml-0.5 h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-white">
                        0:00 / {activeChapter?.duration ?? "0:00"}
                      </span>
                    </div>

                    <div className="mx-8 h-1 flex-1 rounded-full bg-white/20">
                      <div className="h-full w-1/3 rounded-full bg-blue-500" />
                    </div>

                    <span className="text-xs text-white">HD</span>
                  </div>
                </>
              )}

              {isFetching && (
                <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[10px] text-white">
                  Refreshing...
                </div>
              )}
            </div>

            {/* CHAPTER SECTION */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Chapters / Step-by-Step Guide
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentChapter((prev) => Math.max(prev - 1, 0))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentChapter((prev) => Math.min(prev + 1, chapters.length - 1))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-blue-600 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.number}
                    onClick={() => setCurrentChapter(index)}
                    className="group text-left"
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        currentChapter === index
                          ? "ring-2 ring-blue-600 shadow-xl"
                          : "border border-gray-200 hover:shadow-lg"
                      }`}
                    >
                      <Image
                        src={chapter.thumbnail}
                        alt={chapter.title}
                        width={320}
                        height={180}
                        className="h-28 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/20" />

                      <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] text-white">
                        {chapter.duration}
                      </span>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl transition group-hover:scale-110">
                          <Play fill="currentColor" className="ml-0.5 h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-3 text-center text-xs font-semibold leading-5 text-slate-700">
                      {chapter.number}. {chapter.title}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-3 lg:col-span-4 lg:h-full">
            {features.map((feature: WhyChooseFeature) => {
              const Icon = ICON_MAP[feature.icon] ?? Sparkles;

              return (
                <div
                  key={feature.title}
                  className="group flex items-center rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-4 lg:flex-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 transition group-hover:bg-blue-100">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold leading-tight text-slate-900">
                        {feature.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Loading skeleton -------------------------------------------------

function WhyChooseSkeleton() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl animate-pulse px-4 lg:px-6">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="h-6 w-56 rounded-full bg-gray-200" />
            <div className="h-10 w-96 max-w-full rounded bg-gray-200" />
            <div className="h-4 w-80 max-w-full rounded bg-gray-200" />
          </div>
          <div className="mx-auto h-40 w-40 rounded-full bg-gray-200 lg:mx-0" />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="aspect-video w-full rounded-3xl bg-gray-200" />
            <div className="h-40 w-full rounded-3xl bg-gray-200" />
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 w-full rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}