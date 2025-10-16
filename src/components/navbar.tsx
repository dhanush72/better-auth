import { ThemeToggle } from '@/components/theme-toggle';
import { UserDropdown } from '@/components/user-dropdown';
import { getSession } from '@/lib/get-session';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Lock className="size-4" />
          Better Auth
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
