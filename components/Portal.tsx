
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Clapperboard,
  LockKeyhole,
} from "lucide-react";
import Link from "next/link"

export default function AdminLogin() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);

  const isSignIn = activeTab === "signin";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect backend authentication here
    console.log("Authentication submitted");
  };

  return (
    <main className="min-h-screen bg-[#050505] p-3 text-white">

      <div className="grid min-h-[calc(100vh-24px)] grid-cols-1 lg:grid-cols-2">

        {/* LEFT IMAGE SECTION */}
        <section
          className="relative hidden overflow-hidden rounded-[24px] bg-cover bg-center lg:flex"
          style={{
            backgroundImage: `
              linear-gradient(
                to top,
                rgba(0,0,0,0.9),
                rgba(0,0,0,0.15)
              ),
              url('/film-set.jpg')
            `,
          }}
        >
          <div className="relative z-10 flex min-h-full w-full flex-col justify-between p-10 xl:p-14">

            {/* Badge */}
            <div className="flex w-fit items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-[10px] tracking-[2px] text-white/80">
                PRODUCTION MANAGEMENT
              </span>
            </div>

            {/* Main text */}
            <div className="mb-6 max-w-xl">
              <p className="mb-6 text-xs tracking-[4px] text-white/60">
                BEHIND EVERY GREAT STORY
              </p>

              <h1 className="text-5xl font-medium leading-[1.15] tracking-[-2px] xl:text-7xl">
                Every story
                <br />
                deserves a
                <br />
                <span className="text-white/50">great vision.</span>
              </h1>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
                Your creative workspace for managing productions,
                projects, teams and everything behind the camera.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between border-t border-white/20 pt-5 text-[10px] tracking-[2px] text-white/60">
              <span>FILM PRODUCTION STUDIO</span>
              <span>EST. 2026</span>
            </div>

          </div>
        </section>

        {/* RIGHT LOGIN SECTION */}
        <section className="flex min-h-[calc(100vh-24px)] flex-col px-5 py-6 sm:px-10 lg:px-12 xl:px-20">

          {/* Navigation */}
          <nav className="flex items-center justify-between">

            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5">
                <Clapperboard size={19} />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                FILM<span className="font-normal text-white/50">HOUSE</span>
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to website
            </Link>

          </nav>

          {/* Form */}
          <div className="my-auto w-full max-w-[460px] self-center py-16">

            {/* Tabs */}
            <div className="mb-10 grid grid-cols-2 rounded-full border border-white/10 bg-[#101010] p-1">

              <button
                onClick={() => setActiveTab("signin")}
                className={`rounded-full py-3 text-xs transition-all ${
                  isSignIn
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Sign in
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`rounded-full py-3 text-xs transition-all ${
                  !isSignIn
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Create account
              </button>

            </div>

            {/* Heading */}
            <div className="mb-9">

              <div className="mb-4 flex items-center gap-2 text-[10px] tracking-[2px] text-white/40">
                <LockKeyhole size={13} />
                ADMINISTRATOR ACCESS
              </div>

              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {isSignIn ? "Welcome back." : "Create account."}
              </h2>

              <p className="mt-3 text-sm text-white/40">
                {isSignIn
                  ? "Sign in to access your production workspace."
                  : "Set up your administrator account."}
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {!isSignIn && (
                <div>
                  <label className="mb-2 block text-xs text-white/60">
                    Full name
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    required
                    className="h-13 w-full rounded-xl border border-white/10 bg-[#101010] px-4 text-sm outline-none transition placeholder:text-white/20 focus:border-white/50"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs text-white/60">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="admin@filmhouse.com"
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-[#101010] px-4 text-sm outline-none transition placeholder:text-white/20 focus:border-white/50"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs text-white/60">
                    Password
                  </label>

                  {isSignIn && (
                    <a
                      href="/forgot-password"
                      className="text-xs text-white/40 hover:text-white"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="h-13 w-full rounded-xl border border-white/10 bg-[#101010] px-4 pr-12 text-sm outline-none transition placeholder:text-white/20 focus:border-white/50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              {!isSignIn && (
                <div>
                  <label className="mb-2 block text-xs text-white/60">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="h-13 w-full rounded-xl border border-white/10 bg-[#101010] px-4 text-sm outline-none transition placeholder:text-white/20 focus:border-white/50"
                  />
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/85"
              >
                {isSignIn ? "Access dashboard" : "Create account"}
                <ArrowRight size={17} />
              </button>

            </form>

            {/* Bottom */}
            <div className="mt-8 flex justify-center gap-1.5 text-xs text-white/40">
              <span>
                {isSignIn
                  ? "New to the workspace?"
                  : "Already have an account?"}
              </span>

              <button
                onClick={() =>
                  setActiveTab(isSignIn ? "signup" : "signin")
                }
                className="text-white underline underline-offset-4"
              >
                {isSignIn ? "Create account" : "Sign in"}
              </button>
            </div>

            {/* Security */}
            <div className="mt-14 flex items-center justify-center gap-2 text-[9px] tracking-[2px] text-white/30">
              <LockKeyhole size={12} />
              SECURE ADMINISTRATOR PORTAL
            </div>

          </div>

          {/* Footer */}
          <footer className="pb-3 text-center text-[10px] text-white/30">
            © 2026 FilmHouse Productions. All rights reserved.
          </footer>

        </section>

      </div>
    </main>
  );
}
