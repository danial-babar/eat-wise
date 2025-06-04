import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a common, clean font
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Can I Eat This? - Your Food Safety Guide",
    template: `%s | Can I Eat This?`,
  },
  description: "Check food safety for Halal, Vegan, Diabetic, Pregnancy, Gluten-Free, and Allergens. Scan barcodes or search by name.",
  keywords: ["food safety", "halal food", "vegan food", "diabetic diet", "pregnancy diet", "gluten-free", "food allergens", "barcode scanner"],
  // Add other SEO metadata here like openGraph, icons etc.
  // Example for icons:
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The 'dark' class will be toggled on this html element by the Navbar's theme switcher
    // Initial class can be set based on user preference or system setting if implemented
    <html lang="en" className="">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

