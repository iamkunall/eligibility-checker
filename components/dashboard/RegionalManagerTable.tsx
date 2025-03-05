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

// ✅ Improved fetcher function
const fetcher = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default function FrameworksTable() {
  const { data = [], error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/regional-managers`,
    fetcher,
  );

  if (error) return <div className="text-red-500">Failed to load data</div>;

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table>
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className="py-4 text-center font-medium text-asset-dark">
                Id
              </TableHead>
              <TableHead className="py-4 text-center font-medium text-asset-dark">
                Name
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark">
                Organization
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark">
                Branch
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((entry: any) => (
                <TableRow key={entry._id}>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry._id}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.name}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry?.organizations
                      ?.map((org: any) => org.name)
                      .join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry?.branches
                      ?.map((branch: any) => branch.name)
                      .join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.createdAt
                      ? new Date(entry.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-asset-dark"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
