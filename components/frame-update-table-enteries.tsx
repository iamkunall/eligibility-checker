'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

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

export default function FrameworkUpdateEntriesTable({ id }: any) {
  const router = useRouter();
  const { frameworkEntries, addFrameworkEntry, resetFrameworkEntries } =
    useSectorStore();
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<FrameworkEntry[]>([]);
  const { data, error, isLoading, execute }: any =
    useAxiosPost('/updateFramework');

  const { data: defaultFrameworkData } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getDefaultFramework`,
      args: { sector: 'Sustainable Water & Wastewater management' },
    },
    fetcher,
  );

  const { data: frameworkData } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/getFramework`,
      args: { id: id },
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
      const index = prev.findIndex((e) => {
        return (
          e.sector === entry.sector &&
          e.subSector === entry.subSector &&
          e.projectType === entry.projectType &&
          e.projectSpecifics === entry.projectSpecifics &&
          e.dataPoints === entry.dataPoints
        );
      });

      if (index !== -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
      return [...prev, entry];
    });
  };

  useEffect(() => {
    if (data && data._id) {
      resetFrameworkEntries();
      router.push(`/assessment/framework/${data._id}`);
    }
  }, [data]);

  useEffect(() => {
    if (defaultFrameworkData && defaultFrameworkData.length > 0) {
      resetFrameworkEntries();
      defaultFrameworkData.forEach((element: any) => {
        addFrameworkEntry(element);
      });
    }
  }, [defaultFrameworkData]);

  useEffect(() => {
    if (frameworkData && frameworkData.fields.length > 0) {
      frameworkData.fields.forEach((element: any) => {
        if (element.isCustomField) {
          addFrameworkEntry(element);
        }
      });
      setSelectedEntries(frameworkData.fields);
    }
  }, [frameworkData]);

  return (
    <div>
      <div className="rounded-md mt-20">
        <Table>
          <TableHeader className="bg-asset-mint/50">
            <TableRow>
              <TableHead className="w-[200px] py-4 text-center font-medium text-asset-dark">
                Sector
              </TableHead>
              <TableHead className="w-[100px] text-center font-medium text-asset-dark">
                Sub-Sector
              </TableHead>
              <TableHead className="w-[150px] text-center font-medium text-asset-dark">
                Project Type
              </TableHead>
              <TableHead className="w-[350px] text-center font-medium text-asset-dark">
                Project Specifics
              </TableHead>
              <TableHead className="w-[200px] text-center font-medium text-asset-dark">
                Data Points
              </TableHead>
              <TableHead className="w-[20px] bg-asset-teal text-center font-medium text-white">
                Add To Framework
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frameworkEntries.map((entry) => {
              const isSelected =
                selectedEntries.findIndex((e) => {
                  return (
                    e.sector === entry.sector &&
                    e.subSector === entry.subSector &&
                    e.projectType === entry.projectType &&
                    e.projectSpecifics === entry.projectSpecifics &&
                    e.dataPoints === entry.dataPoints
                  );
                }) !== -1;
              return (
                <TableRow
                  key={entry.id}
                  className={
                    isSelected ? 'bg-slate-200 hover:bg-slate-200' : ''
                  }
                >
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.sector}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.subSector}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.projectType}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
                    {entry.projectSpecifics}
                  </TableCell>
                  <TableCell className="text-center align-top text-asset-dark">
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
                      className="bg-asset-teal text-black"
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
              id: id,
              name: 'Kunal test',
              organization: '67bc9be92d76bae3d4c40efc',
              branch: '67bc9c452d76bae3d4c40eff',
              description: 'This is test',
              fields: selectedEntries,
            });
          }}
        >
          Save
        </Button>
      )}
    </div>
  );
}
