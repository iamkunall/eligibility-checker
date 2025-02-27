import { create } from 'zustand';
import type { SectorFormData } from '@/types/sector-form';
import type { FrameworkEntry } from '@/types/framework-entry';

interface SectorState {
  sectors: SectorFormData[];
  activeSector: number;
  frameworkEntries: FrameworkEntry[];
  overview: {
    setName: string;
    sector: string;
    subsector: string;
    projectType: string;
    projectSpecifics: string;
    eligibilityCriteria: string;
    dataPoints: string;
  };
  addSector: (sector: SectorFormData) => void;
  updateOverview: (overview: Partial<SectorState['overview']>) => void;
  setActiveSector: (sectorNumber: number) => void;
  addFrameworkEntry: (entry: Omit<FrameworkEntry, 'id'>) => void;
  removeFrameworkEntry: (id: string) => void;
}

// Initial framework entries
const initialFrameworkEntries: FrameworkEntry[] = [];

export const useSectorStore = create<SectorState>()((set) => ({
  sectors: [],
  activeSector: 5,
  frameworkEntries: initialFrameworkEntries,
  overview: {
    setName: '5',
    sector: 'Option 2',
    subsector: 'Option 2, Custom subsector 1',
    projectType: 'Option 2, Custom project type 1, Custom project type 2',
    projectSpecifics: 'Custom specific 1, Custom specific 2',
    eligibilityCriteria: 'unspecified',
    dataPoints: 'Custom data entry 1, Custom data entry 2',
  },
  addSector: (sector) =>
    set((state) => ({
      sectors: [...state.sectors, sector],
    })),
  updateOverview: (newOverview) =>
    set((state) => ({
      overview: { ...state.overview, ...newOverview },
    })),
  setActiveSector: (sectorNumber) => set({ activeSector: sectorNumber }),
  addFrameworkEntry: (entry) =>
    set((state) => ({
      frameworkEntries: [
        ...state.frameworkEntries,
        { ...entry, id: crypto.randomUUID() },
      ],
    })),
  removeFrameworkEntry: (id) =>
    set((state) => ({
      frameworkEntries: state.frameworkEntries.filter(
        (entry) => entry.id !== id,
      ),
    })),
}));
