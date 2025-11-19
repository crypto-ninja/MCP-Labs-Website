import { X, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 pr-8">
        <Rocket className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium text-center">
          <span className="font-bold">NEW: v2.1.0</span> with Code-First Execution - 98% Token Reduction!{' '}
          <a
            href="https://github.com/crypto-ninja/github-mcp-server/releases/tag/v2.1.0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-100 transition-colors"
          >
            Read the announcement →
          </a>
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
