import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SectorFormData, sectorFormSchema } from '@/types/sector-form';

export function useSectorForm() {
  const [overview, setOverview] = useState({
    setName: '5',
    sector: '',
    subsector: '',
    projectType: 'Option 2, Custom project type 1, Custom project type 2',
    projectSpecifics: 'Custom specific 1, Custom specific 2',
    eligibilityCriteria: 'unspecified',
    dataPoints: 'Custom data entry 1, Custom data entry 2',
  });

  const form = useForm<SectorFormData>({
    resolver: zodResolver(sectorFormSchema),
    defaultValues: {
      sector: '',
      customSector: '',
      subsector: '',
      customSubsector: '',
    },
  });

  const onSubmit = (data: SectorFormData) => {
    setOverview((prev) => ({
      ...prev,
      sector: data.sector === 'custom' ? data.customSector! : data.sector,
      subsector:
        data.subsector === 'custom' ? data.customSubsector! : data.subsector,
    }));
  };

  return {
    form,
    overview,
    onSubmit,
  };
}
