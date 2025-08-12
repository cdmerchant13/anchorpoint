'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { hashPassword } from '../../../lib/auth/password';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dutyStation, setDutyStation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Send registration data to API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password: hashedPassword,
          dutyStation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login page
      router.push('/auth/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--gray-50] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-[--primary-blue] mb-6">
            AnchorPoint
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[--gray-900]">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--gray-300] placeholder-[--gray-500] text-[--gray-900] rounded-t-md focus:outline-none focus:ring-[--primary-blue] focus:border-[--primary-blue] focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--gray-300] placeholder-[--gray-500] text-[--gray-900] focus:outline-none focus:ring-[--primary-blue] focus:border-[--primary-blue] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--gray-300] placeholder-[--gray-500] text-[--gray-900] focus:outline-none focus:ring-[--primary-blue] focus:border-[--primary-blue] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="duty-station" className="sr-only">
                Duty Station (Optional)
              </label>
              <input
                id="duty-station"
                name="dutyStation"
                type="text"
                value={dutyStation}
                onChange={(e) => setDutyStation(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--gray-300] placeholder-[--gray-500] text-[--gray-900] rounded-b-md focus:outline-none focus:ring-[--primary-blue] focus:border-[--primary-blue] focus:z-10 sm:text-sm"
                placeholder="Duty Station (Optional)"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/auth/login"
                className="font-medium text-[--primary-blue] hover:text-[--secondary-blue-light]"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[--primary-blue] hover:bg-[--secondary-blue-light] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary-blue] transition-colors"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}