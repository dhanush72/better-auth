import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      <Navbar />
      {children}
    </div>
  );
}
