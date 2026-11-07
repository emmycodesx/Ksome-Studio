"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white text-gray-200 border-b border-black/10 backdrop-blur-md">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex h-20 items-center justify-between">
        <Link
          className="flex items-center gap-3 text-black no-underline"
          href="/"
          aria-label="Ksome Studio home"
        >
          <Image
            src="/images/logo.png"
            alt="Ksome Studio logo"
            width={48}
            height={48}
            className="h-12 w-12 object-contain hover:scale-105 transition-transform"
          />
          <span className="text-lg font-semibold tracking-tight text-black">
            Ksome Studio
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          <Link
            className="text-sm text-[#888] transition-colors duration-300 hover:text-black"
            href="/"
          >
            Home
          </Link>
          <a
            className="text-sm text-[#888] transition-colors duration-300 hover:text-black"
            href="/#works"
          >
            Our Work
          </a>
          <a
            className="text-sm text-[#888] transition-colors duration-300 hover:text-black"
            href="/#about-us"
          >
            About Us
          </a>
          <Link
            className="text-sm text-[#888] transition-colors duration-300 hover:text-black"
            href="/donate"
          >
            Donate
          </Link>
          <Link
            className="text-sm text-[#888] transition-colors duration-300 hover:text-black"
            href="/portal"
          >
            Portal
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/portal"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 hover:bg-neutral-100 transition-colors"
                title={user.email || ""}
              >
                <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email
                    ? user.email.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <span className="max-w-[100px] truncate font-medium">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="inline-flex items-center gap-1 rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={14} />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-neutral-300 px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:border-black hover:text-black transition-colors"
            >
              <UserIcon size={14} />
              <span>Sign In</span>
            </Link>
          )}

          <a
            className="inline-flex items-center rounded-2xl gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm bg-black text-white transition-all duration-300 hover:bg-neutral-800"
            href="#contact"
          >
            <span>Contact</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
