"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10">
        {/* Form card, aligned to the left */}
        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-8 shadow-card ring-1 ring-white/10 backdrop-blur-xl sm:p-10">
          <h1 className="font-display text-3xl font-semibold leading-tight text-white sm:text-[2.15rem]">
            Welcome to{" "}
            <span className="text-aqua-glow">Neapure</span> 
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Sign in to manage your smart purification system
          </p>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="sr-only">Email or Username</span>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <MailIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  type="text"
                  placeholder="Email or Username"
                  autoComplete="username"
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
                  autoComplete="current-password"
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

            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex items-center gap-2 text-white/60">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((v) => !v)}
                  className="h-4 w-4 rounded border-white/30 bg-transparent text-aqua-brand accent-aqua-brand"
                />
                Remember Me
              </label>
              <a href="#" className="text-aqua-glow transition hover:text-white">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-aqua-brand py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-aqua-brand/30 transition hover:bg-aqua-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-glow"
            >
              SIGN IN
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-aqua-glow transition hover:text-white">
              Create One
            </a>
          </p>
        </div>
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

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
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