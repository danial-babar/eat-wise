'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
// import { useRouter } from 'next/navigation'; // For redirecting if not logged in

// Placeholder for user data structure
interface UserProfileData {
  username: string;
  email: string;
  dietaryPreferences: string[];
  // Add other fields like submission history, etc.
}

// export const metadata: Metadata = { // Metadata for client components often set in layout or via document.title
//   title: 'My Profile',
//   description: 'Manage your account details and dietary preferences.',
// };

const availablePreferences = [
  'Halal',
  'Vegan',
  'Vegetarian',
  'Gluten-Free',
  'Diabetic-Friendly',
  'Pregnancy-Safe',
  // Add more specific allergens if needed, or have a separate allergen section
];

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  useEffect(() => {
    document.title = 'My Profile | Can I Eat This?';
    // TODO: Fetch user data from an API endpoint (e.g., /api/users/me)
    // This endpoint should be protected and return the logged-in user's data.
    // Simulating data fetch:
    const fetchUserData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      // Placeholder: In a real app, check session/token and fetch
      // const session = getSession(); // Fictional function
      // if (!session) { 
      //   router.push('/login?redirect=/profile');
      //   return;
      // }
      setUser({
        username: 'TestUser123',
        email: 'testuser@example.com',
        dietaryPreferences: ['Vegan', 'Gluten-Free'],
      });
      setIsLoading(false);
    };

    fetchUserData();
  }, []); // router dependency if used

  const handlePreferenceChange = (preference: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newPreferences = currentUser.dietaryPreferences.includes(preference)
        ? currentUser.dietaryPreferences.filter(p => p !== preference)
        : [...currentUser.dietaryPreferences, preference];
      return { ...currentUser, dietaryPreferences: newPreferences };
    });
  };

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setError(null);
    console.log('Updating profile with:', user);
    // TODO: Implement API call to update user profile (e.g., PUT /api/users/me)
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Example:
    // try {
    //   const response = await fetch('/api/users/me', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json', /* 'Authorization': `Bearer ${token}` */ },
    //     body: JSON.stringify(user),
    //   });
    //   if (!response.ok) throw new Error('Failed to update profile.');
    //   alert('Profile updated successfully!');
    // } catch (err: any) { setError(err.message); }
    // finally { setIsLoading(false); }
    alert('Profile update functionality placeholder.');
    setIsLoading(false);
  };

  if (isLoading && !user) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading profile...</div>;
  }

  if (!user) {
    // This case might be handled by a redirect in useEffect, but as a fallback:
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Could not load profile. You might need to log in.</p>
        {/* Link to login */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Profile</h1>
      
      <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={user.username}
            // onChange={(e) => setUser({...user, username: e.target.value})} // Or make it read-only if not changeable
            readOnly // Often username is not directly changeable or has a special process
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 sm:text-sm text-gray-500 dark:text-gray-400"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={user.email}
            // onChange={(e) => setUser({...user, email: e.target.value})} // Or make it read-only
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 sm:text-sm text-gray-500 dark:text-gray-400"
          />
        </div>
        
        <fieldset className="pt-4">
          <legend className="text-lg font-medium text-gray-900 dark:text-white mb-2">Dietary Preferences</legend>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Select your dietary preferences to help us tailor your experience.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availablePreferences.map(pref => (
              <label key={pref} className="flex items-center space-x-3 p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={user.dietaryPreferences.includes(pref)}
                  onChange={() => handlePreferenceChange(pref)}
                  className="h-5 w-5 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{pref}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Placeholder for changing password */}
        <div className="pt-4">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">Change Password</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Password change functionality will be implemented here.</p>
            {/* <button type="button" className="text-sm text-green-600 hover:underline">Request Password Change</button> */}
        </div>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm text-center p-3 bg-red-50 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* TODO: Section for user's submissions, activity, etc. */}
    </div>
  );
}
