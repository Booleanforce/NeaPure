/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";

import { login } from "@/services/auth.service";

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

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const data = await login(email.trim(), password);

      console.log("LOGIN RESPONSE:", data);

      const role = data?.user?.role;

      toast.success("Sign-in Successful!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      /*
       * Redirect based on user role
       */
      if (role === "CUSTOMER") {
        router.replace("/Customer-Dashboard");
        return;
      }

      if (
        role === "ADMIN" ||
        role === "SUPER_ADMIN" ||
        role === "STAFF"
      ) {
        router.replace("/admin-dashboard");
        return;
      }

      /*
       * Fallback
       */
      router.replace("/admin-dashboard");
    } catch (err: unknown) {
      console.error("Login failed:", err);

      let message = "Unable to sign in. Please try again.";

      if (err instanceof Error && err.message) {
        message = err.message;
      }

      setError(message);

      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031b3d]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#031536] via-[#064b87] to-[#0a6fae]" />

        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10">
        <div className="w-full max-w-md rounded-3xl bg-white/[0.06] p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl sm:p-10">

          {/* Heading */}
          <h1 className="text-3xl font-semibold text-white">
            Welcome to{" "}
            <span className="text-cyan-300">
              Neapure
            </span>
          </h1>

          <p className="mt-3 text-sm text-white/60">
            Sign in to manage your smart purification system
          </p>

          {/* Form */}
          <form
            className="mt-8 space-y-6"
            onSubmit={handleLogin}
          >
            {/* Email */}
            <label className="block">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/30">
                <MailIcon className="h-5 w-5 shrink-0 text-white/40" />

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={loading}
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 transition focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/30">
                <LockIcon className="h-5 w-5 shrink-0 text-white/40" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={loading}
                  className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="text-white/40 transition hover:text-white disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-white/60">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  disabled={loading}
                  className="h-4 w-4 accent-cyan-500"
                />

                <span>Remember Me</span>
              </label>

              <button
                type="button"
                className="text-cyan-300 transition hover:text-white"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={
                loading ||
                !email.trim() ||
                !password
              }
              className="flex w-full items-center justify-center rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing In...
                </span>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-white/60">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-cyan-300 transition hover:text-white"
            >
              Create One
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function MailIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />

      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path d="m3 3 18 18" />

      <path d="M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a18.4 18.4 0 0 1-3.1 3.8" />

      <path d="M6.2 6.2C3.5 8.2 2 12 2 12s3.5 6 10 6c1.5 0 2.8-.3 4-.8" />

      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}