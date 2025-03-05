'use client';

import React, { useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useRouter } from 'next/navigation';

import useAxiosPost from '@/hooks/useAxiosPost';
import useAuthStore from '@/store/auth-store';
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });
  const router = useRouter();
  const { data, error, isLoading, execute }: any = useAxiosPost('auth/login');
  const { token, user, login }: any = useAuthStore();

  const onSubmit = async (data: LoginFormValues) => {
    await execute({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.user && data.user.id) {
      // Handle successful response
      login(data);

      // Redirect based on user role
      if (data.user.role === 'Admin' || data.user.role === 'Super Admin') {
        router.push('/dashboard');
      } else if (data.user.role === 'Regional Manager') {
        router.push('/rm-dashboard');
      } else {
        router.push('/'); // Default redirection if role is unknown
      }
    }
  }, [data]);

  const rememberMe = watch('rememberMe');

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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => {
                const value = checked as boolean;
                const event = {
                  target: { name: 'rememberMe', value },
                };
                register('rememberMe').onChange(event);
              }}
              className="border-[#40495E] data-[state=checked]:bg-[#212A3A] data-[state=checked]:border-[#212A3A]"
            />
            <label htmlFor="remember" className="text-sm text-[#40495E]">
              Remember Me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#40495E] hover:text-[#212A3A]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[#212A3A] py-3 text-center text-white hover:bg-[#212A3A]/90"
        >
          LOGIN
        </button>

        <Link
          href="/signup"
          className="block w-full rounded-md bg-[#dee9b5] py-3 text-center text-[#212A3A] hover:bg-[#dee9b5]/90"
        >
          New here? Sign Up
        </Link>
      </form>
    </div>
  );
}
