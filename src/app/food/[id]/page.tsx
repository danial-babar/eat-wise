'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FoodItemData } from '@/models/FoodItem'; // Using the client-safe interface

interface ApiResponse {
  message: string;
  data: FoodItemData;
}

export default function FoodDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [foodItem, setFoodItem] = useState<FoodItemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchFoodItem = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/food/${id}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
          }
          const result: ApiResponse = await response.json();
          setFoodItem(result.data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch food item details.');
          console.error(err);
        }
        setIsLoading(false);
      };
      fetchFoodItem();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading food details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error}</p>
        <Link href="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
          Go back to Home
        </Link>
      </div>
    );
  }

  if (!foodItem) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">Food item not found.</p>
        <Link href="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden md:flex">
        {foodItem.imageUrl && (
          <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
            <Image
              src={foodItem.imageUrl}
              alt={foodItem.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        )}
        <div className={`p-6 ${foodItem.imageUrl ? 'md:w-1/2' : 'w-full'}`}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{foodItem.name}</h1>
          
          {foodItem.barcode && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Barcode: {foodItem.barcode}</p>
          )}

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Ingredients:</h2>
            {foodItem.ingredients && foodItem.ingredients.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {foodItem.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No ingredients listed.</p>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Tags:</h2>
            {foodItem.tags && foodItem.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {foodItem.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No tags available.</p>
            )}
          </div>

          {foodItem.allergens && foodItem.allergens.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Allergens:</h2>
              <div className="flex flex-wrap gap-2">
                {foodItem.allergens.map((allergen, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100 text-sm rounded-full">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {foodItem.dietaryFlags && foodItem.dietaryFlags.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Dietary Information:</h2>
              <div className="flex flex-wrap gap-2">
                {foodItem.dietaryFlags.map((flag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 text-sm rounded-full">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {typeof foodItem.isSafeForDiabetics !== 'undefined' && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Safe for Diabetics: <span className={`font-semibold ${foodItem.isSafeForDiabetics ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{foodItem.isSafeForDiabetics ? 'Yes' : 'No'}</span>
            </p>
          )}

          {typeof foodItem.isSafeDuringPregnancy !== 'undefined' && (
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Safe During Pregnancy: <span className={`font-semibold ${foodItem.isSafeDuringPregnancy ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{foodItem.isSafeDuringPregnancy ? 'Yes' : 'No'}</span>
            </p>
          )}

          {typeof foodItem.safetyScore !== 'undefined' && (
             <p className="text-gray-700 dark:text-gray-300 mb-2">
              Safety Score: <span className="font-semibold text-blue-600 dark:text-blue-400">{foodItem.safetyScore}/100</span>
            </p>
          )}

          {foodItem.userNotes && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Notes:</h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{foodItem.userNotes}</p>
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Source: {foodItem.source}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: {new Date(foodItem.updatedAt).toLocaleDateString()}</p>

          <div className="mt-6">
            <Link href="/" className="text-green-600 dark:text-green-400 hover:underline">
              &larr; Back to all foods
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
