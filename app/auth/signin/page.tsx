'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'tourist' | 'operator'>('tourist');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock authentication for demo
      if ((email === 'tourist@demo.com' && password === 'demo123') ||
          (email === 'operator@demo.com' && password === 'demo123')) {

        // Store user in localStorage for demo
        const user = {
          name: role === 'tourist' ? 'Demo Tourist' : 'Demo Operator',
          role: role,
          email: email
        };
        localStorage.setItem('demo_user', JSON.stringify(user));

        // Redirect based on role
        if (role === 'operator') {
          router.push('/operator/dashboard');
        } else {
          router.push('/discover');
        }
      } else {
        setError('Invalid credentials. Use tourist@demo.com or operator@demo.com with password: demo123');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Sign in to Beyond Booking
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your tourism experience platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="tourist"
                    checked={role === 'tourist'}
                    onChange={(e) => setRole(e.target.value as 'tourist')}
                    className="mr-2"
                  />
                  Tourist
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="operator"
                    checked={role === 'operator'}
                    onChange={(e) => setRole(e.target.value as 'operator')}
                    className="mr-2"
                  />
                  Tourism Operator
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo accounts: tourist@demo.com / operator@demo.com (password: demo123)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}