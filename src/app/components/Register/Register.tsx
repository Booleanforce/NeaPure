"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-aqua-navy text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/login2.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-aqua-navy/60" /> {/* dark overlay so text stays readable */}
      </div>

      {/* Top nav */}

      {/* Content */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-16 pt-6 sm:px-10 lg:flex-row lg:items-stretch lg:gap-10 lg:pt-10">
        {/* Left: form card */}
        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-8 shadow-card ring-1 ring-white/10 backdrop-blur-xl sm:p-10">
          <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-[2.15rem]">
            Join{" "}
            <span className="text-aqua-glow">Neapure</span>
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Create an account to set up your smart purification system
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="sr-only">Full Name</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <UserIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <MailIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Phone Number</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <PhoneIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Location</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <MapPinIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type="text"
                  placeholder="Location (City, Country)"
                  autoComplete="address-level2"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <LockIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="shrink-0 text-white/40 transition hover:text-white/70"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="sr-only">Confirm Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <LockIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none [color-scheme:dark] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-pressed={showConfirmPassword}
                  className="shrink-0 text-white/40 transition hover:text-white/70"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <label className="flex items-start gap-2 pt-1 text-sm text-white/60">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms((v) => !v)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent text-aqua-brand accent-aqua-brand"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-aqua-glow transition hover:text-white">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-aqua-glow transition hover:text-white">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreeTerms}
              className="mt-2 w-full rounded-xl bg-aqua-brand py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-aqua-brand/30 transition hover:bg-aqua-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-aqua-brand"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <a href="#" className="font-medium text-aqua-glow transition hover:text-white">
              Sign In
            </a>
          </p>
        </div>

        {/* Right: product showcase */}
      </section>
    </main>
  );
}

/* --- Inline icon components (no external dependency) --- */

function DropletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5s7 7.2 7 12a7 7 0 1 1-14 0c0-4.8 7-12 7-12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        d="M6.5 3.5h2.3l1.2 4-1.6 1.6a11 11 0 0 0 5 5l1.6-1.6 4 1.2v2.3c0 1.1-.9 2-2 2C9.5 18 5 13.5 4.5 5.5c0-1.1.9-2 2-2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.6 5.7A10.7 10.7 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a15.3 15.3 0 0 1-4.1 4.6M6.5 7.3C3.9 8.9 2 12 2 12s3.6 6.5 10 6.5c1.4 0 2.6-.3 3.7-.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 10.2a2.6 2.6 0 0 0 3.6 3.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}