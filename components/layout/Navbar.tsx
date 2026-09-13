"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import Logo from "../Logo/Logo";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const currentPage = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems: { label: string; route: string }[] = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "How It Works", route: "/how-it-works" },
    { label: "Investment Plans", route: "/investment-plans" },
    { label: "Assets", route: "/fiat-assets" },
    { label: "FAQ", route: "/faq" },
    { label: "Contact", route: "/contact" },
  ];

  const handleLinkClick = (route: string) => {
    setMobileMenuOpen(false);

    router.push(route);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAuth = (route: "/login" | "/register") => {
    setMobileMenuOpen(false);
    router.push(route);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled
          ? "border-b border-slate-800/80 bg-slate-950/90 py-3.5 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-linear-to-b from-slate-950/80 to-transparent py-5"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Brand Logo                                                       */}
        {/* ---------------------------------------------------------------- */}
        <Logo />
        <button
          id="nav-logo-btn"
          onClick={() => handleLinkClick("/")}
          className="group hidden cursor-pointer items-center gap-2.5 text-left focus:outline-none"
          aria-label="CapitalsFargoFX Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
            <span className="font-bold text-base tracking-tight">CF</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">
                CapitalsFargo
                <span className="text-emerald-400">FX</span>
              </span>
            </div>

            <p className="-mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Digital Asset Management
            </p>
          </div>
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Navigation                                               */}
        {/* ---------------------------------------------------------------- */}

        <nav
          id="desktop-navigation"
          aria-label="Main navigation"
          className="hidden items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-md lg:flex"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.route;

            return (
              <button
                key={item.route}
                id={`nav-link-${item.route.replace("/", "") || "home"}`}
                onClick={() => handleLinkClick(item.route)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${isActive
                    ? "bg-slate-800/80 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Right Actions                                            */}
        {/* ---------------------------------------------------------------- */}

        <div className="hidden items-center gap-3 sm:flex">
          {/* Platform Operational Status */}

          {/* <div
            id="platform-status-indicator"
            className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-2.5 py-1 text-xs font-medium text-emerald-400 xl:flex"
            title="Consensus and vault processing nodes functioning normally"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span>Platform Operational</span>
          </div> */}

          <div className="hidden lg:flex items-center gap-2">
            {/* Login */}

            <button
              id="nav-signin-btn"
              onClick={() => handleAuth("/login")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <span>Login</span>
            </button>

            {/* Create Account */}

            <button
              id="nav-create-account-btn"
              onClick={() => handleAuth("/register")}
              className="group flex cursor-pointer items-center gap-1.5 rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span>Sign Up</span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Menu Toggle                                                */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex items-center gap-2 lg:hidden">
          <div className="hidden items-center gap-2">
            {/* Login */}

            <button
              id="nav-signin-btn"
              onClick={() => handleAuth("/login")}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              <span>Login</span>
            </button>

            {/* Create Account */}

            <button
              id="nav-create-account-btn"
              onClick={() => handleAuth("/register")}
              className="group flex cursor-pointer items-center gap-1.5 rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span>Sign Up</span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 transition-colors hover:text-white"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Drawer Menu                                                 */}
      {/* ------------------------------------------------------------------ */}

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-b border-slate-800 bg-slate-950 px-4 pb-6 pt-3 shadow-2xl lg:hidden"
        >
          <div className="mx-auto max-w-7xl">
            {/* Mobile Navigation Links */}

            <div className="mb-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.route;

                return (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>

                    <ChevronRight
                      className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-600"
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Mobile Status */}

            {/* <div className="mb-4 hidden items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/40 px-3 py-2.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span>Platform Operational · Live Nodes</span>
            </div> */}

            {/* Mobile Authentication */}

            <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-4">
              <button
                id="mobile-signin-btn"
                onClick={() => handleAuth("/login")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
              >
                <Lock className="h-4 w-4 text-slate-400" />
                <span>Login</span>
              </button>

              <button
                id="mobile-register-btn"
                onClick={() => handleAuth("/register")}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-emerald-700"
              >
                <span>Register</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mobile Trust Statement */}

            <div className="pt-4 text-center text-[10px] font-medium uppercase tracking-wider text-slate-600">
              Audited Multi-Asset Settlement Engine
            </div>
          </div>
        </div>
      )}
    </header>
  );
};