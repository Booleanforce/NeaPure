"use client";

import React from "react";
import {
  Shield,
  Wrench,
  Headphones,
  ShieldCheck,
  Truck,
  Droplets,
  Calendar,
  Bell,
  Droplet,
  RefreshCw,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  useGetSmartCareQuery,
  type TopFeature,
  type AppFeature,
} from "../../../features/home/api/smartCareApi";

// Backend sends an icon *key* (string) per feature; map it to the
// actual lucide-react component here on the client.
const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  wrench: Wrench,
  headphones: Headphones,
  shieldCheck: ShieldCheck,
  truck: Truck,
  droplet: Droplet,
  droplets: Droplets,
  calendar: Calendar,
  bell: Bell,
};

export default function SmartCareSection() {
  const { data, isLoading, isError, refetch } = useGetSmartCareQuery();

  const topFeatures = data?.topFeatures ?? [];
  const appFeatures = data?.appFeatures ?? [];

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background Water Effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-48 h-64 bg-gradient-to-b from-blue-300 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="absolute right-20 top-1/3">
            <div className="w-32 h-32 bg-cyan-300 rounded-full blur-2xl opacity-30"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-4">
              <p className="text-sm text-blue-200">Could not load this section right now.</p>
              <button
                onClick={() => refetch()}
                className="mt-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {topFeatures.map((feature: TopFeature, idx) => {
                const Icon = ICON_MAP[feature.icon] ?? Shield;
                return (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs mb-0.5">{feature.title}</h3>
                      <p className="text-[10px] text-blue-200 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Decorative Water Splash on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/20 to-transparent"></div>
          <svg className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-64 text-cyan-300 opacity-30" viewBox="0 0 200 300" fill="currentColor">
            <path d="M100,50 Q120,80 110,120 Q130,140 120,180 Q140,200 130,240 Q110,260 100,280 Q90,260 70,240 Q60,200 80,180 Q70,140 90,120 Q80,80 100,50 Z" />
          </svg>
        </div>
      </div>

      {/* Smart Water Care Ecosystem Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-10">
            {/* Left Side - Phone Mockup & Text (static, unchanged) */}
            <div className="w-full lg:w-[300px] lg:flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-blue-600 text-xs font-bold tracking-wider mb-3">
                SMART WATER CARE ECOSYSTEM
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                All the care. <br />
                In your hand.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
                The NeaPure App helps you monitor water quality, filter life, book service and more.
              </p>

              {/* App Store Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                <button className="flex items-center space-x-2 bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400 leading-none">GET IT ON</div>
                    <div className="text-sm font-semibold text-white leading-tight">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center space-x-2 bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400 leading-none">Download on the</div>
                    <div className="text-sm font-semibold text-white leading-tight">App Store</div>
                  </div>
                </button>
              </div>

              {/* Phone Mockup — extra small, IntelliMate-style card layout */}
              <div className="relative w-full max-w-[170px] mx-auto lg:mx-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200/50 via-cyan-100/40 to-transparent rounded-[2rem] blur-2xl -z-10"></div>

                <div className="relative bg-black rounded-[1.5rem] p-1 shadow-2xl border border-gray-800">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-b-md z-10"></div>

                  <div className="bg-white rounded-[1.2rem] overflow-hidden px-3 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
                          <Droplets className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 text-[10px]">NeaPure</span>
                      </div>
                      <span className="text-[7px] text-gray-400 font-medium">1 of 1</span>
                    </div>

                    <h3 className="text-xs font-bold text-gray-900 leading-snug mb-3">
                      The smart way to care for your water
                    </h3>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 border border-blue-100/60">
                      <div className="text-[7px] font-bold text-blue-600 tracking-wider mb-1.5">
                        SMART MONITORING
                      </div>

                      <div className="space-y-1 mb-1.5 opacity-50">
                        <div className="h-1 bg-blue-200 rounded-full w-3/4"></div>
                        <div className="h-1 bg-blue-100 rounded-full w-1/2"></div>
                      </div>

                      <div className="bg-white rounded-md p-1.5 flex items-center gap-1 shadow-sm mb-1.5">
                        <div className="w-3.5 h-3.5 bg-gray-100 rounded flex-shrink-0"></div>
                        <div className="flex-1 space-y-0.5">
                          <div className="h-[3px] bg-gray-200 rounded-full w-full"></div>
                          <div className="h-[3px] bg-gray-100 rounded-full w-2/3"></div>
                        </div>
                        <div className="w-3 h-3 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      </div>

                      <div className="flex justify-center mb-1.5">
                        <div className="w-4.5 h-4.5 rounded-full bg-white shadow border border-gray-100 flex items-center justify-center">
                          <RefreshCw className="w-2.5 h-2.5 text-gray-500" />
                        </div>
                      </div>

                      <button className="w-full bg-gray-900 text-white text-[8px] font-semibold rounded-full py-1.5 flex items-center justify-center gap-1">
                        Sync with App
                        <Sparkles className="w-2 h-2" />
                      </button>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-bold text-gray-900 text-[10px] mb-1">
                        Real-Time Water Monitoring
                      </h4>
                      <p className="text-[8px] text-gray-500 leading-relaxed">
                        Tracks filter life and water quality, and books service automatically.
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <ChevronLeft className="w-3 h-3 text-gray-300" />
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - App Features */}
            <div className="w-full lg:flex-1">
              {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse" />
                      <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && !isError && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {appFeatures.map((feature: AppFeature, idx) => {
                    const Icon = ICON_MAP[feature.icon] ?? Droplet;
                    return (
                      <div key={idx} className="text-center group">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors border border-blue-100">
                          <Icon className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{feature.title}</h3>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}