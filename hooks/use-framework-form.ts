import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FrameworkFormData, frameworkSchema } from '@/types/framework';
import { useFrameworkStore } from '@/store/framework-store';

export function useFrameworkForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addFramework = useFrameworkStore((state) => state.addFramework);

  const form = useForm<FrameworkFormData>({
    resolver: zodResolver(frameworkSchema),
    defaultValues: {
      name: '',
      company: '',
      remarks: '',
    },
  });

  async function onSubmit(data: FrameworkFormData) {
    try {
      setIsSubmitting(true);
      addFramework(data);
    } catch (error) {
      console.error('Error submitting framework:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
