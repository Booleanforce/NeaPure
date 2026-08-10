/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth.service";
<<<<<<< HEAD
import { toast, Bounce } from "react-toastify";
=======
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

export default function LoginPage() {
  const router = useRouter();

  /* =========================================================
     STATE
  ========================================================= */

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

<<<<<<< HEAD
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);

      console.log(data);
=======
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      /* -----------------------------------------------------
         LOGIN API
      ----------------------------------------------------- */

      const data = await login(
        email.trim(),
        password
      );

      console.log(
        "Login response:",
        data
      );

      /* -----------------------------------------------------
         GET USER ROLE

         Expected:

         {
           access: "...",
           refresh: "...",
           user: {
             id: "...",
             email: "...",
             role: "CUSTOMER"
           }
         }
      ----------------------------------------------------- */

      const role =
        data.user?.role;

      console.log(
        "Logged-in role:",
        role
      );

      /* -----------------------------------------------------
         CUSTOMER
      ----------------------------------------------------- */

      if (role === "CUSTOMER") {
        router.replace(
          "/Customer-Dashboard"
        );

        return;
      }

      /* -----------------------------------------------------
         ADMIN / SUPER ADMIN / OTHER
      ----------------------------------------------------- */

      router.replace(
        "/admin-dashboard"
      );
    } catch (err: unknown) {
      console.error(
        "Login error:",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Invalid email or password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0

      toast.success("Sign-in Successful!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.replace("/admin-dashboard");
    } catch (err: any) {
      const message = err.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="relative min-h-screen overflow-hidden">

<<<<<<< HEAD
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-8 shadow-card ring-1 ring-white/10 backdrop-blur-xl sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-white">
            Welcome to <span className="text-aqua-glow">Neapure</span>
          </h1>

          <p className="mt-3 text-sm text-white/60">
            Sign in to manage your smart purification system
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <label className="block">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <MailIcon className="h-4 w-4 text-white/40" />

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />
=======
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/login-bg.png')",
        }}
      />

      {/* =====================================================
          DARK BLUE OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-slate-950/70" />

      {/* =====================================================
          BLUE / AQUA GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[120px]" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

        {/* ===================================================
            LOGIN CARD
        =================================================== */}

        <div className="w-full max-w-md">

          <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-2xl">

            {/* =================================================
                CARD TOP ACCENT
            ================================================= */}

            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300" />

            <div className="p-7 sm:p-9">

              {/* ===============================================
                  LOGO / BRAND
              =============================================== */}

              <div className="mb-7 flex justify-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 shadow-lg shadow-cyan-500/10">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600">

                    <span className="text-xl font-bold text-white">
                      N
                    </span>

                  </div>

                </div>

>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
              </div>

              {/* ===============================================
                  TITLE
              =============================================== */}

<<<<<<< HEAD
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-white"
=======
              <div className="text-center">

                <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">

                  Welcome to{" "}

                  <span className="text-cyan-300">
                    Neapure
                  </span>

                </h1>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/55">
                  Sign in to manage your smart
                  purification system
                </p>

              </div>

              {/* ===============================================
                  FORM
              =============================================== */}

              <form
                className="mt-8 space-y-5"
                onSubmit={handleLogin}
              >

                {/* ===========================================
                    EMAIL
                =========================================== */}

                <label className="block">

                  <span className="mb-2 block text-sm font-medium text-white/70">
                    Email Address
                  </span>

                  <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 transition-all duration-200 focus-within:border-cyan-300/70 focus-within:bg-white/[0.07] focus-within:ring-2 focus-within:ring-cyan-300/10">

                    <MailIcon className="h-5 w-5 shrink-0 text-white/35 transition group-focus-within:text-cyan-300" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      required
                      disabled={loading}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                  </div>

                </label>

                {/* ===========================================
                    PASSWORD
                =========================================== */}

                <label className="block">

                  <span className="mb-2 block text-sm font-medium text-white/70">
                    Password
                  </span>

                  <div className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 transition-all duration-200 focus-within:border-cyan-300/70 focus-within:bg-white/[0.07] focus-within:ring-2 focus-within:ring-cyan-300/10">

                    <LockIcon className="h-5 w-5 shrink-0 text-white/35 transition group-focus-within:text-cyan-300" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      required
                      disabled={loading}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) =>
                            !value
                        )
                      }
                      disabled={loading}
                      className="shrink-0 text-white/35 transition hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>

                  </div>

                </label>

                {/* ===========================================
                    ERROR
                =========================================== */}

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300"
                  >
                    {error}
                  </div>
                )}

                {/* ===========================================
                    REMEMBER / FORGOT
                =========================================== */}

                <div className="flex items-center justify-between gap-4">

                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white/55">

                    <input
                      type="checkbox"
                      checked={
                        rememberMe
                      }
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                      disabled={loading}
                      className="h-4 w-4 cursor-pointer accent-cyan-400"
                    />

                    <span>
                      Remember Me
                    </span>

                  </label>

                  <button
                    type="button"
                    disabled={loading}
                    className="text-sm font-medium text-cyan-300 transition hover:text-white disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* ===========================================
                    LOGIN BUTTON
                =========================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:from-cyan-300 hover:to-blue-500 hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <span className="relative z-10">

                    {loading
                      ? "Signing In..."
                      : "SIGN IN"}

                  </span>

                </button>

              </form>

              {/* ===============================================
                  CREATE ACCOUNT
              =============================================== */}

              <p className="mt-7 text-center text-sm text-white/45">

                Don't have an account?{" "}

                <button
                  type="button"
                  className="font-medium text-cyan-300 transition hover:text-white"
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
                >
                  Create One
                </button>

              </p>

<<<<<<< HEAD
            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-cyan-500"
                />
                Remember Me
              </label>

              <button type="button" className="text-aqua-glow hover:text-white">
                Forgot Password?
              </button>
=======
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
            </div>
          </div>

<<<<<<< HEAD
            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-aqua-brand py-3 font-semibold transition hover:bg-aqua-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Don't have an account?{" "}
            <button className="text-aqua-glow hover:text-white">
              Create One
            </button>
=======
          {/* ===============================================
              FOOTER
          =============================================== */}

          <p className="mt-5 text-center text-xs text-white/30">
            © {new Date().getFullYear()} Neapure.
            All rights reserved.
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
          </p>

        </div>
      </section>
    </main>
  );
}

/* =========================================================
   MAIL ICON
========================================================= */

function MailIcon({ className }: { className?: string }) {
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
<<<<<<< HEAD
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
=======
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />

      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
    </svg>
  );
}

<<<<<<< HEAD
function LockIcon({ className }: { className?: string }) {
=======
/* =========================================================
   LOCK ICON
========================================================= */

function LockIcon({
  className,
}: {
  className?: string;
}) {
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
<<<<<<< HEAD
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 118 0v3" />
=======
      <rect
        width="18"
        height="11"
        x="3"
        y="11"
        rx="2"
      />

      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
    </svg>
  );
}

<<<<<<< HEAD
function EyeIcon({ className }: { className?: string }) {
=======
/* =========================================================
   EYE ICON
========================================================= */

function EyeIcon({
  className,
}: {
  className?: string;
}) {
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
<<<<<<< HEAD
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
=======
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />

      <circle
        cx="12"
        cy="12"
        r="3"
      />
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
    </svg>
  );
}

<<<<<<< HEAD
function EyeOffIcon({ className }: { className?: string }) {
=======
/* =========================================================
   EYE OFF ICON
========================================================= */

function EyeOffIcon({
  className,
}: {
  className?: string;
}) {
>>>>>>> 7c8818adebc156e5448b97640f07e38500c50aa0
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
