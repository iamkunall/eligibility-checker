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

export default function FrameworksTable() {
  const { user }: any = useAuthStore();

  const { data } = useSWR(
    {
      url: 'http://localhost:8080/api/getFrameworkByUserId',
      args: { userId: user.id },
    },
    fetcher,
  );

  console.log(data);

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table>
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className=" py-4 text-center font-medium text-asset-dark">
                Id
              </TableHead>
              <TableHead className=" py-4 text-center font-medium text-asset-dark">
                Name
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark">
                Organization
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark">
                Branch
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
              data.map((entry: any) => {
                return (
                  <TableRow key={entry._id}>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry._id}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry.name}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry?.organization?.name}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {entry?.branch?.name ? entry?.branch?.name : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark">
                      <Link href={`/assessment/framework/${entry._id}`}>
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
