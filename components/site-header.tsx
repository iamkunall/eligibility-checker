import Link from 'next/link';
import Image from 'next/image';

export function SiteHeader() {
  return (
    <header className="w-full bg-white py-6">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" height={156} width={156} />
        </Link>
        <nav className="flex items-center gap-12">
          <Link
            href="/assessment"
            className="text-asset-medium hover:text-asset-dark"
          >
            Start Assessment
          </Link>
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
          <Link
            href="/login"
            className="text-asset-medium hover:text-asset-dark"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
