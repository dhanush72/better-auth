'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteAccount } from './actions';
import { Spinner } from '@/components/ui/spinner';

export function DeleteApplication() {
  const [isPending, startTransition] = useTransition();

  async function handleDeleteApplication() {
    startTransition(async () => {
      try {
        await deleteAccount();
        toast.success('Application deletion authorized successfully');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    });
  }

  return (
    <div className="max-w-md">
      <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
        <div className="space-y-3">
          <div>
            <h2 className="text-destructive font-medium">Delete Application</h2>
            <p className="text-muted-foreground text-sm">
              This action will delete the entire application. This cannot be
              undone.
            </p>
          </div>

          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            disabled={isPending}
            onClick={handleDeleteApplication}
          >
            {isPending ? (
              <>
                <Spinner />
                <span>Deleting...</span>
              </>
            ) : (
              'Delete Account'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
