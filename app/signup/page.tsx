"use client"

import { SiteHeader } from "@/components/site-header"
import { User2 } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-20">
          <div className="mx-auto max-w-md">
            <div className="mb-8 flex flex-col items-center gap-6">
              <div className="rounded-2xl bg-[#dee9b5] p-4">
                <User2 className="h-8 w-8 text-[#212A3A]" />
              </div>
              <h1 className="text-4xl font-semibold text-[#212A3A]">Create Account</h1>
            </div>
            {/* Add sign up form here */}
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

