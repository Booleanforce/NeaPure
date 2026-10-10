/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Headphones,
  Droplet,
  ChevronRight,
} from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Advanced", subtitle: "Purification" },
  { icon: Award, title: "Tested &", subtitle: "Certified" },
  { icon: Headphones, title: "Smart Care", subtitle: "Ecosystem" },
  { icon: Droplet, title: "Reliable", subtitle: "After Sales" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-200">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* soft fade so left text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">
        {/* Breadcrumb */}
        <nav className="mb-14 flex items-center gap-3 text-[15px] text-slate-500">
          <Link href="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-blue-600">Products</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600">
                Our Products
              </p>
              <span className="h-px w-24 bg-gradient-to-r from-blue-400 to-transparent" />
            </div>

         {/* Heading */}
<h1 className="text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2c] sm:text-5xl xl:text-6xl">
  Pure Water
  <span className="text-blue-600">.</span>
  <br />
  Pure <span className="text-blue-600">Choice.</span>
</h1>
            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
              Discover NeaPure's advanced water purification systems and
              premium replacement kits—designed for every home and every need.
            </p>

            {/* Feature cards */}
            <div className="mt-10 grid max-w-[640px] grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-white/70 bg-white/40 p-5 shadow-[0_8px_30px_rgba(59,130,246,0.12)] backdrop-blur-md"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <Icon
                        className="h-7 w-7 text-blue-600"
                        strokeWidth={1.8}
                      />
                    </div>

                    <p className="text-base font-bold text-[#0a0f2c]">
                      {item.title}
                    </p>
                    <p className="text-base text-slate-500">
                      {item.subtitle}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Image
              src="/images/neaPureFilter.png"
              alt="NeaPure water purifier"
              width={800}
              height={700}
              priority
              className="mx-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}