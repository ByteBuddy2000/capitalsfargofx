"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Home, Search, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-6 text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <Image
            src="/404.gif"
            alt="404 Illustration"
            width={300}
            height={200}
            className="mx-auto"
          />

          <h1 className="hidden text-7xl font-extrabold tracking-tight text-blue-600">
            404
          </h1>
          <p className="text-foreground text-xl font-semibold">
            Page not found
          </p>
          {/* Error Description */}
          <p className="mb-8 text-lg text-slate-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or deleted.
          </p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <p className="text-muted-foreground flex items-center text-sm">
            <Search className="h-3 w-3" />

            <span className="ml-2">
              Try searching for what you are looking for or go back to the
              homepage.
            </span>
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white hover:from-blue-700 hover:to-cyan-700 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <Button
              onClick={() => window.history.back()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white hover:from-blue-700 hover:to-cyan-700 sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
        {/* Helpful Links */}
        <div className="mt-12 space-y-2 text-sm text-slate-500">
          <p>Need help? Contact us at support@CapitalsFargo.com</p>
        </div>
      </div>
    </div>
  )
}
