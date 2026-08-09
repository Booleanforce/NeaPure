/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  login,
} from "@/services/auth.service";

export default function LoginPage() {
  const router =
    useRouter();

  /* =====================================================
     STATE
  ===================================================== */

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    rememberMe,
    setRememberMe,
  ] = useState(false);

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      /* -------------------------------------------------
         LOGIN API
      ------------------------------------------------- */

      const data =
        await login(
          email,
          password
        );

      console.log(
        "Login response:",
        data
      );

      /* -------------------------------------------------
         GET USER ROLE
         
         LoginResponse:
         
         {
           access,
           refresh,
           user: {
             id,
             email,
             role
           }
         }
      ------------------------------------------------- */

      const role =
        data.user?.role;

      console.log(
        "Logged-in role:",
        role
      );

      /* -------------------------------------------------
         CUSTOMER
      ------------------------------------------------- */

      if (
        role === "CUSTOMER"
      ) {
        router.replace(
          "/Customer-Dashboard"
        );

        return;
      }

      /* -------------------------------------------------
         ADMIN / OTHER ROLES
      ------------------------------------------------- */

      router.replace(
        "/admin-dashboard"
      );

    } catch (err: any) {
      console.error(
        "Login error:",
        err
      );

      setError(
        err?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="absolute inset-0 bg-slate-950" />

      {/* =================================================
          LOGIN SECTION
      ================================================= */}

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10">

        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-8 shadow-card ring-1 ring-white/10 backdrop-blur-xl sm:p-10">

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 className="font-display text-3xl font-semibold text-white">

            Welcome to{" "}

            <span className="text-aqua-glow">
              Neapure
            </span>

          </h1>

          <p className="mt-3 text-sm text-white/60">
            Sign in to manage your smart
            purification system
          </p>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            className="mt-8 space-y-6"
            onSubmit={
              handleLogin
            }
          >

            {/* =============================================
                EMAIL
            ============================================= */}

            <label className="block">

              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">

                <MailIcon
                  className="h-4 w-4 text-white/40"
                />

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />

              </div>

            </label>

            {/* =============================================
                PASSWORD
            ============================================= */}

            <label className="block">

              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">

                <LockIcon
                  className="h-4 w-4 text-white/40"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="text-white/40 hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>

              </div>

            </label>

            {/* =============================================
                ERROR
            ============================================= */}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* =============================================
                REMEMBER / FORGOT
            ============================================= */}

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-white/60">

                <input
                  type="checkbox"
                  checked={
                    rememberMe
                  }
                  onChange={() =>
                    setRememberMe(
                      !rememberMe
                    )
                  }
                  className="accent-cyan-500"
                />

                Remember Me

              </label>

              <button
                type="button"
                className="text-aqua-glow hover:text-white"
              >
                Forgot Password?
              </button>

            </div>

            {/* =============================================
                SIGN IN
            ============================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-aqua-brand py-3 font-semibold transition hover:bg-aqua-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing In..."
                : "SIGN IN"}
            </button>

          </form>

          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

          <p className="mt-6 text-center text-sm text-white/60">

            Don't have an account?{" "}

            <button
              type="button"
              className="text-aqua-glow hover:text-white"
            >
              Create One
            </button>

          </p>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   MAIL ICON
========================================================= */

function MailIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />

      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* =========================================================
   LOCK ICON
========================================================= */

function LockIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="11"
        x="3"
        y="11"
        rx="2"
      />

      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* =========================================================
   EYE ICON
========================================================= */

function EyeIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />

      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
}

/* =========================================================
   EYE OFF ICON
========================================================= */

function EyeOffIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />

      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 8.27 4.18 9.5 7a13.16 13.16 0 0 1-1.67 2.68" />

      <path d="M6.61 6.61C4.25 8.2 2.73 10.53 2 12c1.23 2.82 4.5 7 10 7a9.7 9.7 0 0 0 3.39-.61" />

      <line
        x1="2"
        x2="22"
        y1="2"
        y2="22"
      />
    </svg>
  );
}