// This will be a dynamic route, e.g., /blog/my-first-post
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

// Sample data - In a real app, this would come from your database via getStaticProps or getServerSideProps
// or be fetched client-side if you prefer.
const samplePostsData: { [key: string]: any } = {
  'understanding-halal-food-labels': {
    title: 'Understanding Halal Food Labels: A Comprehensive Guide',
    date: 'June 3, 2025',
    category: 'Halal Food',
    author: 'Admin User', // Placeholder
    content: `
      <p class="mb-4">Identifying genuinely Halal-certified products requires a good understanding of various labels, symbols, and certifying bodies. This guide aims to demystify the process.</p>
      <h2 class="text-2xl font-semibold my-4">What is Halal?</h2>
      <p class="mb-4">Halal is an Arabic word meaning lawful or permitted. In the context of food, it refers to food that is permissible according to Islamic law...</p>
      <h2 class="text-2xl font-semibold my-4">Common Halal Symbols</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Symbol 1 (Description)</li>
        <li>Symbol 2 (Description)</li>
      </ul>
      <p class="mb-4">Always check for reputable certification bodies. Not all symbols are created equal.</p>
      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400"><em>Disclaimer: This article is for informational purposes only. Always consult with a qualified Islamic scholar or a local Halal certification authority for specific guidance.</em></p>
    `,
  },
  'top-10-vegan-snacks-on-the-go': {
    title: 'Top 10 Vegan Snacks for When You Are On The Go',
    date: 'June 1, 2025',
    category: 'Vegan Snacks',
    author: 'Admin User',
    content: `
      <p class="mb-4">Busy schedules shouldn't mean compromising your vegan lifestyle. Here are ten quick and easy snack ideas.</p>
      <h2 class="text-2xl font-semibold my-4">Snack Ideas:</h2>
      <ol class="list-decimal list-inside mb-4">
        <li>Fruit and Nut Bars (check ingredients for honey if you avoid it)</li>
        <li>Roasted Chickpeas</li>
        <li>Vegetable Sticks with Hummus</li>
        {/* ... more items ... */}
      </ol>
      <p class="mb-4">Remember to read labels carefully, as ingredients can change.</p>
    `,
  },
  'eating-safely-with-diabetes-during-holidays': {
    title: 'Eating Safely with Diabetes During the Holidays',
    date: 'May 28, 2025',
    category: 'Diabetic Diets',
    author: 'Admin User',
    content: `
      <p class="mb-4">The holiday season is often filled with delicious food, which can be a challenge for individuals managing diabetes. With a bit of planning, you can enjoy the festivities while keeping your blood sugar levels in check.</p>
      <h2 class="text-2xl font-semibold my-4">Tips for Holiday Eating:</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Plan Ahead: Know what will be served and decide on your choices beforehand.</li>
        <li>Portion Control: Use smaller plates and be mindful of serving sizes.</li>
        <li>Stay Hydrated: Drink plenty of water.</li>
        {/* ... more tips ... */}
      </ul>
      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400"><em>Disclaimer: This information is not a substitute for professional medical advice. Consult your doctor or a registered dietitian for personalized guidance.</em></p>
    `,
  },
};

// This function can be used if you're pre-rendering paths with generateStaticParams
// export async function generateStaticParams() {
//   return Object.keys(samplePostsData).map((slug) => ({ slug }));
// }

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Dynamically generate metadata based on the post
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = samplePostsData[slug]; // Fetch post data (replace with DB call)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...', // Basic excerpt from content
    // openGraph: { // Example OpenGraph data
    //   title: post.title,
    //   description: post.content.substring(0, 160).replace(/<[^>]+>/g, '') + '...',
    //   // images: ['/some-image.png'],
    // },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = samplePostsData[params.slug]; // In a real app, fetch from DB

  if (!post) {
    // TODO: Create a proper 404 component or use Next.js notFound()
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
            <Link href="/blog" className="text-green-600 dark:text-green-400 hover:underline">
                ← Back to Blog
            </Link>
        </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <Link href="/blog" className="text-sm text-green-600 dark:text-green-400 hover:underline mb-2 block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Published on {post.date} in <Link href={`/blog/category/${post.category.toLowerCase().replace(' ', '-')}`} className="text-green-600 dark:text-green-400 hover:underline">{post.category}</Link> by {post.author}
        </p>
      </header>
      
      {/* Render HTML content (ensure it's sanitized if from user input or untrusted source) */}
      <div 
        className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-800 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* TODO: Add social sharing buttons, comments section, related posts */}
      <hr className="my-12 dark:border-gray-700"/>
      <div className="text-center">
        <Link href="/blog" className="text-green-600 dark:text-green-400 hover:underline">
            Browse More Articles
        </Link>
      </div>
    </article>
  );
}

// TODO: Create a page for /blog/category/[categoryName] to list posts by category.
