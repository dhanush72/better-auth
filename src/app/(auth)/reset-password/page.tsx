import { ResetPasswordForm } from '@/app/(auth)/reset-password/reset-password-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset password',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <div className="text-red-500">Token is required</div>;
  }

  return <ResetPasswordForm token={token} />;
}
