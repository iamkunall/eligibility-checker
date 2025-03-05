'use client';

import Link from 'next/link';
import Image from 'next/image';

import useAuthStore from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export function SiteHeader() {
  const { user, logOut }: any = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push('/');
  };

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
          {user && user.role ? (
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 rounded-full">
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-purple-500">
                  {user.avatar ? (
                    <Image
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-amber-500 text-white">
                      {user.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-white text-black border-zinc-800">
                <div className="p-4">
                  <div className="font-medium text-lg">Signed in as</div>
                  <div className="text-zinc-800">
                    {user.email || 'admin@admin.co'}
                  </div>
                  <div className="text-purple-400">{user.name || 'Admin'}</div>
                </div>

                <Separator className="bg-zinc-800" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors text-red-400"
                >
                  Log Out
                </button>
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
