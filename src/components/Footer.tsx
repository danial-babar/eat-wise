'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 text-center">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Can I Eat This? All rights reserved.</p>
        <p className="text-sm mt-2">
          Disclaimer: Food information is community-sourced and may not be 100% accurate. Always verify with official sources.
        </p>
        {/* Placeholder for AdSense or other scripts */}
        {/* <div id="adsense-footer-slot"></div> */}
      </div>
    </footer>
  );
};

export default Footer;
