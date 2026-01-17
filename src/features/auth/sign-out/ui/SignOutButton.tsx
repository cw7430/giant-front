'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from 'react-bootstrap';
import { signOutAction } from '../actions';
import { useAuthStore } from '@/entities/auth/store';

export default function SignOutButton() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { signOut } = useAuthStore();

  const onClick = async () => {
    setLoading(true);
    try {
      await signOutAction();
    } finally {
      signOut();
      router.replace('/sign-in');
    }
  };

  return (
    <Button
      variant="outline-light"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {'로그아웃'}
    </Button>
  );
}
