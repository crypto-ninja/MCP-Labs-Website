import { Check, Github, Mail, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createCheckoutSession } from '../lib/stripe';
import { getProduct, getStripePriceId } from '../lib/products';

type BillingPeriod = 'monthly' | 'annual';

interface PricingProps {
  productId?: string;
}

export default function Pricing({ productId = 'github' }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('annual');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const product = getProduct(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleCheckout = async (tier: 'startup' | 'business' | 'enterprise', period: BillingPeriod) => {
    const loadingKey = `${tier}-${period}`;
    setLoading(loadingKey);
    setError(null);

    try {
      const url = await createCheckoutSession(productId, tier, period);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
      setLoading(null);
    }
  };

  const getSavingsPercentage = (tier: 'startup' | 'business' | 'enterprise') => {
    const tierData = product.tiers[tier];
    if (!tierData.priceMonthly) return 0;
    const yearlyFromMonthly = tierData.priceMonthly * 12;
    const annualPrice = tierData.price;
    return Math.round(((yearlyFromMonthly - annualPrice) / yearlyFromMonthly) * 100);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Flexible Licensing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your team. Switch or cancel anytime.
          </p>

          <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Annual
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save up to 16%
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.tiers.free.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.tiers.free.name}</h3>
            <div className="mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">£0</div>
              <div className="text-sm text-gray-600">{product.tiers.free.license}</div>
            </div>

            <ul className="space-y-3 mb-8">
              {product.tiers.free.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://github.com/crypto-ninja/github-mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              Get Started Free
            </a>
          </div>

          {(['startup', 'business', 'enterprise'] as const).map((tier) => {
            const tierData = product.tiers[tier];
            const price = billingPeriod === 'annual' ? tierData.price : tierData.priceMonthly || 0;
            const savings = getSavingsPercentage(tier);
            const canPurchase = tier === 'startup' || tier === 'business';

            return (
              <div
                key={tier}
                className={`bg-white rounded-xl shadow-lg p-8 border-2 ${
                  tierData.highlighted
                    ? 'border-blue-500 ring-4 ring-blue-100'
                    : 'border-gray-200'
                }`}
              >
                <div className="mb-4">
                  {tierData.badge && (
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {tierData.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tierData.name}</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatPrice(price)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {billingPeriod === 'annual' ? (
                      <>
                        per year
                        {savings > 0 && (
                          <span className="block text-green-600 font-semibold mt-1">
                            Save {savings}%
                          </span>
                        )}
                      </>
                    ) : (
                      'per month'
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tierData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {canPurchase ? (
                  <button
                    onClick={() => handleCheckout(tier, billingPeriod)}
                    disabled={loading === `${tier}-${billingPeriod}`}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      tierData.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === `${tier}-${billingPeriod}` ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Buy License'
                    )}
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Sales
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-700 mb-6">
              Not sure which plan is right for you? We're here to help. Contact our team for personalized recommendations.
            </p>
            <a
              href="mailto:licensing@mcplabs.co.uk"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
