/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { toast, Bounce } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);

      console.log(data);

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
    <main className="relative min-h-screen overflow-hidden bg-aqua-navy text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/login2.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-aqua-navy/60" />
      </div>

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
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-aqua-glow focus-within:ring-2 focus-within:ring-aqua-glow/30">
                <LockIcon className="h-4 w-4 text-white/40" />

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
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

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
            </div>

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
          </p>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Icons ---------------- */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 118 0v3" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={className}
    >
      <path d="M3 3l18 18" />
      <path d="M2 12s3.5 6.5 10 6.5c1.8 0 3.5-.4 5-1.2M22 12s-3.5-6.5-10-6.5c-1.3 0-2.5.2-3.7.7" />
    </svg>
  );
}
