import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted relative flex min-h-svh items-center flex-col justify-center">
      {children}
    </div>
  );
}
