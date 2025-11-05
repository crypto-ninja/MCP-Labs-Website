import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Key } from 'lucide-react';

export default function Success() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get('session_id'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Thank you for purchasing MCP Labs! Your license is being generated.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-600" />
              What happens next?
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-blue-600">1.</span>
                <span>You'll receive an email with your license key</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-blue-600">2.</span>
                <span>Access your dashboard to view and download your license</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-blue-600">3.</span>
                <span>Follow the setup guide to integrate with your MCP configuration</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700"
            >
              View Dashboard
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200"
            >
              Return Home
            </a>
          </div>

          {sessionId && (
            <p className="text-xs text-gray-500 mt-8">
              Order ID: {sessionId.substring(0, 20)}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
