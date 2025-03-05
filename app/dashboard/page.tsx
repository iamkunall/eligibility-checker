'use client';

import { useState } from 'react';
import CreateRegionalManagerForm from '@/components/forms/CreateRegionalManagerForm';
import { Sprout } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col mt-28">
      <div className="container grid gap-16 pt-20 md:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-2xl bg-asset-mint p-4">
            <Sprout className="h-8 w-8 text-asset-dark" />
          </div>
          <h1 className="text-5xl font-semibold text-asset-dark">Dashbaord</h1>
          <p className="text-asset-medium leading-relaxed">Admin</p>
        </div>

        <div className="flex flex-col items-center">
          <Link
            href="/assessment"
            className=" bg-asset-mint  shadow-lg w-7/12 text-center p-6 rounded-lg mb-2"
          >
            <h2 className="text-2xl font-semibold text-asset-dark">
              Create Framework
            </h2>
          </Link>

          <Link
            href="/assessment/saved-frameworks"
            className=" bg-asset-mint  shadow-lg w-7/12 text-center p-6 rounded-lg mb-2"
          >
            <h2 className="text-2xl font-semibold text-asset-dark">
              Review Saved Framework
            </h2>
          </Link>

          <Button
            onClick={() => setIsOpen(true)}
            className="text-2xl font-semibold text-asset-dark !bg-asset-mint  shadow-lg w-7/12 text-center p-6 rounded-lg mb-2"
          >
            Manage RM
          </Button>

          {isOpen && (
            <CreateRegionalManagerForm
              open={isOpen}
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
