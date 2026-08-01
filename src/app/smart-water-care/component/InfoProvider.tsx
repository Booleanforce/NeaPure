/* eslint-disable react/jsx-no-undef */
"use client";
import {
  ArrowRight,
  Phone,
  Send,
  MessageCircle,
  CheckCircle2,
  QrCode,
  Smartphone,
} from "lucide-react";
import React from "react";

/* ----------------------------- Data ----------------------------- */

const purifierFeatures = [
  "Text Here",
  "Text Here",
  "Text Here",
  "Text Here",
];

const supportOptions = [
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: MessageCircle,
  },
  {
    title: "Call Technician",
    description: "Talk to our experts",
    icon: Phone,
  },
  {
    title: "WhatsApp Support",
    description: "Chat with us on WhatsApp",
    icon: MessageCircle,
  },
];

const kits = [
  {
    id: 1,
    name: "Product Name Here",
    price: "$1,020",
    image: "/images/kit.png",
  },
  {
    id: 2,
    name: "Product Name Here",
    price: "$1,020",
    image: "/images/kit.png",
  },
  {
    id: 3,
    name: "Product Name Here",
    price: "$1,020",
    image: "/images/kit.png",
  },
];

/* ----------------------------- Section ----------------------------- */

export default function NeapureInfoSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-20">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

          {/* ======================== LEFT CARD ======================== */}

    {/* ===================== Card 1 : Download App ===================== */}

<div className="w-full lg:max-w-[560px] rounded-[24px] bg-[#2451E0] px-8 py-8">
  <div className="flex h-full items-center justify-between gap-8">

    {/* Left Content */}
    <div className="flex flex-1 flex-col justify-between">

      <div>
        <h3 className="text-[32px] font-bold leading-tight text-white">
          Download Neapure App
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-white/70">
          Manage your purifier
          <br />
          anytime, anywhere.
        </p>

        {/* Features */}
        <div className="mt-8 flex items-start justify-between">

          <ul className="space-y-4">
            {purifierFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-[15px] text-white"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                {feature}
              </li>
            ))}
          </ul>

          {/* QR */}
          <div className="rounded-xl bg-white p-2 shadow-md">
            <QrCode className="w-20 h-20 text-[#2451E0]" />
          </div>

        </div>
      </div>

      {/* Store Buttons */}
        <div className="mt-10 flex gap-3">
        <button className="rounded-xl bg-black px-4 py-2 text-white text-sm">
            App Store
        </button>

        <button className="rounded-xl bg-black px-4 py-2 text-white text-sm">
            Google Play
        </button>
        </div>
    </div>

    {/* Phone */}

    <div className="flex-shrink-0">

      <div className="relative h-[335px] w-[165px] overflow-hidden rounded-[30px] border-[8px] border-slate-900 bg-white shadow-2xl">

        <div className="flex h-full items-center justify-center">
        <Smartphone className="w-20 h-20 text-[#2451E0]" />
        </div>

      </div>

    </div>

  </div>
</div>
{/* ===================== Right Side ===================== */}

<div className="flex flex-1 justify-between gap-14">

  {/* -------- Need Help -------- */}

  <div className="w-[290px]">
    <h3 className="text-[30px] font-bold text-[#111827]">
      Need Help?
    </h3>

    <p className="mt-2 text-[15px] text-[#6B7280]">
      We are here for you.
    </p>

    <div className="mt-10 space-y-8">
      {supportOptions.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2451E0]/10">
            <Icon />
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-[#111827]">
              {title}
            </h4>

            <p className="text-sm text-[#6B7280]">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>

    <button
      className="mt-10 flex h-12 items-center justify-center rounded-full bg-[#2451E0] px-8 font-semibold text-white transition hover:bg-[#163fc6]"
    >
      Contact Support
      <span className="ml-2">
        <Send className="w-4 h-4" />
      </span>
    </button>
  </div>

  {/* -------- Genuine Kits -------- */}

  <div className="w-[360px]">

    <h3 className="text-[30px] font-bold text-[#111827]">
      Buy Genuine Kits
    </h3>

    <p className="mt-2 text-[15px] text-[#6B7280]">
      100% Genuine. 100% Safe.
    </p>

    <div className="mt-10 space-y-6">

      {kits.map((kit) => (
        <div
          key={kit.id}
          className="flex items-center justify-between"
        >

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 overflow-hidden rounded-xl bg-[#F3F6FC]">
              <img
                src={kit.image}
                alt={kit.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h4 className="text-[15px] font-semibold text-[#111827]">
                {kit.name}
              </h4>

              <p className="mt-1 font-semibold text-[#2451E0]">
                {kit.price}
              </p>
            </div>

          </div>

          <button
            className="rounded-full bg-[#2451E0] px-5 py-2 text-sm font-semibold text-white hover:bg-[#163fc6]"
          >
            Buy Now
          </button>

        </div>
      ))}

    </div>

    <button className="mt-10 flex items-center gap-2 font-semibold text-[#2451E0]">
      View All Kits
      <ArrowRight className="w-5 h-5" />
    </button>

  </div>

</div>

</div>
</div>
</section>
  );
}