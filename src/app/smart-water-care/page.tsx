import React from 'react';
import Head from 'next/head';
import { CheckCircle, Play, ChevronRight, Smartphone, Download, Star } from 'lucide-react';
import ServiceJourney from './component/ServiceJourney';
import GenuinePartsGrid from './component/ServiceGrid';
import NeapureInfoSection from './component/InfoProvider';

export default function HomePage() {
  const features = [
    {
      title: "100% Genuine Parts",
      description: "Original Neapure Parts"
    },
    {
      title: "Text Here",
      description: "Ideas and Innovations"
    },
    {
      title: "Eco-Friendly Solutions",
      description: "Sustainable Product Designs"
    },
    {
      title: "Customizable Features",
      description: "Personalized User Experience"
    },
    {
      title: "Rapid Prototyping",
      description: "Accelerated Development Processes"
    }
  ];

  const products = Array(6).fill({
    title: "100% Genuine Pats",
    description: "Original Neapure Parts/100% tekcjalikond fjdastofdnaldskfjkadsf adslfjkoiasf sdfkjasd",
    buttonText: "Text Here"
  });

  const videos = Array(7).fill({
    title: "Product Registration",
    description: "Original Neapure Parts/100% tekcjalikond"
  });

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Neapure - Complete Care for Pure & Healthy Water</title>
      </Head>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
              <Star className="w-3 h-3 mr-1" />
              SMART WATER CARE
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              Complete Care for <br />
              <span className="text-blue-600">Pure & Healthy Water</span>
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              Advanced purification technology that removes 99.99% of impurities and delivers healthy, safe & great tasting water for
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Register Your Product
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Download App
                <Download className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Available on:</span>
              <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Smartphone className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
              <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Center Image & Phone */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative flex justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="/images/ARUA Water Purifier.svg"
                alt="Water Purifier"
                className="relative z-10 w-full max-w-sm"
              />
              <img
                src="/images/Mobile App.svg"
                alt="Mobile App"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-64 max-w-full"
              />
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-2 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-gray-500 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{product.title}</h3>
                </div>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{product.description}</p>
                <img 
                  src="/filter.svg" 
                  alt="Water Filter" 
                  className="w-full h-16 object-contain mb-4"
                />
                <button className="w-full py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                  {product.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Videos Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                See How Our <span className="text-blue-600">Service Works</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Text akdjsflakdsf ndfka</p>
            </div>
            <button className="flex items-center px-6 py-2 border-2 border-gray-300 rounded-full text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
              View All Videos
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative rounded-2xl aspect-[3/4] flex items-center justify-center overflow-hidden mb-3">
                  <img 
                    src="/images/Product Registration.svg" 
                    alt="Product Registration" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-cyan-600 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{video.title}</h3>
                    <p className="text-gray-500 text-xs">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
       <ServiceJourney/>
       <GenuinePartsGrid />
       <NeapureInfoSection />
    </div>
  );
}