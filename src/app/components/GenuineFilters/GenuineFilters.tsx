'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ShoppingCart, Shield, Box, Package, UserCheck, CheckCircle } from 'lucide-react';

// NOTE: This file uses 'use client' (required by Swiper's hooks), so it
// cannot export `metadata` directly (Next.js only allows that in Server
// Components). If you need the page <title>, add:
//   export const metadata = { title: 'AquaPure - Genuine Filters' };
// to layout.tsx, or wrap this component from a separate server page.tsx.

// Define types for our data structures
interface Product {
  name: string;
  description: string;
  price: string;
}

interface WarrantyFeature {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
}

export default function GenuineFilters() {
  const products: Product[] = Array(6).fill({
    name: 'AquaPure',
    description: 'RO Membr',
    price: '$1,020',
  });

  const warrantyFeatures: WarrantyFeature[] = [
    { icon: Shield, title: 'Warranty Management' },
    { icon: Box, title: 'Warranty Management' },
    { icon: Package, title: 'Warranty Management' },
    { icon: UserCheck, title: 'Warranty Management' },
    { icon: CheckCircle, title: 'Warranty Management' },
  ];

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
      <div className="aspect-video mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
        <img src="/filter.svg" alt="AquaPure Filter" className="w-full h-full object-contain p-2" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
      <p className="text-gray-500 text-xs mb-3">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-900">{product.price}</span>
        <button className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-8 sm:mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              GENUINE FILTERS, <span className="text-blue-600">BEST PERFORMANCE.</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">True to the brand, true to the quality.</p>
          </div>
          <button className="self-start sm:self-auto text-blue-600 font-semibold hover:underline text-sm">
            View All
          </button>
        </div>

        {/* Products - Swiper carousel on mobile, widens via breakpoints on larger screens */}
        <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Swiper
            modules={[FreeMode]}
            freeMode
            spaceBetween={12}
            slidesPerView={2.2}
            breakpoints={{
              480: { slidesPerView: 2.5, spaceBetween: 12 },
              640: { slidesPerView: 3.2, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 6, spaceBetween: 16 },
            }}
            className="!pb-2"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            {/* App Info */}
            <div className="lg:col-span-3 space-y-6 order-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">NeoPure</h2>
                <p className="text-lg sm:text-xl text-gray-600 mt-1">Smart Water care App</p>
              </div>

              <div className="flex items-start gap-6">
                {/* QR Code */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg p-1 border border-gray-200 flex-shrink-0">
                  <svg viewBox="0 0 29 29" className="w-full h-full">
                    <rect x="0" y="0" width="7" height="7" fill="black" />
                    <rect x="1" y="1" width="5" height="5" fill="white" />
                    <rect x="2" y="2" width="3" height="3" fill="black" />
                    <rect x="22" y="0" width="7" height="7" fill="black" />
                    <rect x="23" y="1" width="5" height="5" fill="white" />
                    <rect x="24" y="2" width="3" height="3" fill="black" />
                    <rect x="0" y="22" width="7" height="7" fill="black" />
                    <rect x="1" y="23" width="5" height="5" fill="white" />
                    <rect x="2" y="24" width="3" height="3" fill="black" />
                    <rect x="20" y="20" width="5" height="5" fill="black" />
                    <rect x="21" y="21" width="3" height="3" fill="white" />
                    <rect x="22" y="22" width="1" height="1" fill="black" />
                  </svg>
                </div>

                {/* App Store Badges */}
                <div className="space-y-2 w-32">
                  <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
                    <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[10px]">Download on the</div>
                      <div className="text-xs font-semibold">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
                    <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.713-2.302 2.713-2.302zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[10px]">GET IT ON</div>
                      <div className="text-xs font-semibold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="lg:col-span-4 flex justify-center order-2">
              <div className="relative w-40 h-[10rem] sm:w-44 sm:h-[11rem] bg-gray-900 rounded-t-[2.5rem] border-[7px] border-b-0 border-gray-800 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-xl"></div>
                <div className="bg-white h-full pt-8 px-3">
                  <div className="text-[9px] text-gray-400 mb-1.5 text-center">IntelliMate</div>
                  <div className="space-y-1">
                    <div className="h-0.5 bg-gray-200 rounded w-full"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                    <div className="mt-2 p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-[9px] font-semibold text-blue-900 leading-tight">
                        The new age AI that reduce headache
                      </div>
                      <div className="text-[8px] text-blue-600 mt-0.5">SMART PLANNER</div>
                    </div>
                    <div className="space-y-0.5 mt-1.5">
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty Cards */}
            <div className="lg:col-span-5 order-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {warrantyFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="text-center text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                      {item.title}
                    </h3>
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