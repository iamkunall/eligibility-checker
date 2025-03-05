'use client';

import { useToast } from '@/hooks/use-toast';
import React from 'react';
import RegionalManagerCards from '@/components/dashboard/RegionalManagerCards';

const Page: React.FC = () => {
  return (
    <div>
      <RegionalManagerCards />
    </div>
  );
};

export default Page;
