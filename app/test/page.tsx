'use client';

import { useToast } from '@/hooks/use-toast';
import React from 'react';

const Page: React.FC = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: 'Hello World',
      description: 'This toast will disappear after 10 seconds',
      duration: 10000,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default Page;
