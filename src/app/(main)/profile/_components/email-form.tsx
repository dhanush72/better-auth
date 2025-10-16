'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export const updateEmailSchema = z.object({
  newEmail: z.email({ message: 'Enter a valid email' }),
});

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: currentEmail,
    },
  });

  async function onSubmit({ newEmail }: UpdateEmailValues) {
    startTransition(async () => {
      const { error } = await authClient.changeEmail({
        newEmail,
        callbackURL: '/email-verified',
      });

      if (error) {
        toast.error(error.message || 'Failed to change email');
        return;
      }

      toast.success('Verification email sent to your new email address');
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="new@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  <span>Updating...</span>
                </>
              ) : (
                'Update Email'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
