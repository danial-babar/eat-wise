'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // To redirect after login

// We would set metadata in a server component layout if needed, or use document.title
// export const metadata = { ... }

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // TODO: Implement actual API call to /api/auth/login
    console.log('Login attempt with:', { email, password });
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // Example API call structure (uncomment and adapt when API is ready):
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();
    //   if (!response.ok) {
    //     throw new Error(data.message || 'Login failed');
    //   }
    //   // Handle successful login (e.g., store token, redirect)
    //   console.log('Login successful:', data);
    //   // router.push('/profile'); // or to the dashboard or previous page
    // } catch (err: any) {
    //   setError(err.message);
    //   console.error('Login error:', err);
    // } finally {
    //   setIsLoading(false);
    // }

    // Placeholder logic:
    if (email === 'test@example.com' && password === 'password') {
      alert('Logged in successfully (placeholder)! Redirecting...');
      // router.push('/');
    } else {
      setError('Invalid email or password (placeholder).');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link href="/signup" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label> */}
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        {/* TODO: Add social login buttons (Google, Facebook, etc.) */}
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">Social login buttons will go here.</p>
          </div>
        </div> */}

      </div>
    </div>
  );
}
