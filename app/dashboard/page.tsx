'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect operators to their specific dashboard
    router.replace('/operator/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to operator dashboard...</p>
        </div>
      </div>
    </div>
  );
}