'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useAuthStore from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';

async function handleAuthRequest(
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
      email: string;
      password: string;
      organizations: string[];
      branches: string[];
    };
  },
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  if (!res.ok) throw new Error('Failed to create Regional Manager');
  return res.json();
}

export default function CreateRegionalManagerForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { user }: any = useAuthStore();

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-regional-managers`,
    handleAuthRequest,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        branches: [user.branches[0]._id],
        organizations: [user.organizations[0]._id],
      };

      await trigger(payload);

      if (window) {
        window.location.reload();
      }

      onClose();
    } catch (error) {
      console.error('Failed to create Regional Manager:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create Regional Manager. Please try again later.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-1/2">
        <DialogHeader>
          <DialogTitle>Create Regional Manager</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Full Name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>

          {/* Email Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>

          {/* Password Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="col-span-3"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            className="bg-asset-teal text-black hover:bg-asset-teal"
            type="submit"
            disabled={isMutating}
          >
            {isMutating ? 'Creating Manager...' : 'Create Manager'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
