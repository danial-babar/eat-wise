import Link from 'next/link';
import FeaturedFoodItems from '@/components/FeaturedFoodItems';

export default function Home() {
  return (
    <div className="text-center">
      <section className="py-12 md:py-20 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-700 dark:to-emerald-800 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Can I Eat This?
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your friendly guide to food safety. Instantly check if a food item meets your dietary needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/search"
              className="bg-white text-green-700 dark:bg-green-400 dark:text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-green-300 transition duration-300 text-lg w-full sm:w-auto"
            >
              Search Food by Name
            </Link>
            <Link 
              href="/scan"
              className="bg-yellow-400 text-gray-900 dark:bg-yellow-500 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-300 dark:hover:bg-yellow-400 transition duration-300 text-lg w-full sm:w-auto"
            >
              Scan a Barcode
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">1. Search or Scan</h3>
              <p className="text-gray-700 dark:text-gray-300">Enter a food item's name or scan its barcode using your device's camera.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">2. Set Preferences</h3>
              <p className="text-gray-700 dark:text-gray-300">Tell us your dietary needs: Halal, Vegan, Diabetic, Pregnant, Allergies, etc.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">3. Get Instant Results</h3>
              <p className="text-gray-700 dark:text-gray-300">Quickly see if the food is safe for you with clear, easy-to-understand labels.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedFoodItems />

      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-white">From Our Blog</h2>
          {/* Blog post previews will go here */}
          <p className="text-center text-gray-600 dark:text-gray-400">Stay updated with the latest tips and guides on healthy and safe eating.</p>
          <div className="text-center mt-6">
            <Link 
                href="/blog"
                className="text-green-600 dark:text-green-400 hover:underline font-semibold"
            >
                Read More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

