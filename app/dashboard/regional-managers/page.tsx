'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import CreateRegionalManagerForm from '@/components/forms/CreateRegionalManagerForm';

import RegionalManagerTable from '../../../components/dashboard/RegionalManagerTable';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold text-asset-dark">
                All Reginal Managers
              </h1>
              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-asset-mint hover:bg-asset-mint/50 text-black"
              onClick={() => setIsOpen(true)}
            >
              Add Regional Manager
            </Button>
          </div>
          <RegionalManagerTable />
        </div>
      </main>
      {isOpen && (
        <CreateRegionalManagerForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
