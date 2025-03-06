'use client';

import Link from 'next/link';
import useSWR from 'swr';

import useAuthStore from '@/store/auth-store';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const fetcher = ({ url, args }: any) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ...args,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (r) => {
    return await r.json();
  });

export default function ApplicationsTable({}: any) {
  const { user }: any = useAuthStore();

  const { data } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/all-applications`,
      args: {
        userId: user && user.id,
        organization: user?.organizations[0]._id,
        branch: user?.branches[0]._id,
      },
    },
    fetcher,
  );

  console.log('all-applications', data);

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table>
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className=" py-4 text-center font-medium text-asset-dark">
                S.No
              </TableHead>
              <TableHead className=" py-4 text-center font-medium text-asset-dark">
                Id
              </TableHead>
              <TableHead className=" py-4 text-center font-medium text-asset-dark">
                Sector
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark">
                SubSector
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark">
                Project Type
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark">
                Created At
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.data &&
              data.data.map((entry: any, index: number) => {
                return (
                  <TableRow key={entry._id}>
                    <TableCell className="text-center align-top text-asset-dark">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry._id}
                    </TableCell>
                    <TableCell className="text-center w-[320px] align-top text-asset-dark">
                      {entry.sector}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry?.subSector}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry?.projectType}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      <Link href={`/rm-dashboard/application/${entry._id}`}>
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
