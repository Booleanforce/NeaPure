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
} from "lucide-react";

export default function WhyChooseNeaPure() {
  const [currentChapter, setCurrentChapter] = useState(0);

  const features = [
    {
      icon: Sparkles,
      title: "THE NEAPURE GUARANTEE",
      description:
        "We promise safe water or full refund. Over 99% uptime with immediate technician response.",
    },
    {
      icon: ShieldCheck,
      title: "Genuine Products",
      description:
        "100% original cartridges, food-grade pipes, certified RO membranes & parts.",
    },
    {
      icon: Wrench,
      title: "Free Installation",
      description:
        "Professional installation by certified technicians across Bangladesh.",
    },
    {
      icon: FileText,
      title: "Digital Warranty",
      description:
        "Paperless warranty registration with instant online verification.",
    },
    {
      icon: Smartphone,
      title: "Smart Care App",
      description:
        "Track filter life, service history and request maintenance anytime.",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Live chat, WhatsApp and phone support whenever you need help.",
    },
  ];

  const chapters = [
    {
      number: "01",
      title: "Contaminated Water Sources",
      thumbnail: "/images/chapter1.jpg",
      duration: "0:45",
    },
    {
      number: "02",
      title: "Harmful Chemicals",
      thumbnail: "/images/chapter2.jpg",
      duration: "0:42",
    },
    {
      number: "03",
      title: "Suspended Particles",
      thumbnail: "/images/chapter3.jpg",
      duration: "0:38",
    },
    {
      number: "04",
      title: "Bacterial Contamination",
      thumbnail: "/images/chapter4.jpg",
      duration: "0:51",
    },
    {
      number: "05",
      title: "Heavy Metal Presence",
      thumbnail: "/images/chapter5.jpg",
      duration: "0:46",
    },
    {
      number: "06",
      title: "Bad Taste & Odor",
      thumbnail: "/images/chapter6.jpg",
      duration: "0:39",
    },
  ];

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
              <span className="text-blue-600">
                Trust NeaPure
              </span>
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
                10,000+
              </span>

              <span className="text-sm text-gray-500">
                Families
              </span>

            </div>

          </div>

        </div>

        {/* ================= MAIN LAYOUT ================= */}

        <div className="grid gap-6 lg:grid-cols-12">

          {/* LEFT CONTENT */}

          <div className="space-y-6 lg:col-span-8">

            {/* VIDEO SECTION */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">

            <Image
                src="/images/family.png"
                alt="NeaPure Family"
                width={1200}
                height={700}
                className="aspect-video w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Play Button */}
            <button className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110">

                <Play
                fill="currentColor"
                className="ml-1 h-8 w-8 text-blue-600"
                />

            </button>

            {/* Content */}

            <div className="absolute bottom-16 left-8 max-w-xl">

                <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                HEALTHY BANGLADESH HOMES
                </span>

                <h3 className="mt-5 text-3xl font-bold leading-tight text-white">

                Over 10,000+ Families
                <br />
                Saved from Contaminated Water

                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-200">

                We proudly serve families across Bangladesh with
                premium water purification systems and lifetime
                after-sales support.

                </p>

            </div>

            {/* Bottom Controls */}

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/60 px-6 py-4">

                <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">

                    <Play
                    fill="currentColor"
                    className="ml-0.5 h-4 w-4 text-white"
                    />

                </div>

                <span className="text-sm text-white">
                    0:00 / 0:45
                </span>

                </div>

                <div className="h-1 flex-1 mx-8 rounded-full bg-white/20">

                <div className="h-full w-1/3 rounded-full bg-blue-500" />

                </div>

                <span className="text-xs text-white">
                HD
                </span>

            </div>

            </div>

            {/* CHAPTER SECTION */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                    Chapters / Step-by-Step Guide
                </p>

                </div>

                <div className="flex items-center gap-2">

                <button
                    onClick={() =>
                    setCurrentChapter((prev) => Math.max(prev - 1, 0))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-blue-600 hover:text-white"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                    onClick={() =>
                    setCurrentChapter((prev) =>
                        Math.min(prev + 1, chapters.length - 1)
                    )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-blue-600 hover:text-white"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>

                </div>

            </div>

            {/* Chapters */}

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
                        src="/images/family.png"
                        alt={chapter.title}
                        width={320}
                        height={180}
                        className="h-28 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-black/20" />

                    {/* Duration */}

                    <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] text-white">
                        {chapter.duration}
                    </span>

                    {/* Play */}

                    <div className="absolute inset-0 flex items-center justify-center">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl transition group-hover:scale-110">

                        <Play
                            fill="currentColor"
                            className="ml-0.5 h-4 w-4 text-blue-600"
                        />

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

          <div className="space-y-4 lg:col-span-4">

            {/* FEATURES */}
            {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

                <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >

                <div className="flex gap-4">

                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 transition group-hover:bg-blue-100">

                    <Icon className="h-6 w-6 text-blue-600" />

                    </div>

                    <div>

                    <h4 className="text-base font-bold text-slate-900">

                        {feature.title}

                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-500">

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