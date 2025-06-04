import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4 dark:bg-gray-900">
      {/* Adjust min-h if your navbar/footer height is different */}
      <h1 className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-3">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or perhaps you mistyped the URL.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
      >
        Go Back to Homepage
      </Link>
      <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
        <p>If you believe this is an error, please <Link href="/contact" className="underline hover:text-green-500">contact us</Link>.</p>
        {/* We don't have a contact page yet, but this is a good placeholder */}
      </div>
    </div>
  );
}
