import React from 'react';
import { Button } from '@/components/ui/button';

export default function SectorReviewCard() {
  return (
    <div className="rounded-lg bg-gray-100 p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-asset-teal">Set Overview</span>
        <div className="space-x-2">
          <Button variant="secondary" size="sm">
            Save
          </Button>
          <Button variant="outline" size="sm">
            Discard
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-asset-dark">Set Name</h4>
          <p className="text-asset-medium">5</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Sector</h4>
          <p className="text-asset-medium">Option 2</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Subsector</h4>
          <p className="text-asset-medium">Option 2, Custom subsector 1</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Project Type</h4>
          <p className="text-asset-medium">Option 2</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Project Specifics</h4>
          <p className="text-asset-medium">Custom Specific 1</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Eligibility Criteria</h4>
          <p className="text-asset-medium">unspecified</p>
        </div>

        <div>
          <h4 className="font-medium text-asset-dark">Data Points</h4>
          <p className="text-asset-medium">Custom data entry 1</p>
        </div>
      </div>
    </div>
  );
}
