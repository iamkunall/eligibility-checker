import { z } from 'zod';

export const sectorFormSchema = z.object({
  sector: z.string().min(1, 'Please select a sector'),
  customSector: z.string().optional(),
  subsector: z.string().min(1, 'Please select a subsector'),
  customSubsector: z.string().optional(),
});

export type SectorFormData = z.infer<typeof sectorFormSchema>;
