import { useState, useEffect } from 'react';
import { X, Mail, User, Building, FileText, Loader2, CheckCircle } from 'lucide-react';
import { addToWaitlist, WaitlistData } from '../lib/waitlist';

interface WaitlistProps {
  product: string;
  productName: string;
  productIcon: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Waitlist({ product, productName, productIcon, isOpen, onClose }: WaitlistProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    useCase: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', name: '', company: '', useCase: '' });
      setSuccess(false);
      setError(null);
      setAlreadySignedUp(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data: WaitlistData = {
      productId: product,
      email: formData.email,
      name: formData.name || undefined,
      company: formData.company || undefined,
      useCase: formData.useCase || undefined
    };

    const response = await addToWaitlist(data);

    if (response.success) {
      setSuccess(true);
      setAlreadySignedUp(response.alreadySignedUp || false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {!success ? (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{productIcon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Join the Waitlist
                </h2>
                <p className="text-gray-600">
                  Be the first to know when {productName} launches
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-semibold text-gray-900 mb-2">
                    How do you plan to use {productName}?
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      id="useCase"
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your use case..."
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Join Waitlist
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We'll notify you when {productName} is available for early access
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {alreadySignedUp ? "You're Already on the List!" : "You're on the Waitlist!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {alreadySignedUp
                  ? "We already have your email and will notify you when it's ready."
                  : "We'll send you an email when " + productName + " launches."}
              </p>
              <div className="text-4xl mb-4">{productIcon}</div>
              <p className="text-sm text-gray-500">
                Thank you for your interest!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
