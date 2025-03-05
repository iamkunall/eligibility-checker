'use client';
//TODO: This is a common file for all providers which you will add in future like toast themeProvider etc
import * as React from 'react';

import { ToastProvider } from '@/components/ui/toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export function AllProviders({ children }: ProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
