"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  MessageCircle, 
  MessageSquare, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  Truck,
  CreditCard,
  Shield,
  Wrench,
  Package
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  hasImage?: boolean;
}

const faqData: FAQItem[] = [
  {
    question: "How often should filters be replaced?",
    answer: "It depends on usage and water quality. Typically, sediment and carbon filters last 6 months, while RO membrane lasts 12-18 months. Our app reminds you before it's due.",
    category: "Most Asked",
    hasImage: true
  },
  {
    question: "Is installation really free?",
    answer: "Yes! We provide free professional installation for all our water purifiers. Our trained technicians will set up your system at no extra cost.",
    category: "Most Asked"
  },
  {
    question: "Do all products include a warranty?",
    answer: "Yes, all our products come with manufacturer warranty. Standard warranty is 1 year, with extended warranty options available for purchase.",
    category: "Most Asked"
  },
  {
    question: "Do you provide installation?",
    answer: "Absolutely! We provide free professional installation by certified technicians. They will also show you how to use and maintain your system.",
    category: "Installation"
  },
  {
    question: "Can I order replacement filters online?",
    answer: "Yes! You can easily order replacement filters through our website or mobile app. We also offer subscription plans for automatic deliveries.",
    category: "Most Asked"
  },
  {
    question: "Do you deliver outside Dhaka?",
    answer: "Yes, we deliver nationwide across Bangladesh. Delivery times vary by location - Dhaka: 1-2 days, Outside Dhaka: 3-5 business days.",
    category: "Most Asked"
  },
  {
    question: "Do you service all cities?",
    answer: "We provide installation and after-sales service in all major cities across Bangladesh. Check our service coverage page for details.",
    category: "Most Asked"
  }
];

const categories = [
  { name: 'Most Asked', icon: Star },
  { name: 'Installation', icon: Wrench },
  { name: 'Maintenance', icon: Package },
  { name: 'Warranty', icon: Shield },
  { name: 'Delivery & Order', icon: Truck },
  { name: 'Payment & Other', icon: CreditCard }
];

export default function AskQuestion() {
  const [activeCategory, setActiveCategory] = useState('Most Asked');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'Most Asked' 
      ? faq.category === 'Most Asked' 
      : faq.category === activeCategory || faq.category === 'Most Asked';
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === '' || matchesSearch);
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">Help Center</p>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Have Question? <span className="text-blue-600">We Have Answers</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-lg">
            Everything you need to know about Neapure water purifiers.
          </p>
        </div>

        {/* Search + Category Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-shadow duration-200 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-2xl p-5 text-white sticky top-8">
              <div className="mb-4">
                <h3 className="text-base font-bold">Most Asked Questions</h3>
                <p className="text-xs text-gray-400 mt-1">Top questions from our customers.</p>
              </div>
              
              {/* Customer Care Agent */}
              <div className="relative mb-4">
                <img
                  src="/customer-care.svg"
                  alt="Customer care support agent"
                  className="w-full object-contain max-h-98"
                />
              </div>

              {/* Live Chat Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-3 mb-2 flex items-center gap-3 transition-colors duration-200">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Live Chat</div>
                  <div className="text-xs text-blue-200">We reply in seconds</div>
                </div>
              </button>

              {/* WhatsApp Button */}
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl p-3 mb-4 flex items-center gap-3 transition-colors duration-200">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">WhatsApp Us</div>
                  <div className="text-xs text-emerald-200">Quick response</div>
                </div>
              </button>

              {/* Support Info */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Still need help?</p>
                <p className="text-sm text-gray-400 mb-3">Our support team is available 24/7</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Avg. Response <strong className="text-white">1 Min</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-3">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? 'ring-2 ring-blue-600/20 shadow-lg shadow-blue-600/5'
                      : 'border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {faq.category === 'Most Asked' && (
                        <Star className="w-4 h-4 text-blue-600 fill-blue-600 flex-shrink-0" />
                      )}
                      <span className={`font-medium ${isOpen ? 'text-blue-600' : 'text-gray-900'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 transition-colors duration-200 ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-start gap-6">
                          <div className="flex-1">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            {faq.category === 'Most Asked' && faq.hasImage && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium mt-3">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
                                Verified Solution
                              </span>
                            )}
                          </div>
                          {faq.hasImage && (
                            <div className="hidden sm:block w-48 h-24 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
                              <div className="flex gap-2">
                                <div className="w-8 h-16 bg-blue-200 rounded"></div>
                                <div className="w-8 h-16 bg-blue-300 rounded"></div>
                                <div className="w-8 h-16 bg-blue-200 rounded"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}

            {/* Submit Question */}
            <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Still couldn&apos;t find what you need?</h3>
                    <p className="text-sm text-gray-500">Submit your query to our customer success team.</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors flex-shrink-0">
                  Submit a Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}