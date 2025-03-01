'use client';

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function FrameWorkTable({ id }: any) {
  const { data: frameworkData, isLoading } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getFramework`,
      args: { id: id },
    },
    fetcher,
  );

  return (
    <div>
      {isLoading && (
        <p className="mb-8 text-center text-asset-dark text-2xl font-semibold">
          Loading Framework...
        </p>
      )}
      {!isLoading && (
        <div>
          <Table>
            <TableHeader className="bg-asset-mint/50">
              <TableRow>
                <TableHead className="w-[200px] py-4 text-center font-medium text-asset-dark border-2 border-slate-300">
                  Sector
                </TableHead>
                <TableHead className="w-[150px] text-center font-medium text-asset-dark border-2 border-slate-300">
                  Sub-Sector
                </TableHead>
                <TableHead className="w-[200px] text-center font-medium text-asset-dark border-2 border-slate-300">
                  Project Type
                </TableHead>
                <TableHead className="w-[200px] text-center font-medium text-asset-dark border-2 border-slate-300">
                  Project Specifics
                </TableHead>
                <TableHead className="w-[200px] text-center font-medium text-asset-dark border-2 border-slate-300">
                  Data Points
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frameworkData &&
                frameworkData.fields.map((entry: any) => {
                  return (
                    <TableRow
                      key={entry.id}
                      className={'bg-slate-200 hover:bg-slate-200'}
                    >
                      <TableCell className="text-center align-top text-asset-dark border-2 border-slate-300">
                        {entry.sector}
                      </TableCell>
                      <TableCell className="text-center align-top text-asset-dark border-2 border-slate-300">
                        {entry.subSector}
                      </TableCell>
                      <TableCell className="text-center align-top text-asset-dark border-2 border-slate-300">
                        {entry.projectType}
                      </TableCell>
                      <TableCell className="text-center align-top text-asset-dark border-2 border-slate-300">
                        {entry.projectSpecifics}
                      </TableCell>
                      <TableCell className="text-center align-top text-asset-dark border-2 border-slate-300">
                        {entry.dataPoints}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="flex mt-24 justify-around w-8/12 mx-auto">
            <Link
              href="/"
              className="w-4/12 rounded-md bg-[#212A3A] py-3 text-center text-white hover:bg-[#212A3A]/90"
            >
              Go Back to Home
            </Link>
            <Link
              href={`/assessment/update-framework/${id}`}
              className="w-4/12 rounded-md bg-[#dee9b5] py-3 text-center text-[#212A3A] hover:bg-[#dee9b5]/90"
            >
              Edit Framework
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
