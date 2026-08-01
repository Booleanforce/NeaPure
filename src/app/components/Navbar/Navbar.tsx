"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, ShoppingCart, Droplet, Menu, X, LogIn} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Smart Water Care", href: "/smart-water-care" },
  { label: "Technology", href: "/technology" },
  { label: "About Us", href: "/about-us" },
  { label: "Support", href: "/support" },
  { label: "Login", href: "/login" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 2;

  return (
    <header className="w-full bg-[#0a1628] border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0e2a4a]">
            <Droplet className="h-5 w-5 fill-sky-400 text-sky-400" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-wide">
              <span className="text-white">Nea</span>{" "}
              <span className="text-sky-400">Pure</span>
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] text-slate-400">
              PURE WATER. PURE LIFE.
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  active === link.label
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.label && (
                  <span className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-full bg-sky-400" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-600"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <a
            href="tel:09613123123"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-sky-400/60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20">
              <Phone className="h-3.5 w-3.5 text-sky-400" />
            </span>
            09613 123 123
          </a>

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-sky-400/60"
          >
            <ShoppingCart className="h-4.5 w-4.5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-sky-500 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="border-t border-white/10 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setMobileOpen(false);
                  }}
                  className={`text-sm font-medium ${
                    active === link.label ? "text-sky-400" : "text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <a
              href="tel:09613123123"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white"
            >
              <Phone className="h-3.5 w-3.5 text-sky-400" />
              09613 123 123
            </a>
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
            >
              <ShoppingCart className="h-4.5 w-4.5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-sky-500 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}