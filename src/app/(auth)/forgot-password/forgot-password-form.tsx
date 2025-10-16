'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema, ForgotPasswordSchemaType } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: 'dhanuraj7258@gmail.com',
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: '/reset-password',
      });

      if (error) {
        toast.error(error.message || 'Password reset failed');
        return;
      }

      toast.success(
        'If the email is registered, you will receive a reset link.'
      );
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Forgot Password?
            </h1>
            <p className="text-sm">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  <span>Resetting password...</span>
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?{' '}
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign in</Link>
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}
