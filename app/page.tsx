'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (session) {
      window.location.href = 'https://chat.lumiaai.ru';
    } else {
      router.push('/login');
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold mb-4">Loading...</div>
      </div>
    </div>
  );
} 