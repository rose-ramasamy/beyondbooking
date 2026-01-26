'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check for user in localStorage
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Mock user for demo
      const mockUser = {
        name: 'Demo User',
        role: 'tourist',
        email: 'demo@example.com'
      };
      setUser(mockUser);
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('demo_user');
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/simple-bb-logo.svg"
                alt="Beyond Booking"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/discover" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Discover
            </Link>
            <Link href="/discover#experiences" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Experiences
            </Link>
            {mounted && user?.role === 'operator' && (
              <Link href="/operator/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
            )}
            {mounted && user?.role === 'tourist' && (
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                My Profile
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {!mounted ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 !text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}