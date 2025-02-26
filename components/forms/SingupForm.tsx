'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Lock, Check, User2, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import useAxiosPost from '@/hooks/useAxiosPost';
import useAuthStore from '@/store/auth-store';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Please select a role'),
  organization: z.string().min(1, 'Please select an organization'),
  branch: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Regional Manager',
    label: 'Regional Manager',
  },
];

const organizations = [
  {
    value: '343243434324',
    label: 'Organization A',
    branches: [
      {
        value: '4324324324321',
        label: 'Organization A Branch 1',
      },
      {
        value: '4324324324322',
        label: 'Organization A Branch B',
      },
      {
        value: '4324324324323',
        label: 'Organization A Branch C',
      },
    ],
  },
  {
    value: '432432432432',
    label: 'Organization B',
    branches: [
      {
        value: '4324324324321',
        label: 'Organization B Branch 1',
      },
      {
        value: '4324324324322',
        label: 'Organization B Branch B',
      },
      {
        value: '4324324324323',
        label: 'Organization B Branch C',
      },
    ],
  },
];

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const { data, error, isLoading, execute }: any =
    useAxiosPost('auth/register');

  const { token, user, login }: any = useAuthStore();

  const [roleDropDownOpen, setRoleDropDownOpen] = useState(false);
  const [role, setRole] = useState('');

  const [organizationsDropDownOpen, setOrganizationsDropDownOpen] =
    useState(false);
  const [organization, setOrganization] = useState('');

  const [branches, setBranches] = useState<any>([]);
  const [branchesDropDownOpen, setBranchesDropDownOpen] = useState(false);
  const [branch, setBranch] = useState<any>('');

  const onSubmit = async (data: RegisterFormValues) => {
    await execute({
      email: data.email,
      password: data.password,
      role,
      organization,
      branch,
    });
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // Handle successful response
      console.log('data', data);
      login(data);
    }
  }, [data]);

  useEffect(() => {
    if (organization) {
      const organizationData: any = organizations.find(
        (item) => item.value === organization,
      );
      if (organizationData) {
        setBranches(organizationData.branches);
      }
    }
  }, [organization]);

  console.log('errors', errors);

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#ace5ea] to-[#dee9b5] p-8 mx-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <div className="flex items-center">
            <Mail className="absolute  h-6 w-6  text-[#40495E]" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full  border-0  py-4 pl-8 pr-4 text-[#212A3A] placeholder:text-[#40495E] focus:outline-none focus:ring-none focus:ring-[#40495E] bg-transparent border-b-2 border-[#40495E]"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center">
            <Lock className="absolute h-6 w-6  text-[#40495E]" />
            <input
              type="password"
              placeholder="Enter your Password"
              {...register('password')}
              className="w-full  border-0  py-4 pl-8 pr-3 text-[#212A3A] placeholder:text-[#40495E] focus:outline-none focus:ring-none focus:ring-[#40495E] bg-transparent border-b-2 border-[#40495E]"
            />
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pb-2">
          <Popover open={roleDropDownOpen} onOpenChange={setRoleDropDownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="role"
                aria-expanded={roleDropDownOpen}
                className="flex justify-start text-[#212A3A] text-md font-light font-sans border-0 border-b-2 border-[#40495E] rounded-none hover:bg-transparent hover:text-[#212A3A] w-full px-2 bg-transparent"
              >
                <User2 className="size-fit text-[#40495E]" />
                {role
                  ? roles.find((item) => item.value === role)?.label
                  : 'Select Role'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {roles.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setRole(currentValue === role ? '' : currentValue);
                          setRoleDropDownOpen(false);
                          setValue('role', currentValue);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            role === item.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.role && (
            <p className="mt-2 text-sm text-red-500">Role is required</p>
          )}
        </div>

        <div className="pb-2">
          <Popover
            open={organizationsDropDownOpen}
            onOpenChange={setOrganizationsDropDownOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="organization"
                aria-expanded={organizationsDropDownOpen}
                className="flex justify-start text-[#212A3A] text-md font-light font-sans border-0 border-b-2 border-[#40495E] rounded-none hover:bg-transparent hover:text-[#212A3A] w-full px-2 bg-transparent"
              >
                <Building className="size-fit text-[#40495E]" />
                {organization
                  ? organizations.find((item) => item.value === organization)
                      ?.label
                  : 'Select Organization'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {organizations.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          setOrganization(
                            currentValue === organization ? '' : currentValue,
                          );
                          setOrganizationsDropDownOpen(false);
                          setValue('organization', currentValue);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            organization === item.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.organization && (
            <p className="mt-2 text-sm text-red-500">
              Organization is required
            </p>
          )}
        </div>

        <div className="pb-2">
          <Popover
            open={branchesDropDownOpen}
            onOpenChange={setBranchesDropDownOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="branch"
                aria-expanded={branchesDropDownOpen}
                className="flex justify-start text-[#212A3A] text-md font-light font-sans border-0 border-b-2 border-[#40495E] rounded-none hover:bg-transparent hover:text-[#212A3A] w-full px-2 bg-transparent"
              >
                <Building className="size-fit text-[#40495E]" />
                {branch
                  ? branches.find((item: any) => item.value === branch)?.label
                  : 'Select Branch'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {branches.map((item: any) => {
                      return (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue) => {
                            setBranch(
                              currentValue === branch ? '' : currentValue,
                            );
                            setBranchesDropDownOpen(false);
                            setValue('branch', currentValue);
                          }}
                        >
                          {item.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              branch === item.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[#212A3A] py-3 text-center text-white hover:bg-[#212A3A]/90"
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
