'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function resendVerificationEmail() {
    startTransition(async () => {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: '/email-verified',
      });

      if (error) {
        toast.error(error.message || 'Failed to resend verification email');
        return;
      }

      toast.success('Verification email resent successfully');
    });
  }

  return (
    <div className="space-y-4">
      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
        onClick={resendVerificationEmail}
      >
        {isPending ? (
          <>
            <Spinner />
            <span>Resending...</span>
          </>
        ) : (
          'Resend verification email'
        )}
      </Button>
    </div>
  );
}
