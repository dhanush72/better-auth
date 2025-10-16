import { getSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="bg-muted relative flex min-h-svh items-center flex-col justify-center">
      {children}
    </div>
  );
}
