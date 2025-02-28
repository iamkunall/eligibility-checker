import React from 'react';

import { SectorCard } from '../sector-card';

import FrameworkEntriesTable from '@/components/framework-entries-table';

export default function FrameWorkSectorSelectionForm({ details }: any) {
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-3 pb-20 border-b-2 border-black">
        <SectorCard setNumber={1} isActive />
      </div>
      <FrameworkEntriesTable details={details} />
    </div>
  );
}
