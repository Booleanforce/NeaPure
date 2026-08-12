/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from 'react';
import {
  Droplets,
  Heart,
  ShieldCheck,
  Leaf,
  Wifi,
  Diamond,
  Wrench,
  Headphones,
  Filter,
  Calendar,
  MapPin,
  Shield,
  ShoppingCart,
  Bell,
  CheckCircle,
  ClipboardList,
  Truck,
  Globe,
  ThumbsUp,
  ChevronRight,
  ChevronLeft,
  Phone,
  Menu,
  ArrowRight,
  Send
} from 'lucide-react';

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroFeatures = [
    { icon: Droplets, title: 'Pure Water', desc: 'Safe & great tasting' },
    { icon: Heart, title: 'Healthy Life', desc: 'Better for you & your family' },
    { icon: ShieldCheck, title: 'Trusted Quality', desc: 'Premium components & certified filters' },
    { icon: Leaf, title: 'Peace of Mind', desc: 'Reliable performance you can trust' }
  ];

  const whyStartedItems = [
    { icon: Droplets, title: 'Better Water', desc: 'For a healthier tomorrow' },
    { icon: Heart, title: 'Better Life', desc: 'For you and your loved ones' },
    { icon: Leaf, title: 'Better Future', desc: 'For a cleaner planet for generations' }
  ];

  const differentiators = [
    { icon: Droplets, title: 'Advanced Purification', desc: 'Multi-stage RO + UV filtration for maximum safety.' },
    { icon: Diamond, title: 'Premium Design', desc: 'Modern, elegant and built to complement your home.' },
    { icon: Wifi, title: 'Smart Connectivity', desc: 'Stay informed and in control with the NeaPure App.' },
    { icon: ShieldCheck, title: 'Certified Components', desc: 'High-quality, tested and certified for complete peace of mind.' },
    { icon: Wrench, title: 'Professional Installation', desc: 'Expert installation ensures perfect performance.' },
    { icon: Headphones, title: 'Dedicated Support', desc: "We're with you before, during and after your purchase." }
  ];

  const appFeatures = [
    { icon: Filter, title: 'Filter Life Monitoring' },
    { icon: Calendar, title: 'Service Booking' },
    { icon: MapPin, title: 'Installation Tracking' },
    { icon: Shield, title: 'Warranty Management' },
    { icon: ShoppingCart, title: 'Buy Filters' },
    { icon: Bell, title: 'Smart Notifications' }
  ];

  const promises = [
    { icon: CheckCircle, title: 'Genuine Products', desc: 'Only original NeaPure filters and spares.' },
    { icon: ClipboardList, title: 'Transparent Pricing', desc: 'No hidden costs. What you see is what you pay.' },
    { icon: Truck, title: 'Fast & Reliable Service', desc: 'Quick response and on-time service.' },
    { icon: Globe, title: 'Nationwide Support', desc: 'Growing network to serve you better every day.' },
    { icon: ThumbsUp, title: 'Your Satisfaction Matters', desc: 'We listen, we care and we\'re here to improve always.' }
  ];

  const brandImages = [
    { title: 'Our Showroom', color: 'from-gray-200 to-gray-300', image: '/images/showroom.png' },
    { title: 'Our Service Team', color: 'from-blue-200 to-blue-300' },
    { title: 'Professional Installation', color: 'from-gray-300 to-gray-400' },
    { title: 'NeaPure Customer App', color: 'from-blue-300 to-blue-400' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded mb-4">
              ABOUT NEAPURE
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              A New Standard <br />
              for <span className="text-blue-600">Pure Water.</span>
            </h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              NeaPure is a new generation water purification brand created to make clean, safe and great-tasting water accessible to every home.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We combine advanced purification technology, elegant design and smart connectivity to take care of what matters most—your family.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-500">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="/images/neaPureFilter.png"
              alt="NeaPure Water Purifier"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl scale-200"
            />
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="rounded-2xl overflow-hidden h-80 flex items-center justify-center">
                <img
                  src="/images/family-image.png"
                  alt="NeaPure Family"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="text-blue-600 text-xs font-bold mb-2">WHY WE STARTED</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">A simple belief.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Everyone deserves access to clean and safe drinking water. We saw the challenges families face—uncertain water quality, complicated maintenance and unreliable service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That's why we built NeaPure—to deliver purity, simplicity and smart water care in one complete solution.
              </p>
            </div>

            <div className="lg:col-span-1 space-y-6">
              {whyStartedItems.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes NeaPure Different */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="text-blue-600 text-xs font-bold mb-2">WHAT MAKES NEAPURE DIFFERENT</div>
            <h2 className="text-4xl font-bold text-gray-900">
              Technology. Design. Care.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {differentiators.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Water Care Ecosystem */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-16 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-blue-400 text-xs font-bold mb-2">SMART WATER CARE ECOSYSTEM</div>
              <h2 className="text-4xl font-bold mb-4">
                All the care. <br />
                In your hand.
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                The NeaPure App helps you monitor, manage and maintain your purifier anytime, anywhere.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {appFeatures.map((feature, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-12 h-12 bg-blue-600/30 border border-blue-500/50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <feature.icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="text-xs text-gray-300">{feature.title}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 bg-black border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center space-x-2 bg-black border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-end justify-center space-x-4">
              {/* Phone 1 */}
              <div className="w-40 bg-gray-800 rounded-3xl border-4 border-gray-700 p-2 shadow-2xl">
                <div className="bg-blue-900 rounded-2xl p-3 h-64">
                  <div className="text-center mb-3">
                    <div className="text-xs text-gray-300">Filter Life</div>
                  </div>
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 flex items-center justify-center mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">80%</div>
                      <div className="text-[10px] text-gray-300">Remaining</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-300 text-center">RO Filter</div>
                  <div className="text-[10px] text-green-400 text-center">Good</div>
                  <button className="w-full mt-2 bg-blue-600 text-white text-[10px] py-1 rounded">Replace in 120 days</button>
                </div>
              </div>

              {/* Phone 2 - Main */}
              <div className="w-48 bg-gray-800 rounded-3xl border-4 border-gray-700 p-2 shadow-2xl -mt-8">
                <div className="bg-white rounded-2xl p-3 h-72">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">NeaPure</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-1">Good Morning 👋</div>
                  <div className="text-[10px] text-gray-500 mb-3">Your water is safe & pure</div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                    <div className="text-[10px] font-semibold text-green-700">Water Quality</div>
                    <div className="text-[10px] text-green-600">Excellent · TDS: 25 ppm</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] font-semibold">Filter Life</div>
                      <div className="text-[9px] text-gray-500">80% Remaining</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] font-semibold">Service</div>
                      <div className="text-[9px] text-gray-500">Book Now</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] font-semibold">Warranty</div>
                      <div className="text-[9px] text-gray-500">Active</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-[10px] font-semibold">Notifications</div>
                      <div className="text-[9px] text-gray-500">No new alerts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 3 */}
              <div className="w-40 bg-gray-800 rounded-3xl border-4 border-gray-700 p-2 shadow-2xl">
                <div className="bg-white rounded-2xl p-3 h-64">
                  <div className="text-xs font-bold text-gray-900 mb-3">Service Booking</div>
                  <div className="space-y-2">
                    {['Regular Service', 'Filter Replacement', 'Water Flow Issue', 'Other Issue'].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                        <span className="text-[10px] text-gray-700">{item}</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white text-[10px] py-2 rounded-lg">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-blue-600 text-xs font-bold mb-2">OUR PROMISE</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We are with you, <br />always.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As a new brand, we promise to earn your trust every single day with honest service, reliable products and a customer-first approach.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {promises.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Brand */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-blue-600 text-xs font-bold mb-2">BEHIND THE BRAND</div>
              <h2 className="text-3xl font-bold text-gray-900">Real people. Real passion.</h2>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(brandImages.length - 1, currentSlide + 1))}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brandImages.map((img, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${img.color} rounded-2xl h-48 flex items-center justify-center mb-3 overflow-hidden relative`}>
                  {img.image ? (
                    <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white font-bold text-sm opacity-50">{img.title}</div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="text-center font-semibold text-gray-900 text-sm">{img.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-none">NeaPure</div>
                <div className="text-[10px] text-blue-200">Pure Water. Pure Life.</div>
              </div>
            </div>
            <div className="border-l border-blue-700 pl-4 ml-4">
              <h3 className="text-xl font-bold">Experience Smarter Water Care.</h3>
              <p className="text-sm text-blue-200">Join us in our mission to make every drop of water pure and every home healthier.</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition-colors shadow-lg">
            <span>Explore Products</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
}