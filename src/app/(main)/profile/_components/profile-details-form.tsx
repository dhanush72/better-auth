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
import { UserAvatar } from '@/components/user-avatar';
import { User } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ProfileDetailsFormProps {
  user: User;
}

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  image: z.string().optional().nullable(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name ?? '',
      image: user.image ?? null,
    },
  });

  async function onSubmit({ name, image }: UpdateProfileValues) {
    startTransition(async () => {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message || 'Failed to update profile');
        return;
      }

      toast.success('Profile updated successfully');
      router.refresh();
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setValue('image', base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  }

  const imagePreview = form.watch('image');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview && (
              <div className="relative size-16">
                <UserAvatar
                  name={user.name}
                  image={imagePreview}
                  className="size-16"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={() => form.setValue('image', null)}
                  aria-label="Remove image"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  <span>Updating...</span>
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
