'use client';

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
const fetcher = async ({ url, args }: any) => {
  const obj: any = {};

  if (args?.organization) {
    obj.organization = args.organization;
  }

  if (args?.branch) {
    obj.branch = args.branch;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...obj,
      }),
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
  const { user }: any = useAuthStore();

  const { data = [], error } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/regional-managers`,
      args: { organization: user?.organizations[0], branch: user?.branches[0] },
    },
    fetcher,
  );

  if (error) return <div className="text-red-500">Failed to load data</div>;

  return (
    <div>
      <div className="rounded-md mt-8">
        <Table className="border">
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className="py-4 text-center font-medium text-asset-dark border">
                S.No
              </TableHead>
              <TableHead className="py-4 text-center font-medium text-asset-dark border">
                Id
              </TableHead>
              <TableHead className="py-4 text-center font-medium text-asset-dark border">
                Name
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark border">
                Organization
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark border">
                Branch
              </TableHead>
              <TableHead className="text-center font-medium text-asset-dark border">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((entry: any, index: number) => (
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
                    {entry?.organizations
                      ?.map((org: any) => org.name)
                      .join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry?.branches
                      ?.map((branch: any) => branch.name)
                      .join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
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
