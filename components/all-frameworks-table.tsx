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

export default function FrameworksTable({
  createApplication,
  handleCreateApplication,
}: any) {
  const { user }: any = useAuthStore();

  const { data } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getFrameworkByUserId`,
      args: {
        userId: user && user.id,
        organization: user?.organizations[0]._id,
        branch: user?.branches[0]._id,
      },
    },
    fetcher,
  );

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table className="border">
          <TableHeader className="bg-asset-mint/50">
            <TableRow className="border">
              <TableHead className=" py-4 text-center font-medium text-asset-dark border">
                S.No
              </TableHead>
              <TableHead className=" py-4 text-center font-medium text-asset-dark border">
                Id
              </TableHead>
              <TableHead className=" py-4 text-center font-medium text-asset-dark border">
                Name
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark border">
                Organization
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark border">
                Branch
              </TableHead>
              <TableHead className=" text-center font-medium text-asset-dark border">
                Created At
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark border">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((entry: any, index: number) => {
                return (
                  <TableRow key={entry._id}>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {entry._id}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {entry.name}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {entry?.organization?.name}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {entry?.branch?.name ? entry?.branch?.name : 'N/A'}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center align-top text-asset-dark border">
                      {!createApplication && (
                        <Link href={`/assessment/framework/${entry._id}`}>
                          View
                        </Link>
                      )}
                      {createApplication && (
                        <Button
                          onClick={() => {
                            handleCreateApplication(entry._id);
                          }}
                          className="bg-asset-mint hover:bg-asset-mint/50 p-2 text-black"
                        >
                          Create Application
                        </Button>
                      )}
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
