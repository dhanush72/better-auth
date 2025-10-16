import { EmailForm } from '@/app/(main)/profile/_components/email-form';
import { PasswordForm } from '@/app/(main)/profile/_components/password-form';
import { ProfileDetailsForm } from '@/app/(main)/profile/_components/profile-details-form';
import { getSession } from '@/lib/get-session';
import type { Metadata } from 'next';
import { unauthorized } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) return unauthorized();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-muted-foreground">
            Update your account details, email, and password.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProfileDetailsForm user={user} />
          </div>
          <div className="flex-1 space-y-6">
            <EmailForm currentEmail={user.email} />
            <PasswordForm />
            {/* <LogoutEverywhereButton /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
