'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Contact Us',
//   description: 'Get in touch with the Can I Eat This? team. We\'d love to hear from you!',
// };

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact Us | Can I Eat This?';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    console.log('Contact form submission:', formData);
    // TODO: Implement API call to a backend endpoint (e.g., /api/contact)
    // This endpoint would typically send an email or save the message to a database.
    // Example using a service like Formspree or a custom backend:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (!response.ok) throw new Error('Failed to send message. Please try again later.');
    //   setSuccessMessage('Thank you for your message! We will get back to you soon.');
    //   setFormData(initialFormState); // Reset form
    // } catch (err: any) { setError(err.message); }
    // finally { setIsLoading(false); }

    // Placeholder logic:
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage('Thank you for your message! We will get back to you soon (placeholder).');
    setFormData(initialFormState);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-gray-900 dark:text-white">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Have questions, feedback, or a partnership inquiry? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm dark:bg-gray-700 dark:text-white"></textarea>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center p-3 bg-red-50 dark:bg-red-900/40 rounded-md">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="text-green-700 dark:text-green-300 text-sm text-center p-3 bg-green-50 dark:bg-green-900/40 rounded-md">
              {successMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 dark:focus:ring-offset-gray-800 transition-opacity"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Other ways to reach us:</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                For urgent matters, you can also try <a href="mailto:support@example.com" className="text-green-600 hover:underline">support@example.com</a> (replace with actual email).
            </p>
            {/* Add social media links if applicable */}
        </div>
      </div>
    </div>
  );
}
