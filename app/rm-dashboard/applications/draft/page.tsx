import React from 'react';

import ApplicationsTable from '@/components/all-applications-table';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold text-asset-dark">
                All Draft Application
              </h1>
              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          <ApplicationsTable />
        </div>
      </main>
    </div>
  );
}
