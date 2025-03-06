'use client';

import React, { useEffect, useState } from 'react';

import FrameworksTable from '@/components/all-frameworks-table';
import ApplicationForm from '@/components/forms/ApplicationForm';

import useAxiosPost from '@/hooks/useAxiosPost';
import useAuthStore from '@/store/auth-store';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user }: any = useAuthStore();
  const router = useRouter();

  const [selectedFrameWork, setSelectedFrameWork] = useState(undefined);

  const {
    data: resData,
    error,
    isLoading,
    execute,
  }: any = useAxiosPost('/create-application');

  useEffect(() => {
    if (resData) {
      router.push(`/rm-dashboard/application/${resData.id}`);
    }
  }, [resData]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          {isLoading && (
            <div className="mx-auto">
              <h1 className="text-xl">Loading...</h1>
            </div>
          )}
          {!isLoading && (
            <>
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
              {selectedFrameWork && (
                <ApplicationForm
                  id={selectedFrameWork}
                  createDraft={async (data: any) => {
                    await execute({
                      ...data,
                      user: user.id,
                      branch: user?.branches[0]?._id,
                      organization: user?.organizations[0]?._id,
                    });
                  }}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
