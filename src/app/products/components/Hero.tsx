/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Headphones,
  Droplets,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Advanced",
    subtitle: "Purification",
  },
  {
    icon: Award,
    title: "Tested &",
    subtitle: "Certified",
  },
  {
    icon: Headphones,
    title: "Smart Care",
    subtitle: "Ecosystem",
  },
  {
    icon: Droplets,
    title: "Reliable",
    subtitle: "After Sales",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/water-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">

        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <ChevronRight className="h-4 w-4" />

          <span className="font-medium text-blue-600">
            Products
          </span>

        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .6,
            }}
          >

            <p className="mb-4 font-semibold uppercase tracking-wider text-blue-600">
              Our Products
            </p>

            <h1 className="text-5xl font-black leading-tight text-gray-900 lg:text-6xl">

              Pure Water.

              <br />

              Pure{" "}

              <span className="text-blue-600">
                Choice.
              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">

              Discover NeaPure's advanced water purification systems
              and premium replacement kits—designed for every
              home and every need.

            </p>

            {/* Features */}

            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">

              {features.map((item) => {

                const Icon = item.icon;

                return (

                  <div
                    key={item.title}
                    className="flex items-center gap-3"
                  >

                    <div className="rounded-xl bg-blue-50 p-3">

                      <Icon className="h-6 w-6 text-blue-600" />

                    </div>

                    <div>

                      <p className="text-sm font-semibold">

                        {item.title}

                      </p>

                      <p className="text-sm text-gray-500">

                        {item.subtitle}

                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: .7,
            }}
            className="relative"
          >

            <Image
              src="/images/hero-purifier.png"
              alt="Purifier"
              width={650}
              height={650}
              priority
              className="mx-auto object-contain"
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
}