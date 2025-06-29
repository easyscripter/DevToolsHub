'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.WORKSPACES);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Dev Tools Hub</h1>
        <p className="text-muted-foreground">Redirecting to workspaces...</p>
      </div>
    </div>
  );
}
