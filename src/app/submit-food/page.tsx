'use client';

import { useState } from 'react';
import type { Metadata } from 'next'; // Can be used if parts are static or set via document.title

// export const metadata: Metadata = { // Potentially set in a parent server component or layout
//   title: 'Submit Food Item',
//   description: 'Help our community by submitting new food items or corrections.',
// };

// Define a type for form data for better type checking
interface FoodSubmissionForm {
  name: string;
  barcode: string;
  ingredients: string;
  imageFile: File | null; // Changed from imageUrl: string
  source: string;
  tags: string[];
  allergens: string[];
  isSafeForDiabetics: boolean;
  isSafeDuringPregnancy: boolean;
  userNotes: string;
}

const initialFormState: FoodSubmissionForm = {
  name: '',
  barcode: '',
  ingredients: '',
  imageFile: null, // Changed from imageUrl: ''
  source: '',
  tags: [],
  allergens: [],
  isSafeForDiabetics: false,
  isSafeDuringPregnancy: false,
  userNotes: '',
};

export default function SubmitFoodPage() {
  const [formData, setFormData] = useState<FoodSubmissionForm>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Add client-side check for authentication. Redirect if not logged in.
  // useEffect(() => {
  //   document.title = 'Submit Food Item | Can I Eat This?';
  //   // Check auth status, redirect if necessary
  //   // const session = useSession(); // Example with NextAuth.js
  //   // if (!session) router.push('/login?redirect=/submit-food');
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: fileInput.files ? fileInput.files[0] : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'tags' | 'allergens') => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentValues = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      }
      return { ...prev, [field]: currentValues.filter(item => item !== value) };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Basic validation (more robust validation needed)
    if (!formData.name || !formData.ingredients) {
        setError('Food name and ingredients are required.');
        setIsLoading(false);
        return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('barcode', formData.barcode);
      data.append('ingredients', formData.ingredients);
      data.append('source', formData.source);
      formData.tags.forEach(tag => data.append('tags', tag));
      formData.allergens.forEach(allergen => data.append('allergens', allergen));
      data.append('isSafeForDiabetics', String(formData.isSafeForDiabetics));
      data.append('isSafeDuringPregnancy', String(formData.isSafeDuringPregnancy));
      data.append('userNotes', formData.userNotes);

      if (formData.imageFile) {
        data.append('imageFile', formData.imageFile);
      }

      const response = await fetch('/api/food', {
        method: 'POST',
        // No 'Content-Type' header; browser sets it for FormData
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Submission failed');
      }

      setSuccessMessage(result.message || 'Thank you! Your food item submission has been received.');
      setFormData(initialFormState); // Reset form
      // Reset file input visually if possible (though it's uncontrolled for value)
      const fileInput = document.getElementById('imageFile') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    }
    setIsLoading(false);
  };

  // Sample options for tags and allergens (could be fetched from DB)
  const availableTags = ['Halal', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Organic', 'Kosher'];
  const availableAllergens = ['Nuts', 'Dairy', 'Soy', 'Gluten', 'Shellfish', 'Eggs', 'Fish', 'Peanuts'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Submit a New Food Item or Correction</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
        Help our community grow! If you've found a food item not in our database, or have a correction, please share the details below. All submissions are reviewed before publishing.
      </p>

      {/* TODO: Add a check here: "You must be logged in to submit." if user is not authenticated */}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Food Item Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
        </div>

        <div>
          <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Barcode (UPC/EAN)</label>
          <input type="text" name="barcode" id="barcode" value={formData.barcode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients (comma-separated) <span className="text-red-500">*</span></label>
          <textarea name="ingredients" id="ingredients" rows={3} required value={formData.ingredients} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white"></textarea>
        </div>

        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Food Image (optional)</label>
          <input type="file" name="imageFile" id="imageFile" onChange={handleChange} accept="image/*" className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 dark:file:bg-green-700 file:text-green-700 dark:file:text-green-100 hover:file:bg-green-100 dark:hover:file:bg-green-600" />
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Source of Information (e.g., product packaging, manufacturer website)</label>
          <input type="text" name="source" id="source" value={formData.source} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
        </div>

        <fieldset className="pt-4">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (select all applicable)</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableTags.map(tag => (
              <label key={tag} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" name="tags" value={tag} checked={formData.tags.includes(tag)} onChange={(e) => handleMultiSelectChange(e, 'tags')} className="h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700 dark:ring-offset-gray-800" />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="pt-4">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Known Allergens (select all applicable)</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableAllergens.map(allergen => (
              <label key={allergen} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" name="allergens" value={allergen} checked={formData.allergens.includes(allergen)} onChange={(e) => handleMultiSelectChange(e, 'allergens')} className="h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700 dark:ring-offset-gray-800" />
                <span>{allergen}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="pt-4 space-y-2">
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Safety Information (optional)</legend>
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" name="isSafeForDiabetics" checked={formData.isSafeForDiabetics} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700 dark:ring-offset-gray-800" />
                <span>Is it generally considered safe for diabetics?</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" name="isSafeDuringPregnancy" checked={formData.isSafeDuringPregnancy} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700 dark:ring-offset-gray-800" />
                <span>Is it generally considered safe during pregnancy?</span>
            </label>
        </fieldset>

        <div>
          <label htmlFor="userNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Additional Notes (optional, e.g., specific brand, where to find)</label>
          <textarea name="userNotes" id="userNotes" rows={3} value={formData.userNotes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white"></textarea>
        </div>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm text-center p-3 bg-red-50 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-700 dark:text-green-300 text-sm text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
            {successMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
          >
            {isLoading ? 'Submitting...' : 'Submit Food Item'}
          </button>
        </div>
      </form>
    </div>
  );
}
