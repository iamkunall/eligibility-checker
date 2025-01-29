import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';

import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <SiteHeader />
          {children}
          <footer className="bg-[#212A3A] py-12">
            <div className="container">
              <Image src="/footer.png" alt="logo" height={156} width={156} />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
