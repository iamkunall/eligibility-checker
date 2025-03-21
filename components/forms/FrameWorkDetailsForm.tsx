import React from 'react';
import { useFrameworkForm } from '@/hooks/use-framework-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function FrameWorkDetailsForm({
  handleSubmit,
}: {
  handleSubmit: (data: any) => void;
}) {
  const { form, isSubmitting, onSubmit } = useFrameworkForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: any) => {
          onSubmit(data);
          handleSubmit(data);
        })}
        className="max-w-2xl"
      >
        <h2 className="mb-8 text-2xl font-medium text-asset-teal">
          Framework Details
        </h2>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-asset-dark">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fill Details here"
                    className="border-asset-light-blue bg-white px-4 py-2 text-asset-dark placeholder:text-asset-medium/50 focus:border-asset-teal focus:ring-asset-teal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-asset-dark">
                  Company
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fill Details here"
                    className="border-asset-light-blue bg-white px-4 py-2 text-asset-dark placeholder:text-asset-medium/50 focus:border-asset-teal focus:ring-asset-teal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-asset-dark">
                  Remarks
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fill Details here"
                    className="border-asset-light-blue bg-white px-4 py-2 text-asset-dark placeholder:text-asset-medium/50 focus:border-asset-teal focus:ring-asset-teal"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-40 bg-asset-mint text-asset-dark hover:bg-asset-mint/90"
          >
            {isSubmitting ? 'Submitting...' : 'Get Started'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
