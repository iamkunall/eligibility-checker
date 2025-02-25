import { User2 } from 'lucide-react';

import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container grid gap-16 py-20 md:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <div className="rounded-2xl bg-[#dee9b5] p-4">
              <User2 className="h-8 w-8 text-[#212A3A]" />
            </div>
            <h1 className="text-5xl font-semibold text-[#212A3A]">
              Login/Sign Up
            </h1>
            <p className="text-2xl font-light text-[#7bd2d3]">Admin</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
