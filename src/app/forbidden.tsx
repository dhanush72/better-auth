import { Button } from '@/components/ui/button';
import { BanIcon } from 'lucide-react';
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <main className="flex grow items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="flex items-center flex-col space-y-2">
          <BanIcon size="size-12 text-destructive" />
          <h1 className="text-2xl font-semibold">403 - Forbidden</h1>
          <p className="text-muted-foreground">
            You don&apos;t have access to this page.
          </p>
        </div>
        <div>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
