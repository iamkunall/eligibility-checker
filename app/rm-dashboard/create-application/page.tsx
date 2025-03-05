'use client';

import React, { useState } from 'react';

import FrameworksTable from '@/components/all-frameworks-table';
import ApplicationForm from '@/components/forms/ApplicationForm';

export default function Page() {
  const [selectedFrameWork, setSelectedFrameWork] = useState(undefined);
  const [data, setData] = useState<any>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              {!selectedFrameWork && (
                <h1 className="text-4xl font-semibold text-asset-dark">
                  Create Application
                </h1>
              )}

              {selectedFrameWork && (
                <h1 className="text-4xl font-semibold text-asset-dark">
                  Enter Project Details
                </h1>
              )}

              {data && (
                <p className="text-2l font-semibold text-asset-dark">
                  Report Assessment
                </p>
              )}

              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          {!selectedFrameWork && (
            <FrameworksTable
              createApplication
              handleCreateApplication={(id: any) => {
                setSelectedFrameWork(id);
              }}
            />
          )}

          {selectedFrameWork && !data && (
            <ApplicationForm
              id={selectedFrameWork}
              createDraft={(data: any) => {
                setData(data);
              }}
            />
          )}
          {data && (
            <div className="bg-asset-teal/50 px-8 py-8">
              <div>
                <p className="text-xl font-bold">1. Sector</p>
                <p className="ml-2 mt-2">{data.sector}</p>
              </div>
              <div className="mt-6">
                <p className="text-xl font-bold">2. SubSector</p>
                <p className="ml-2 mt-2">{data.subSector}</p>
              </div>

              <div className="mt-6">
                <p className="text-xl font-bold">3. Project Type</p>
                <p className="ml-2 mt-2">{data.projectType}</p>
              </div>
              <div className="mt-6">
                <p className="text-xl font-bold">4. Project Specific</p>
                <p className="ml-2 mt-2">{data.projectSpecific}</p>
              </div>
              {data.dataPoints.map((item: any, index: number) => (
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    <span className="mr-1">{index + 5}. </span>
                    {item.ques}
                  </p>
                  <p className="ml-2 mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
