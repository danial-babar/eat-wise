// 'use client'; // If client-side checks or interactions are needed immediately

import type { Metadata } from 'next';
import Link from 'next/link';

// TODO: This page should be protected and only accessible by admin users.
// This typically involves a check (server-side or client-side with a redirect)
// against the user's role.

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Manage food items, user submissions, blog posts, and users.',
  robots: { // Prevent indexing of admin pages
    index: false,
    follow: false,
  }
};

export default function AdminPage() {
  // Placeholder for admin-specific data fetching or state
  // e.g., counts of pending submissions, recent users, etc.

  // useEffect(() => {
  //   // Client-side auth check example (redirect if not admin)
  //   // const { data: session, status } = useSession();
  //   // if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
  //   //   router.push('/login?error=unauthorized');
  //   // }
  // }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">Admin Panel</h1>

      {/* TODO: Add a check: "You do not have permission to view this page." if not admin */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Managing Food Items */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Manage Food Items</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            View, edit, approve, or delete food items in the database.
          </p>
          <Link href="/admin/food-items" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Go to Food Items →
          </Link>
        </div>

        {/* Card for Managing User Submissions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">User Submissions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Review and approve or reject food items submitted by users.
          </p>
          {/* Placeholder: X pending submissions */}
          <p className="text-sm text-orange-500 dark:text-orange-400 mb-2">5 pending submissions</p> 
          <Link href="/admin/submissions" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Review Submissions →
          </Link>
        </div>

        {/* Card for Managing Blog Posts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Manage Blog Posts</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Create, edit, publish, or delete blog articles.
          </p>
          <Link href="/admin/blog-posts" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Go to Blog Posts →
          </Link>
        </div>

        {/* Card for Managing Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Manage Users</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            View user list, manage roles, and user data.
          </p>
          <Link href="/admin/users" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Go to Users →
          </Link>
        </div>

        {/* Card for Site Settings (Optional) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Site Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Configure general site settings, integrations, etc.
          </p>
          <Link href="/admin/settings" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Go to Settings →
          </Link>
        </div>
      </div>
      
      {/* Placeholder for sub-pages like /admin/food-items, /admin/users etc. */}
      {/* These would be separate pages within the /admin route group. */}
    </div>
  );
}
