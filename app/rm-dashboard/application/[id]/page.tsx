'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import useAxiosPost from '@/hooks/useAxiosPost';

const fetcher = ({ url, args }: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: args.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (r) => {
    return await r.json();
  });

export default function Page({ params }: any) {
  const { id } = params;
  const [report, setReport] = useState(false);
  const router = useRouter();

  const { data: checkEligibility, execute } =
    useAxiosPost('/check-eligibility');

  const {
    data: application = { data: null },
    isLoading,
    mutate,
  } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/application`,
      args: { id: id },
    },
    fetcher,
  );

  const { data = null }: any = application;

  useEffect(() => {
    if (checkEligibility) {
      mutate();
    }
  }, [checkEligibility]);

  useEffect(() => {
    if (data) {
      if (data.status === 'ELIGIBLE' || data.status === 'NOT ELIGIBLE') {
        setReport(true);
      }
    }
  }, [data]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container">
          <div className="flex flex-col gap-4 py-10">
            <h1 className="text-4xl font-semibold text-asset-dark">
              Application
            </h1>
            {isLoading && (
              <div className="mx-auto w-full text-center text-xl">
                <h2>Loading...</h2>
              </div>
            )}
            {data && (
              <p className="text-2l font-semibold text-asset-dark">
                Report Assessment
              </p>
            )}

            <div className="h-0.5 w-full bg-asset-teal" />
          </div>
          <div className="flex justify-between  mb-20">
            {data && (
              <div className="bg-gray-300 px-8 py-8 w-6/12 rounded-xl">
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
            {report && (
              <div className="w-5/12 ">
                <div className="bg-gray-200 px-4 pt-8 pb-20 rounded-xl">
                  <p className="text-xl font-bold">Project Status</p>
                  {data.status === 'ELIGIBLE' && (
                    <p className="ml-2 mt-2">Fully Aligned</p>
                  )}
                  {data.status === 'NOT ELIGIBLE' && (
                    <p className="ml-2 mt-2">Not Fully Aligned</p>
                  )}
                </div>

                <div className="mt-8 bg-gray-200  px-4 py-8 rounded-xl">
                  <p className="text-xl font-bold">Project Review</p>
                  {data.status === 'ELIGIBLE' && (
                    <p className="ml-2 mt-2">Fully Aligned</p>
                  )}
                  {data.status === 'NOT ELIGIBLE' && (
                    <p className="ml-2 mt-2">Not Fully Aligned</p>
                  )}
                </div>
              </div>
            )}
          </div>
          {!report && data && (
            <div className="pb-10 w-full flex justify-center">
              <Button className="w-3/12 py-4 text-xl bg-asset-teal hover:bg-asset-teal/50 text-black mx-8">
                Edit
              </Button>
              <Button
                onClick={() => execute({ applicationId: id })}
                className="w-3/12 py-4 text-xl bg-asset-mint hover:bg-asset-mint/50 text-black mx-8"
              >
                Generate Report
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
