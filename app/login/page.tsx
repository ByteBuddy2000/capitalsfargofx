"use client"

import { useState } from "react"
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal"
import { ToastProvider } from "@/components/ui/Toast"
import Image from "next/image"

export default function LoginPage() {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col justify-between bg-slate-950 text-slate-100">
        <header className="p-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex cursor-pointer items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="">
                <Image
                  src="/CapitalsFargofx-logo.png"
                  width={1055}
                  height={1055}
                  alt="CapitalsFargoFX Logo"
                  className="h-20 w-20"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    CapitalsFargo<span className="text-blue-400">FX</span>
                  </span>
                </div>
                <p className="-mt-0.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                  Digital Asset Management
                </p>
              </div>
            </Link>

            {/* <Link
              href="/"
              className="invisible text-xs font-semibold text-slate-400 hover:text-white"
            >
              Back to Home
            </Link> */}
          </div>
        </header>

        <main className="flex items-center justify-center px-4 py-8">
          <LoginForm
            onSwitchToRegister={() => window.location.assign("/register")}
            onForgotPassword={() => setForgotPasswordOpen(true)}
          />
        </main>

        <footer className="p-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} CapitalsFargoFX. Institutional
          Cryptocurrency Investment Infrastructure.
        </footer>

        <ForgotPasswordModal
          isOpen={forgotPasswordOpen}
          onClose={() => setForgotPasswordOpen(false)}
        />
      </div>
    </ToastProvider>
  )
}
