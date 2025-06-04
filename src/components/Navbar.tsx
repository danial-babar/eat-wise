'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  // For now, a simple theme toggle state. We can expand this later with context.
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd also save this to localStorage and update a class on the <html> or <body> tag.
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
          Can I Eat This?
        </Link>
        {/* Desktop Menu & Theme Toggle/Mobile Button Container */}
        <div className="flex items-center">
          {/* Desktop Menu Links (hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/search" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Search</Link>
            <Link href="/scan" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Scan Barcode</Link>
            <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
            <Link href="/submit-food" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Submit Food</Link>
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            {/* TODO: Add Profile/Logout link if user is authenticated */}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Mobile Menu Button (visible on small screens) */}
          <div className="md:hidden ml-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Home</Link>
          <Link href="/search" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Search</Link>
          <Link href="/scan" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Scan Barcode</Link>
          <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Blog</Link>
          <Link href="/submit-food" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Submit Food</Link>
          <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400">Login</Link>
          {/* TODO: Mobile Profile/Logout */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
