import React from 'react';

import { SectorCard } from '../sector-card';

import FrameworkEntriesTable from '@/components/framework-entries-table';

export default function FrameWorkSectorSelectionForm() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4 pb-20 border-b-2 border-black">
        <SectorCard setNumber={1} />
        <SectorCard setNumber={2} />
        <SectorCard setNumber={3} />
        <SectorCard setNumber={4} />
        <SectorCard setNumber={5} isActive />
      </div>
      <FrameworkEntriesTable />
    </div>
  );
}
