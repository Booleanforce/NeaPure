"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Sparkles,
  MessageCircle,
  Phone,
  Calendar,
  ChevronRight,
  Heart,
  Droplet,
} from "lucide-react";

import AIChatPanel from "./AIChatPanel";

// TODO: Confirm with the team if this is the correct WhatsApp number
const WHATSAPP_NUMBER = "8801611588445";
// TODO: Confirm with the team if this is the correct phone number (formatted as "096 1234 123")
const PHONE_NUMBER = "096 1234 123";

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<"menu" | "chat">("menu");
  const widgetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Click-outside-to-close behavior
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLiveChat = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  const handleCallUs = () => {
    // Strip spaces for the tel link
    window.open(`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`);
  };

  const handleBookService = () => {
    setIsOpen(false);
    router.push("/book-service");
  };

  const handleAskAI = () => {
    setActiveView("chat");
  };

  const resetViewAndClose = () => {
    setIsOpen(false);
    // Reset view to menu after animation completes
    setTimeout(() => setActiveView("menu"), 300);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6" ref={widgetRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-32px)] max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-[360px]"
          >
            {activeView === "menu" ? (
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between bg-white p-6 pb-2 text-gray-900">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue">
                        <Droplet className="h-3.5 w-3.5 fill-white text-white" />
                      </span>
                      <h3 className="text-lg font-bold">Hi! Welcome to NeaPure</h3>
                    </div>
                    <p className="text-sm text-gray-500">How can we help you today?</p>
                  </div>
                  <button
                    onClick={resetViewAndClose}
                    className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Close widget"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-1 p-3 pt-4">
                  <button
                    onClick={handleAskAI}
                    className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Ask AI Assistant</div>
                        <div className="text-xs text-gray-500">Get answers instantly</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-400" />
                  </button>

                  <button
                    onClick={handleLiveChat}
                    className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Live Chat</div>
                        <div className="text-xs text-gray-500">Talk to our expert</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-400" />
                  </button>

                  <button
                    onClick={handleCallUs}
                    className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Call Us</div>
                        <div className="text-xs text-gray-500">{PHONE_NUMBER}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-400" />
                  </button>

                  <button
                    onClick={handleBookService}
                    className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Book Service</div>
                        <div className="text-xs text-gray-500">Schedule a service</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-400" />
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1 border-t border-gray-100 py-3 text-xs text-gray-400">
                  <span>We&apos;re here for you</span>
                  <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                </div>
              </div>
            ) : (
              <AIChatPanel onBack={() => setActiveView("menu")} onClose={resetViewAndClose} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close support widget" : "Open support widget"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
