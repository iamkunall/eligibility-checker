import React, { useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSectorForm } from '@/hooks/use-sector-form';

import { SectorCard } from '../sector-card';
import SectorReviewCard from '../sector-review-card';

export default function FrameWorkSectorSelectionForm() {
  const { form, overview, onSubmit } = useSectorForm();
  const [showCustomSector, setShowCustomSector] = useState(false);
  const [showCustomSubsector, setShowCustomSubsector] = useState(false);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4 pb-20 border-b-2 border-black">
        <SectorCard setNumber={1} />
        <SectorCard setNumber={2} />
        <SectorCard setNumber={3} />
        <SectorCard setNumber={4} />
        <SectorCard setNumber={5} isActive />
      </div>
      <div className="grid gap-8 lg:grid-cols-2 mt-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-asset-dark">Set 5</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                  What is your Sector?
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('sector', value);
                    setShowCustomSector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="sector-1" />
                    <Label htmlFor="sector-1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="sector-2" />
                    <Label htmlFor="sector-2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="sector-3" />
                    <Label htmlFor="sector-3">Option 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="sector-custom" />
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSector && 'opacity-50'
                      }`}
                      disabled={!showCustomSector}
                      {...form.register('customSector')}
                    />
                  </div>
                </RadioGroup>
              </div>

              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                  What is your Sub Sector?
                  <span className="ml-2 text-sm text-asset-medium">
                    (multiple values are accepted)
                  </span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('subsector', value);
                    setShowCustomSubsector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="subsector-1" />
                    <Label htmlFor="subsector-1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="subsector-2" />
                    <Label htmlFor="subsector-2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="subsector-3" />
                    <Label htmlFor="subsector-3">Option 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom subsector 1"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pl-6">
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                    />
                  </div>
                </RadioGroup>
              </div>

              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                  What is your Project Type?
                  <span className="ml-2 text-sm text-asset-medium">
                    (multiple values are accepted)
                  </span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('subsector', value);
                    setShowCustomSubsector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="subsector-1" />
                    <Label htmlFor="subsector-1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="subsector-2" />
                    <Label htmlFor="subsector-2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="subsector-3" />
                    <Label htmlFor="subsector-3">Option 3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 1"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 2"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pl-6">
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                    />
                  </div>
                </RadioGroup>
              </div>
              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                  Add your Project Specifics{' '}
                  <span className="ml-2 text-sm text-asset-medium">
                    (multiple values are accepted)
                  </span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('subsector', value);
                    setShowCustomSubsector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 1"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 2"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pl-6">
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                    />
                  </div>
                </RadioGroup>
              </div>
              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                  Add your eligibility criteria to be reviewed by sustainability
                  specialist
                  <span className="ml-2 text-sm text-asset-medium">
                    (multiple values are accepted)
                  </span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('subsector', value);
                    setShowCustomSubsector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 1"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 2"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pl-6">
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                    />
                  </div>
                </RadioGroup>
              </div>
              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-lg font-medium text-asset-dark">
                   Data points to be captured by relationship team
                  <span className="ml-2 text-sm text-asset-medium">
                    (multiple values are accepted)
                  </span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => {
                    form.setValue('subsector', value);
                    setShowCustomSubsector(value === 'custom');
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 1"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="subsector-custom" />
                    <Input
                      placeholder="Custom Project type 2"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                      {...form.register('customSubsector')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pl-6">
                    <Input
                      placeholder="Fill Details here"
                      className={`border-asset-light-blue ${
                        !showCustomSubsector && 'opacity-50'
                      }`}
                      disabled={!showCustomSubsector}
                    />
                  </div>
                </RadioGroup>
              </div>
              <Button
                variant="outline"
                className="bg-asset-mint hover:bg-asset-mint/90"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Add to Set
              </Button>
            </div>

            <div className="space-y-10">
              <Button
                variant="outline"
                className="bg-asset-light-blue hover:bg-asset-light-blue/90 w-5/12"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Save Progress
              </Button>

              <Button
                variant="outline"
                className="bg-asset-light-blue hover:bg-asset-light-blue/90 w-5/12"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                Submit and Continue
              </Button>
            </div>
          </div>
        </div>
        <SectorReviewCard />
      </div>
    </div>
  );
}
