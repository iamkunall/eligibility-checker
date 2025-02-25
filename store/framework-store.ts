import { create } from 'zustand';
import type { FrameworkFormData } from '@/types/framework';

interface FrameworkState {
  frameworks: FrameworkFormData[];
  addFramework: (framework: FrameworkFormData) => void;
}

export const useFrameworkStore = create<FrameworkState>((set) => ({
  frameworks: [],
  addFramework: (framework) =>
    set((state) => ({
      frameworks: [...state.frameworks, framework],
    })),
}));
