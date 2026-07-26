import React from 'react';
import { ShoppingCart, Shield, Box, Package, UserCheck, CheckCircle } from 'lucide-react';

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

// App Router Metadata
export const metadata = {
  title: 'AquaPure - Genuine Filters',
};

export default function GenuineFilters() {
  const products: Product[] = Array(6).fill({
    name: 'AquaPure',
    description: 'RO Membr',
    price: '$1,020'
  });

  const warrantyFeatures: WarrantyFeature[] = [
    { icon: Shield, title: 'Warranty Management' },
    { icon: Box, title: 'Warranty Management' },
    { icon: Package, title: 'Warranty Management' },
    { icon: UserCheck, title: 'Warranty Management' },
    { icon: CheckCircle, title: 'Warranty Management' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              GENUINE FILTERS, <span className="text-blue-600">BEST PERFORMANCE.</span>
            </h1>
            <p className="text-gray-500 mt-2">True to the brand, true to the quality.</p>
          </div>
          <button className="text-blue-600 font-semibold hover:underline text-sm">
            View All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100">
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
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* App Info - Left */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">NeaPure</h2>
                <p className="text-xl text-gray-600 mt-1">Smart Water care App</p>
              </div>
              
              <div className="flex items-start gap-6">
                {/* QR Code */}
                <div className="w-20 h-20 bg-white rounded-lg p-1 border border-gray-200 flex-shrink-0">
                  <svg viewBox="0 0 29 29" className="w-full h-full">
                    {/* Position Detection Patterns */}
                    <rect x="0" y="0" width="7" height="7" fill="black"/>
                    <rect x="1" y="1" width="5" height="5" fill="white"/>
                    <rect x="2" y="2" width="3" height="3" fill="black"/>
                    
                    <rect x="22" y="0" width="7" height="7" fill="black"/>
                    <rect x="23" y="1" width="5" height="5" fill="white"/>
                    <rect x="24" y="2" width="3" height="3" fill="black"/>
                    
                    <rect x="0" y="22" width="7" height="7" fill="black"/>
                    <rect x="1" y="23" width="5" height="5" fill="white"/>
                    <rect x="2" y="24" width="3" height="3" fill="black"/>
                    
                    {/* Timing Patterns */}
                    <rect x="8" y="6" width="1" height="1" fill="black"/>
                    <rect x="10" y="6" width="1" height="1" fill="black"/>
                    <rect x="12" y="6" width="1" height="1" fill="black"/>
                    <rect x="14" y="6" width="1" height="1" fill="black"/>
                    <rect x="16" y="6" width="1" height="1" fill="black"/>
                    <rect x="18" y="6" width="1" height="1" fill="black"/>
                    <rect x="20" y="6" width="1" height="1" fill="black"/>
                    
                    <rect x="6" y="8" width="1" height="1" fill="black"/>
                    <rect x="6" y="10" width="1" height="1" fill="black"/>
                    <rect x="6" y="12" width="1" height="1" fill="black"/>
                    <rect x="6" y="14" width="1" height="1" fill="black"/>
                    <rect x="6" y="16" width="1" height="1" fill="black"/>
                    <rect x="6" y="18" width="1" height="1" fill="black"/>
                    <rect x="6" y="20" width="1" height="1" fill="black"/>
                    
                    {/* Alignment Pattern */}
                    <rect x="20" y="20" width="5" height="5" fill="black"/>
                    <rect x="21" y="21" width="3" height="3" fill="white"/>
                    <rect x="22" y="22" width="1" height="1" fill="black"/>
                    
                    {/* Data Modules - realistic pattern */}
                    <rect x="8" y="0" width="1" height="1" fill="black"/>
                    <rect x="9" y="0" width="1" height="1" fill="black"/>
                    <rect x="11" y="0" width="1" height="1" fill="black"/>
                    <rect x="13" y="0" width="1" height="1" fill="black"/>
                    <rect x="15" y="0" width="1" height="1" fill="black"/>
                    <rect x="17" y="0" width="1" height="1" fill="black"/>
                    <rect x="19" y="0" width="1" height="1" fill="black"/>
                    <rect x="21" y="0" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="1" width="1" height="1" fill="black"/>
                    <rect x="10" y="1" width="1" height="1" fill="black"/>
                    <rect x="14" y="1" width="1" height="1" fill="black"/>
                    <rect x="18" y="1" width="1" height="1" fill="black"/>
                    
                    <rect x="9" y="2" width="1" height="1" fill="black"/>
                    <rect x="11" y="2" width="1" height="1" fill="black"/>
                    <rect x="13" y="2" width="1" height="1" fill="black"/>
                    <rect x="16" y="2" width="1" height="1" fill="black"/>
                    <rect x="20" y="2" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="3" width="1" height="1" fill="black"/>
                    <rect x="10" y="3" width="1" height="1" fill="black"/>
                    <rect x="12" y="3" width="1" height="1" fill="black"/>
                    <rect x="15" y="3" width="1" height="1" fill="black"/>
                    <rect x="17" y="3" width="1" height="1" fill="black"/>
                    <rect x="19" y="3" width="1" height="1" fill="black"/>
                    
                    <rect x="9" y="4" width="1" height="1" fill="black"/>
                    <rect x="11" y="4" width="1" height="1" fill="black"/>
                    <rect x="14" y="4" width="1" height="1" fill="black"/>
                    <rect x="16" y="4" width="1" height="1" fill="black"/>
                    <rect x="18" y="4" width="1" height="1" fill="black"/>
                    <rect x="20" y="4" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="5" width="1" height="1" fill="black"/>
                    <rect x="12" y="5" width="1" height="1" fill="black"/>
                    <rect x="15" y="5" width="1" height="1" fill="black"/>
                    <rect x="17" y="5" width="1" height="1" fill="black"/>
                    <rect x="21" y="5" width="1" height="1" fill="black"/>
                    
                    <rect x="9" y="7" width="1" height="1" fill="black"/>
                    <rect x="11" y="7" width="1" height="1" fill="black"/>
                    <rect x="13" y="7" width="1" height="1" fill="black"/>
                    <rect x="16" y="7" width="1" height="1" fill="black"/>
                    <rect x="18" y="7" width="1" height="1" fill="black"/>
                    <rect x="20" y="7" width="1" height="1" fill="black"/>
                    <rect x="22" y="7" width="1" height="1" fill="black"/>
                    
                    <rect x="0" y="8" width="1" height="1" fill="black"/>
                    <rect x="2" y="8" width="1" height="1" fill="black"/>
                    <rect x="4" y="8" width="1" height="1" fill="black"/>
                    <rect x="8" y="8" width="1" height="1" fill="black"/>
                    <rect x="10" y="8" width="1" height="1" fill="black"/>
                    <rect x="14" y="8" width="1" height="1" fill="black"/>
                    <rect x="17" y="8" width="1" height="1" fill="black"/>
                    <rect x="19" y="8" width="1" height="1" fill="black"/>
                    <rect x="23" y="8" width="1" height="1" fill="black"/>
                    <rect x="25" y="8" width="1" height="1" fill="black"/>
                    <rect x="27" y="8" width="1" height="1" fill="black"/>
                    
                    <rect x="1" y="9" width="1" height="1" fill="black"/>
                    <rect x="3" y="9" width="1" height="1" fill="black"/>
                    <rect x="5" y="9" width="1" height="1" fill="black"/>
                    <rect x="9" y="9" width="1" height="1" fill="black"/>
                    <rect x="12" y="9" width="1" height="1" fill="black"/>
                    <rect x="15" y="9" width="1" height="1" fill="black"/>
                    <rect x="21" y="9" width="1" height="1" fill="black"/>
                    <rect x="24" y="9" width="1" height="1" fill="black"/>
                    <rect x="26" y="9" width="1" height="1" fill="black"/>
                    
                    <rect x="0" y="10" width="1" height="1" fill="black"/>
                    <rect x="4" y="10" width="1" height="1" fill="black"/>
                    <rect x="8" y="10" width="1" height="1" fill="black"/>
                    <rect x="11" y="10" width="1" height="1" fill="black"/>
                    <rect x="13" y="10" width="1" height="1" fill="black"/>
                    <rect x="16" y="10" width="1" height="1" fill="black"/>
                    <rect x="18" y="10" width="1" height="1" fill="black"/>
                    <rect x="20" y="10" width="1" height="1" fill="black"/>
                    <rect x="22" y="10" width="1" height="1" fill="black"/>
                    <rect x="25" y="10" width="1" height="1" fill="black"/>
                    <rect x="28" y="10" width="1" height="1" fill="black"/>
                    
                    <rect x="2" y="11" width="1" height="1" fill="black"/>
                    <rect x="5" y="11" width="1" height="1" fill="black"/>
                    <rect x="9" y="11" width="1" height="1" fill="black"/>
                    <rect x="10" y="11" width="1" height="1" fill="black"/>
                    <rect x="14" y="11" width="1" height="1" fill="black"/>
                    <rect x="17" y="11" width="1" height="1" fill="black"/>
                    <rect x="19" y="11" width="1" height="1" fill="black"/>
                    <rect x="23" y="11" width="1" height="1" fill="black"/>
                    <rect x="26" y="11" width="1" height="1" fill="black"/>
                    
                    <rect x="1" y="12" width="1" height="1" fill="black"/>
                    <rect x="3" y="12" width="1" height="1" fill="black"/>
                    <rect x="7" y="12" width="1" height="1" fill="black"/>
                    <rect x="11" y="12" width="1" height="1" fill="black"/>
                    <rect x="15" y="12" width="1" height="1" fill="black"/>
                    <rect x="18" y="12" width="1" height="1" fill="black"/>
                    <rect x="21" y="12" width="1" height="1" fill="black"/>
                    <rect x="24" y="12" width="1" height="1" fill="black"/>
                    <rect x="27" y="12" width="1" height="1" fill="black"/>
                    
                    <rect x="0" y="13" width="1" height="1" fill="black"/>
                    <rect x="4" y="13" width="1" height="1" fill="black"/>
                    <rect x="8" y="13" width="1" height="1" fill="black"/>
                    <rect x="12" y="13" width="1" height="1" fill="black"/>
                    <rect x="14" y="13" width="1" height="1" fill="black"/>
                    <rect x="16" y="13" width="1" height="1" fill="black"/>
                    <rect x="20" y="13" width="1" height="1" fill="black"/>
                    <rect x="22" y="13" width="1" height="1" fill="black"/>
                    <rect x="25" y="13" width="1" height="1" fill="black"/>
                    <rect x="28" y="13" width="1" height="1" fill="black"/>
                    
                    <rect x="2" y="14" width="1" height="1" fill="black"/>
                    <rect x="5" y="14" width="1" height="1" fill="black"/>
                    <rect x="7" y="14" width="1" height="1" fill="black"/>
                    <rect x="10" y="14" width="1" height="1" fill="black"/>
                    <rect x="13" y="14" width="1" height="1" fill="black"/>
                    <rect x="17" y="14" width="1" height="1" fill="black"/>
                    <rect x="19" y="14" width="1" height="1" fill="black"/>
                    <rect x="21" y="14" width="1" height="1" fill="black"/>
                    <rect x="24" y="14" width="1" height="1" fill="black"/>
                    <rect x="26" y="14" width="1" height="1" fill="black"/>
                    
                    <rect x="1" y="15" width="1" height="1" fill="black"/>
                    <rect x="3" y="15" width="1" height="1" fill="black"/>
                    <rect x="6" y="15" width="1" height="1" fill="black"/>
                    <rect x="9" y="15" width="1" height="1" fill="black"/>
                    <rect x="11" y="15" width="1" height="1" fill="black"/>
                    <rect x="15" y="15" width="1" height="1" fill="black"/>
                    <rect x="18" y="15" width="1" height="1" fill="black"/>
                    <rect x="20" y="15" width="1" height="1" fill="black"/>
                    <rect x="23" y="15" width="1" height="1" fill="black"/>
                    <rect x="25" y="15" width="1" height="1" fill="black"/>
                    <rect x="27" y="15" width="1" height="1" fill="black"/>
                    
                    <rect x="0" y="16" width="1" height="1" fill="black"/>
                    <rect x="4" y="16" width="1" height="1" fill="black"/>
                    <rect x="8" y="16" width="1" height="1" fill="black"/>
                    <rect x="10" y="16" width="1" height="1" fill="black"/>
                    <rect x="14" y="16" width="1" height="1" fill="black"/>
                    <rect x="17" y="16" width="1" height="1" fill="black"/>
                    <rect x="22" y="16" width="1" height="1" fill="black"/>
                    <rect x="24" y="16" width="1" height="1" fill="black"/>
                    <rect x="26" y="16" width="1" height="1" fill="black"/>
                    
                    <rect x="2" y="17" width="1" height="1" fill="black"/>
                    <rect x="5" y="17" width="1" height="1" fill="black"/>
                    <rect x="7" y="17" width="1" height="1" fill="black"/>
                    <rect x="11" y="17" width="1" height="1" fill="black"/>
                    <rect x="13" y="17" width="1" height="1" fill="black"/>
                    <rect x="16" y="17" width="1" height="1" fill="black"/>
                    <rect x="19" y="17" width="1" height="1" fill="black"/>
                    <rect x="21" y="17" width="1" height="1" fill="black"/>
                    <rect x="23" y="17" width="1" height="1" fill="black"/>
                    <rect x="25" y="17" width="1" height="1" fill="black"/>
                    <rect x="27" y="17" width="1" height="1" fill="black"/>
                    
                    <rect x="1" y="18" width="1" height="1" fill="black"/>
                    <rect x="3" y="18" width="1" height="1" fill="black"/>
                    <rect x="6" y="18" width="1" height="1" fill="black"/>
                    <rect x="9" y="18" width="1" height="1" fill="black"/>
                    <rect x="12" y="18" width="1" height="1" fill="black"/>
                    <rect x="15" y="18" width="1" height="1" fill="black"/>
                    <rect x="18" y="18" width="1" height="1" fill="black"/>
                    <rect x="20" y="18" width="1" height="1" fill="black"/>
                    <rect x="22" y="18" width="1" height="1" fill="black"/>
                    <rect x="24" y="18" width="1" height="1" fill="black"/>
                    <rect x="26" y="18" width="1" height="1" fill="black"/>
                    <rect x="28" y="18" width="1" height="1" fill="black"/>
                    
                    <rect x="0" y="19" width="1" height="1" fill="black"/>
                    <rect x="4" y="19" width="1" height="1" fill="black"/>
                    <rect x="8" y="19" width="1" height="1" fill="black"/>
                    <rect x="10" y="19" width="1" height="1" fill="black"/>
                    <rect x="14" y="19" width="1" height="1" fill="black"/>
                    <rect x="17" y="19" width="1" height="1" fill="black"/>
                    <rect x="19" y="19" width="1" height="1" fill="black"/>
                    <rect x="21" y="19" width="1" height="1" fill="black"/>
                    <rect x="23" y="19" width="1" height="1" fill="black"/>
                    <rect x="25" y="19" width="1" height="1" fill="black"/>
                    <rect x="27" y="19" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="21" width="1" height="1" fill="black"/>
                    <rect x="10" y="21" width="1" height="1" fill="black"/>
                    <rect x="12" y="21" width="1" height="1" fill="black"/>
                    <rect x="14" y="21" width="1" height="1" fill="black"/>
                    <rect x="16" y="21" width="1" height="1" fill="black"/>
                    <rect x="18" y="21" width="1" height="1" fill="black"/>
                    <rect x="20" y="21" width="1" height="1" fill="black"/>
                    <rect x="22" y="21" width="1" height="1" fill="black"/>
                    <rect x="24" y="21" width="1" height="1" fill="black"/>
                    <rect x="26" y="21" width="1" height="1" fill="black"/>
                    <rect x="28" y="21" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="22" width="1" height="1" fill="black"/>
                    <rect x="11" y="22" width="1" height="1" fill="black"/>
                    <rect x="13" y="22" width="1" height="1" fill="black"/>
                    <rect x="15" y="22" width="1" height="1" fill="black"/>
                    <rect x="17" y="22" width="1" height="1" fill="black"/>
                    <rect x="19" y="22" width="1" height="1" fill="black"/>
                    <rect x="21" y="22" width="1" height="1" fill="black"/>
                    <rect x="23" y="22" width="1" height="1" fill="black"/>
                    <rect x="25" y="22" width="1" height="1" fill="black"/>
                    <rect x="27" y="22" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="23" width="1" height="1" fill="black"/>
                    <rect x="10" y="23" width="1" height="1" fill="black"/>
                    <rect x="14" y="23" width="1" height="1" fill="black"/>
                    <rect x="16" y="23" width="1" height="1" fill="black"/>
                    <rect x="18" y="23" width="1" height="1" fill="black"/>
                    <rect x="20" y="23" width="1" height="1" fill="black"/>
                    <rect x="22" y="23" width="1" height="1" fill="black"/>
                    <rect x="24" y="23" width="1" height="1" fill="black"/>
                    <rect x="26" y="23" width="1" height="1" fill="black"/>
                    <rect x="28" y="23" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="24" width="1" height="1" fill="black"/>
                    <rect x="12" y="24" width="1" height="1" fill="black"/>
                    <rect x="15" y="24" width="1" height="1" fill="black"/>
                    <rect x="17" y="24" width="1" height="1" fill="black"/>
                    <rect x="19" y="24" width="1" height="1" fill="black"/>
                    <rect x="21" y="24" width="1" height="1" fill="black"/>
                    <rect x="23" y="24" width="1" height="1" fill="black"/>
                    <rect x="25" y="24" width="1" height="1" fill="black"/>
                    <rect x="27" y="24" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="25" width="1" height="1" fill="black"/>
                    <rect x="10" y="25" width="1" height="1" fill="black"/>
                    <rect x="13" y="25" width="1" height="1" fill="black"/>
                    <rect x="16" y="25" width="1" height="1" fill="black"/>
                    <rect x="18" y="25" width="1" height="1" fill="black"/>
                    <rect x="20" y="25" width="1" height="1" fill="black"/>
                    <rect x="22" y="25" width="1" height="1" fill="black"/>
                    <rect x="24" y="25" width="1" height="1" fill="black"/>
                    <rect x="26" y="25" width="1" height="1" fill="black"/>
                    <rect x="28" y="25" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="26" width="1" height="1" fill="black"/>
                    <rect x="11" y="26" width="1" height="1" fill="black"/>
                    <rect x="14" y="26" width="1" height="1" fill="black"/>
                    <rect x="17" y="26" width="1" height="1" fill="black"/>
                    <rect x="19" y="26" width="1" height="1" fill="black"/>
                    <rect x="21" y="26" width="1" height="1" fill="black"/>
                    <rect x="23" y="26" width="1" height="1" fill="black"/>
                    <rect x="25" y="26" width="1" height="1" fill="black"/>
                    <rect x="27" y="26" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="27" width="1" height="1" fill="black"/>
                    <rect x="10" y="27" width="1" height="1" fill="black"/>
                    <rect x="13" y="27" width="1" height="1" fill="black"/>
                    <rect x="15" y="27" width="1" height="1" fill="black"/>
                    <rect x="18" y="27" width="1" height="1" fill="black"/>
                    <rect x="20" y="27" width="1" height="1" fill="black"/>
                    <rect x="22" y="27" width="1" height="1" fill="black"/>
                    <rect x="24" y="27" width="1" height="1" fill="black"/>
                    <rect x="26" y="27" width="1" height="1" fill="black"/>
                    <rect x="28" y="27" width="1" height="1" fill="black"/>
                    
                    <rect x="8" y="28" width="1" height="1" fill="black"/>
                    <rect x="12" y="28" width="1" height="1" fill="black"/>
                    <rect x="14" y="28" width="1" height="1" fill="black"/>
                    <rect x="16" y="28" width="1" height="1" fill="black"/>
                    <rect x="19" y="28" width="1" height="1" fill="black"/>
                    <rect x="21" y="28" width="1" height="1" fill="black"/>
                    <rect x="23" y="28" width="1" height="1" fill="black"/>
                    <rect x="25" y="28" width="1" height="1" fill="black"/>
                    <rect x="27" y="28" width="1" height="1" fill="black"/>
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

            {/* Phone Mockup - Center */}
            <div className="lg:col-span-4 flex justify-center -ml-70">
              <div className="relative w-44 h-[11rem] bg-gray-900 rounded-t-[2.5rem] border-[7px] border-b-0 border-gray-800 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-xl"></div>
                <div className="bg-white h-full pt-8 px-3">
                  <div className="text-[9px] text-gray-400 mb-1.5 text-center">IntelliMate</div>
                  <div className="space-y-1">
                    <div className="h-0.5 bg-gray-200 rounded w-full"></div>
                    <div className="h-0.5 bg-gray-200 rounded w-2/3"></div>
                    <div className="mt-2 p-1.5 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-[9px] font-semibold text-blue-900 leading-tight">The new age AI that reduce headache</div>
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

            {/* Warranty Cards - Right */}
            <div className="lg:col-span-5 -ml-50">
              <div className="grid grid-cols-5 gap-3">
                {warrantyFeatures.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-md hover:bg-blue-50 transition-all duration-300 group">
                    <item.icon className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="text-center text-sm font-medium text-gray-700 leading-tight">{item.title}</h3>
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