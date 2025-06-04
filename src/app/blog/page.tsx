import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Food Safety & Dietary Tips',
  description: 'Read our latest articles on Halal food, vegan snacks, diabetic-friendly meals, pregnancy nutrition, and more.',
};

// Sample Blog Post Data (to be replaced with data from MongoDB)
const samplePosts = [
  {
    slug: 'understanding-halal-food-labels',
    title: 'Understanding Halal Food Labels: A Comprehensive Guide',
    date: 'June 3, 2025',
    excerpt: 'Learn how to identify genuinely Halal-certified products by understanding common labels and symbols.',
    category: 'Halal Food',
  },
  {
    slug: 'top-10-vegan-snacks-on-the-go',
    title: 'Top 10 Vegan Snacks for When You Are On The Go',
    date: 'June 1, 2025',
    excerpt: 'Finding quick and easy vegan snacks can be challenging. Here are our top 10 picks for busy vegans.',
    category: 'Vegan Snacks',
  },
  {
    slug: 'eating-safely-with-diabetes-during-holidays',
    title: 'Eating Safely with Diabetes During the Holidays',
    date: 'May 28, 2025',
    excerpt: 'Navigating holiday meals with diabetes requires planning. Get tips for enjoying festivities without compromising your health.',
    category: 'Diabetic Diets',
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">Our Blog</h1>
      
      {/* TODO: Add category filters or a search bar for blog posts */}
      {/* <div className="mb-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">Filter by category or search will go here.</p>
      </div> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {samplePosts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            {/* Placeholder for featured image */}
            {/* <div className="h-48 bg-gray-200 dark:bg-gray-700"></div> */}
            <div className="p-6 flex-grow">
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-1">{post.category}</p>
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="text-gray-900 dark:text-white hover:text-green-700 dark:hover:text-green-300 transition duration-300">
                  {post.title}
                </Link>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow">
                {post.excerpt}
              </p>
            </div>
            <div className="p-6 pt-0">
                <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-green-600 dark:text-green-400 hover:underline font-medium text-sm"
                >
                    Read More →
                </Link>
            </div>
          </article>
        ))}
      </div>

      {/* TODO: Add pagination if there are many posts */}
    </div>
  );
}
