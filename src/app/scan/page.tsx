'use client'; // This page will need client-side interactivity for the scanner

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { useRouter } from 'next/navigation'; // Import useRouter
import type { Metadata } from 'next';

export default function ScanPage() {
  const router = useRouter(); // Initialize useRouter
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualBarcode, setManualBarcode] = useState<string>(''); // State for manual input
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null); // Ref to store the scanner instance
  const qrReaderId = "qr-reader"; // ID for the div element

  useEffect(() => {
    document.title = 'Scan Barcode | Can I Eat This?';
    console.log('ScanPage useEffect running. Router:', router);

    if (typeof window !== 'undefined') {
      const html5QrcodeScanner: Html5QrcodeScanner = new Html5QrcodeScanner(
        qrReaderId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [
            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
            // Html5QrcodeScanType.SCAN_TYPE_FILE, // Optionally re-enable file scanning
          ],
          rememberLastUsedCamera: true,
        },
        false // verbose
      );
      scannerRef.current = html5QrcodeScanner;

      const onScanSuccess = (decodedText: string, decodedResult: any) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScanResult(decodedText);
        setError(null); // Clear any previous errors
        if (scannerRef.current) {
          scannerRef.current.clear().catch(err => {
            console.error('Failed to clear scanner after success', err);
            setError('Failed to stop scanner. Please refresh.');
          });
        }
        // Navigate to search page with the barcode
        router.push(`/search?q=${decodedText}`);
      };

      const onScanFailure = (errorMessage: string) => {
        // console.warn(`Scan error: ${errorMessage}`); // Can be too noisy
        // Don't set error for every failed scan attempt.
        // setError(errorMessage); // Can be enabled for debugging
      };

      const qrReaderElement = document.getElementById(qrReaderId);
      if (qrReaderElement) {
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      } else {
        console.error(`Element with id '${qrReaderId}' not found.`);
        setError(`Scanner element not found. Cannot initialize camera.`);
      }
    }

    return () => {
      console.log('ScanPage cleanup function running.');
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => {
          console.error('Failed to clear scanner on unmount', err);
          // setError('Failed to stop scanner on leaving page. Please refresh if issues persist.');
        });
      }
    };
  }, [router, qrReaderId]);

  const handleManualSubmit = () => {
    if (manualBarcode.trim() !== '') {
      setScanResult(manualBarcode.trim()); // Optionally set scanResult for UI feedback
      setError(null); // Clear any previous errors
      router.push(`/search?q=${manualBarcode.trim()}`);
      setManualBarcode(''); // Clear input after submission
    } else {
      setError('Please enter a barcode.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Scan Product Barcode</h1>
      
      <div id="qr-reader-container" className="max-w-md mx-auto text-center">
        {/* The div for the scanner to attach to */}
        <div id={qrReaderId} className="w-full h-auto border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-4 mb-4"> 
          <p className="text-gray-500 dark:text-gray-400">Barcode scanner will load here.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">(Requires camera permission)</p>
        </div>
        
        {/* Fallback for manual barcode entry on desktop or if camera fails */}
        <div className="mt-6">
          <label htmlFor="barcode-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Or enter barcode manually:
          </label>
          <input 
            type="text"
            id="barcode-input"
            placeholder="Enter barcode number"
            value={manualBarcode} // Bind value to state
            onChange={(e) => setManualBarcode(e.target.value)} // Update state on change
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button 
            onClick={handleManualSubmit} 
            className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit Barcode
          </button>
        </div>
      </div>

      {scanResult && (
        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">Scan Successful!</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 mt-2">Barcode: {scanResult}</p>
          {/* TODO: Display food item details fetched based on this barcode */}
          <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching food details...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg shadow text-center">
          <p className="text-red-600 dark:text-red-300">Error: {error}</p>
        </div>
      )}
    </div>
  );
}
