import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/get-session';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Email Verified',
};

export default async function EmailVerifiedPage() {
  const session = await getSession();
  const user = session?.user;

  if (user?.emailVerified) redirect('/dashboard');

  return (
    <main className="flex flex-1 items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Email verified</h1>
          <p className="text-muted-foreground">
            Your email has been verified successfully.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
