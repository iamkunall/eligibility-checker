'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/auth-store';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useSectorStore } from '@/store/use-sector-store';
import type { FrameworkEntry } from '@/types/framework-entry';

import useAxiosPost from '@/hooks/useAxiosPost';

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

export default function FrameworkEntriesTable({ details }: any) {
  const router = useRouter();
  const { frameworkEntries, addFrameworkEntry } = useSectorStore();
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<FrameworkEntry[]>([]);
  const { data, error, isLoading, execute }: any =
    useAxiosPost('/createFramework');

  const { user }: any = useAuthStore();

  const { data: frameworkData } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getDefaultFramework`,
      args: { sector: 'Sustainable Water & Wastewater management' },
    },
    fetcher,
  );

  const [newEntry, setNewEntry] = useState<Omit<FrameworkEntry, 'id'>>({
    sector: 'Sustainable Water & Wastewater Management',
    subSector: '',
    projectType: '',
    projectSpecifics: '',
    dataPoints: '',
    isCustomField: true,
  });

  const handleAddEntry = () => {
    addFrameworkEntry(newEntry);
    setNewEntry({
      sector: 'Sustainable Water & Wastewater Management',
      subSector: '',
      projectType: '',
      projectSpecifics: '',
      dataPoints: '',
      isCustomField: true,
    });
    setIsAddingEntry(false);
  };

  const handleSelectedEntry = (entry: FrameworkEntry) => {
    setSelectedEntries((prev) => {
      if (prev.includes(entry)) {
        return prev.filter((e) => e !== entry);
      }
      return [...prev, entry];
    });
  };

  useEffect(() => {
    if (data && data.success && data.id) {
      router.push(`/assessment/framework/${data.id}`);
    }
  }, [data]);

  useEffect(() => {
    if (frameworkData && frameworkData.length > 0) {
      frameworkData.forEach((element: any) => {
        addFrameworkEntry(element);
      });
    }
  }, [frameworkData]);

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table className="border">
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className="w-[200px] py-4 text-center font-medium text-asset-dark border">
                Sector
              </TableHead>
              <TableHead className="w-[100px] text-center font-medium text-asset-dark border">
                Sub-Sector
              </TableHead>
              <TableHead className="w-[150px] text-center font-medium text-asset-dark border">
                Project Type
              </TableHead>
              <TableHead className="w-[350px] text-center font-medium text-asset-dark border">
                Project Specifics
              </TableHead>
              <TableHead className="w-[200px] text-center font-medium text-asset-dark border">
                Data Points
              </TableHead>
              <TableHead className="w-[20px] bg-asset-teal text-center font-medium text-white border">
                Add To Framework
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frameworkEntries.map((entry) => {
              const isSelected = selectedEntries.includes(entry);
              return (
                <TableRow
                  key={entry.id}
                  className={
                    isSelected ? 'bg-slate-200 hover:bg-slate-200' : ''
                  }
                >
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry.sector}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry.subSector}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry.projectType}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry.projectSpecifics}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark border">
                    {entry.dataPoints}
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectedEntry(entry)}
                      className="h-6 w-6 border-slate-400"
                      id={entry.id}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="bg-gray-100">
              <TableCell className="text-center align-top text-asset-dark">
                Sustainable Water & Wastewater Management
              </TableCell>
              <TableCell className="text-center">
                <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-asset-teal">
                      Add Custom Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-full w-1/2">
                    <DialogHeader>
                      <DialogTitle>Add Custom Entry</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Sector</label>
                        <Input
                          value={newEntry.sector}
                          onChange={(e) =>
                            setNewEntry({ ...newEntry, sector: e.target.value })
                          }
                          className="col-span-3"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Sub-Sector</label>
                        <Input
                          value={newEntry.subSector}
                          onChange={(e) =>
                            setNewEntry({
                              ...newEntry,
                              subSector: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Project Type</label>
                        <Input
                          value={newEntry.projectType}
                          onChange={(e) =>
                            setNewEntry({
                              ...newEntry,
                              projectType: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Project Specifics</label>
                        <Input
                          value={newEntry.projectSpecifics}
                          onChange={(e) =>
                            setNewEntry({
                              ...newEntry,
                              projectSpecifics: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Data Points</label>
                        <Input
                          value={newEntry.dataPoints}
                          onChange={(e) =>
                            setNewEntry({
                              ...newEntry,
                              dataPoints: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button
                      className="bg-asset-teal text-black hover:bg-asset-teal"
                      onClick={handleAddEntry}
                    >
                      Add Entry
                    </Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell colSpan={2}></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <Button
          className="w-3/12 mt-8"
          onClick={() => {
            execute({
              name: details.name,
              user: user?.id,
              organization:
                user && user.organizations[0] && user.organizations[0]._id,
              branch:
                user?.branches && user.branches[0] && user.branches[0]._id,
              description: details.description,
              fields: selectedEntries,
            });
          }}
        >
          Create FrameWork
        </Button>
      )}
    </div>
  );
}
