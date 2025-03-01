'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User2 } from 'lucide-react';

import useAuthStore from '@/store/auth-store';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function SiteHeader() {
  const { user, logOut }: any = useAuthStore();

  return (
    <header className="w-full bg-white py-6">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" height={156} width={156} />
        </Link>
        <nav className="flex items-center gap-12">
          {user && user.role === 'Admin' && (
            <Link
              href="/dashboard"
              className="text-asset-medium hover:text-asset-dark"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/features"
            className="text-asset-medium hover:text-asset-dark"
          >
            Key Features
          </Link>
          <Link
            href="/about"
            className="text-asset-medium hover:text-asset-dark"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-asset-medium hover:text-asset-dark"
          >
            Contact
          </Link>
          {user && user.role === 'Admin' ? (
            <Popover>
              <PopoverTrigger className="flex items-center gap-2">
                <User2 className="  h-6 w-6 mr-2 text-[#40495E]" />
                {user.name}
              </PopoverTrigger>
              <PopoverContent className="w-full p-4">
                <button onClick={() => logOut()}>Log out</button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/login"
              className="text-asset-medium hover:text-asset-dark"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
