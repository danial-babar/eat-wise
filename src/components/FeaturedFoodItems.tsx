'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FoodItemData } from '@/models/FoodItem'; // Use the client-safe FoodItemData interface

interface ApiResponse {
  message: string;
  data: FoodItemData[]; // Use FoodItemData here
}

export default function FeaturedFoodItems() {
  const [foodItems, setFoodItems] = useState<FoodItemData[]>([]); // Use FoodItemData here
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/food');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch food items');
        }
        const result: ApiResponse = await response.json();
        setFoodItems(result.data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching food items:', err);
      }
      setIsLoading(false);
    };

    fetchFoodItems();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading featured food items...</p>
        {/* Optional: Add a spinner animation */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600 dark:text-gray-400">No featured food items available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Featured Food Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {foodItems.map((item) => (
            <div key={item._id as string} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image 
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate" title={item.name}>{item.name}</h3>
                {item.tags && item.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 rounded-full">
                        {tag}
                      </span>
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
      </div>
    </section>
  );
}
