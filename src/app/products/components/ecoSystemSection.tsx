"use client";

import React from 'react';
import {
  Shield,
  Wrench,
  Headphones,
  ShieldCheck,
  Truck,
  Droplets,
  Calendar,
  Bell,
  Droplet
} from 'lucide-react';

export default function SmartCareSection() {
  const topFeatures = [
    {
      icon: Shield,
      title: '100% Genuine Products',
      description: 'Original & certified components'
    },
    {
      icon: Wrench,
      title: 'Professional Installation',
      description: 'Trained experts for perfect setup'
    },
    {
      icon: Headphones,
      title: 'Dedicated After Sales Support',
      description: 'We are with you, always'
    },
    {
      icon: ShieldCheck,
      title: '1 Year Warranty',
      description: 'Peace of mind with our warranty'
    },
    {
      icon: Truck,
      title: 'Fast & Safe Delivery',
      description: 'Quick delivery to your doorstep'
    }
  ];

  const appFeatures = [
    { icon: Droplet, title: 'Filter Life Monitoring' },
    { icon: Calendar, title: 'Service Booking' },
    { icon: Droplets, title: 'Water Quality Updates' },
    { icon: Shield, title: 'Warranty Management' },
    { icon: Bell, title: 'Smart Notifications' }
  ];

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        {/* Background Water Effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-48 h-64 bg-gradient-to-b from-blue-300 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="absolute right-20 top-1/3">
            <div className="w-32 h-32 bg-cyan-300 rounded-full blur-2xl opacity-30"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-5 gap-6">
            {topFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-blue-200 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Water Splash on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/20 to-transparent"></div>
          <svg className="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-64 text-cyan-300 opacity-30" viewBox="0 0 200 300" fill="currentColor">
            <path d="M100,50 Q120,80 110,120 Q130,140 120,180 Q140,200 130,240 Q110,260 100,280 Q90,260 70,240 Q60,200 80,180 Q70,140 90,120 Q80,80 100,50 Z" />
          </svg>
        </div>
      </div>

      {/* Smart Water Care Ecosystem Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left Side - Phone Mockup & Text */}
            <div className="col-span-5">
              <div className="text-blue-600 text-xs font-bold tracking-wider mb-3">
                SMART WATER CARE ECOSYSTEM
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                All the care. <br />
                In your hand.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The NeaPure App helps you monitor water quality, filter life, book service and more.
              </p>

              {/* App Store Badges */}
              <div className="flex items-center space-x-3 mb-8">
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

              {/* Phone Mockup */}
              <div className="relative">
                <div className="w-56 bg-gray-900 rounded-3xl border-4 border-gray-800 p-2 shadow-2xl">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Phone Header */}
                    <div className="bg-blue-600 p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Droplets className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="text-white text-xs font-bold">NeaPure</div>
                      </div>
                      <div className="text-white text-[10px]">Total Water Saved</div>
                      <div className="text-white text-lg font-bold">2,450 L</div>
                    </div>
                    {/* Phone Content */}
                    <div className="p-3 space-y-2">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-[10px] font-semibold text-blue-900">Filter Life</div>
                        <div className="text-[9px] text-blue-600">80% Remaining</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-[10px] font-semibold text-green-900">Water Quality</div>
                        <div className="text-[9px] text-green-600">Excellent · 25 TDS</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-[10px] font-semibold">Service</div>
                          <div className="text-[9px] text-gray-500">Book Now</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-[10px] font-semibold">Warranty</div>
                          <div className="text-[9px] text-gray-500">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - App Features */}
            <div className="col-span-7">
              <div className="grid grid-cols-5 gap-6">
                {appFeatures.map((feature, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors border border-blue-100">
                      <feature.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{feature.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}