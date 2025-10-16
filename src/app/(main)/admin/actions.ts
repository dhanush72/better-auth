'use server';

import { getSession } from '@/lib/get-session';
import { forbidden, unauthorized } from 'next/navigation';

export async function deleteAccount() {
  const session = await getSession();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.role !== 'admin') forbidden();
}
