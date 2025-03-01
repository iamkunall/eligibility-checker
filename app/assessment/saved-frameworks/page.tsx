import React from 'react';

import FrameworksTable from '@/components/all-frameworks-table';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold text-asset-dark">
                All Frameworks
              </h1>
              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          <FrameworksTable />
        </div>
      </main>
    </div>
  );
}
