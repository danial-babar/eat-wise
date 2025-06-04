'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FoodItemData } from '@/models/FoodItem';

// We can keep metadata for SEO, but it won't be dynamic based on client-side state here.
// For dynamic metadata based on search, more advanced techniques would be needed.
// export const metadata: Metadata = {
// title: 'Search Food Items',
// description: 'Search for food items by name or keywords to check their safety information.',
// };

interface SearchApiResponse {
  message: string;
  data: FoodItemData[];
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItemData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false); // To track if a search has been performed

  const executeSearch = useCallback(async (queryToSearch: string) => {
    if (!queryToSearch.trim()) {
      setSearchResults([]);
      setHasSearched(true);
      setSearchQuery(queryToSearch); // Update searchQuery state even if empty for display
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchQuery(queryToSearch); // Ensure searchQuery state is updated

    try {
      const response = await fetch(`/api/food/search?q=${encodeURIComponent(queryToSearch.trim())}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Search failed');
      }
      const result: SearchApiResponse = await response.json();
      setSearchResults(result.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during search.');
      setSearchResults([]);
    }
    setIsLoading(false);
  }, []); // Empty dependency array for useCallback if it doesn't depend on external state/props that change

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeSearch(searchQuery);
  };

  // Effect to perform search if 'q' URL parameter is present on load
  const searchParams = useSearchParams();
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      // setSearchQuery(urlQuery); // Set by executeSearch
      executeSearch(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [searchParams, executeSearch]); // executeSearch is memoized with useCallback

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Search Food Items</h1>
      
      <form onSubmit={handleSearchSubmit} className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input 
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter food name (e.g., Chicken Noodles)"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* User Preference Filters will go here (e.g., Halal, Vegan, etc.) */}
      <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Filter by Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">User preference filter components will be added here.</p>
        {/* Example: Checkboxes for Halal, Vegan, Gluten-Free etc. */}
      </div>

      {/* Results Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">Results</h2>
        {isLoading && <p className="text-center text-gray-600 dark:text-gray-300">Loading results...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!isLoading && !error && hasSearched && searchResults.length === 0 && (
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow text-center">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">No food items found matching "{searchQuery}".</p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Would you like to help us expand our database?</p>
            <Link href="/submit-food" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Add New Food Item
            </Link>
          </div>
        )}
        {!isLoading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {item.imageUrl && (
                  <Link href={`/food/${item._id}`} className="block h-48 w-full relative overflow-hidden">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate" title={item.name}>{item.name}</h3>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 truncate" title={item.userNotes || ''}>
                    {item.userNotes || 'No additional notes.'}
                  </p>
                  <Link href={`/food/${item._id}`} className="mt-3 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
