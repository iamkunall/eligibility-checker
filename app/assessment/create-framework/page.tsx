'use client';
import { useEffect, useState } from 'react';

import FrameWorkDetailsForm from '@/components/forms/FrameWorkDetailsForm';
import FrameWorkSectorSelectionForm from '@/components/forms/FrameWorkSectorSelectionForm';

export default function CreateFrameworkPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [frameWorkDetails, setFrameWorkDetails] = useState({});

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-20">
          <div className="mb-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold text-asset-dark">
                Create your Framework
              </h1>
              <div className="h-0.5 w-full bg-asset-teal" />
            </div>
          </div>
          {activeStep === 1 && (
            <FrameWorkDetailsForm
              handleSubmit={(data) => {
                setFrameWorkDetails(data);
                setActiveStep(2);
              }}
            />
          )}
          {activeStep === 2 && (
            <FrameWorkSectorSelectionForm details={frameWorkDetails} />
          )}
        </div>
      </main>
    </div>
  );
}
