"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, User2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container grid gap-16 py-20 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <div className="rounded-2xl bg-[#dee9b5] p-4">
              <User2 className="h-8 w-8 text-[#212A3A]" />
            </div>
            <h1 className="text-5xl font-semibold text-[#212A3A]">Login/Sign Up</h1>
            <p className="text-2xl font-light text-[#7bd2d3]">Admin</p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ace5ea] to-[#dee9b5] p-8">
            <div className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#40495E]" />
                <input
                  type="email"
                  placeholder="email/username"
                  className="w-full rounded-md border-0 bg-white/80 py-3 pl-10 pr-4 text-[#212A3A] placeholder:text-[#40495E] focus:outline-none focus:ring-2 focus:ring-[#7bd2d3]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#40495E]" />
                <input
                  type="password"
                  placeholder="password"
                  className="w-full rounded-md border-0 bg-white/80 py-3 pl-10 pr-4 text-[#212A3A] placeholder:text-[#40495E] focus:outline-none focus:ring-2 focus:ring-[#7bd2d3]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-[#40495E] data-[state=checked]:bg-[#212A3A] data-[state=checked]:border-[#212A3A]"
                  />
                  <label htmlFor="remember" className="text-sm text-[#40495E]">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#40495E] hover:text-[#212A3A]">
                  Forgot Password?
                </Link>
              </div>

              <button className="w-full rounded-md bg-[#212A3A] py-3 text-center text-white hover:bg-[#212A3A]/90">
                LOGIN
              </button>

              <Link
                href="/signup"
                className="block w-full rounded-md bg-[#dee9b5] py-3 text-center text-[#212A3A] hover:bg-[#dee9b5]/90"
              >
                New here? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#212A3A] py-12">
        <div className="container">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ansh_project-fDYoV3eNTV1VCC9oiu5qoHiT5FyjY1.png"
            alt="AssetAlign"
            className="h-8 brightness-0 invert"
          />
        </div>
      </footer>
    </div>
  )
}

