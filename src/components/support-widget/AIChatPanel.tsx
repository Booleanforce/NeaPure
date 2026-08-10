"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, X, Send, Sparkles } from "lucide-react";
import { aiAssistantService } from "@/services/aiAssistant.service";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface AIChatPanelProps {
  onBack: () => void;
  onClose: () => void;
}

export default function AIChatPanel({ onBack, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi there! I'm your AI assistant. How can I help you today?",
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText("");
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await aiAssistantService.sendChatMessage(userText);
      
      // Save session id to persist conversation
      if (response && response.session_id) {
        aiAssistantService.setSessionId(response.session_id);
      }

      // Add assistant response
      const assistantMsg: Message = { 
        id: Date.now().toString(), 
        role: "assistant", 
        text: response.reply || "I'm not sure how to respond to that." 
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      // Graceful failure fallback
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: "assistant",
        text: "Sorry, I'm having trouble connecting right now. Please try Live Chat or Call Us for immediate help.",
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[450px] flex-col bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between bg-brand-navy p-4 text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full text-blue-100 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Back to menu"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <div>
            <h3 className="flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-brand-orange-light" />
              AI Assistant
            </h3>
            <div className="flex items-center gap-1 text-[10px] text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Online
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/20"
          aria-label="Close widget"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-brand-blue text-white"
                    : "rounded-bl-sm bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5 shadow-sm">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-3">
        <form
          onSubmit={handleSend}
          className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue/30"
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
            className="max-h-[120px] min-h-[40px] w-full resize-none bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50 scrollbar-hide"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="mb-1 mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-100"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-2 text-center text-[10px] text-gray-400">
          Powered by NeaPure AI
        </div>
      </div>
    </div>
  );
}
