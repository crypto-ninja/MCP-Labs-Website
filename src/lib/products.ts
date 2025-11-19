export interface PricingTier {
  name: string;
  price: number;
  priceMonthly?: number;
  stripePriceIdAnnual?: string;
  stripePriceIdMonthly?: string;
  license?: string;
  features: string[];
  maxDevelopers?: number | string;
  badge?: string;
  highlighted?: boolean;
}

export interface Product {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  toolCount?: number;
  status: 'production' | 'beta' | 'coming-soon';
  tiers: {
    free: PricingTier;
    startup: PricingTier;
    business: PricingTier;
    enterprise: PricingTier;
  };
}

export const PRODUCTS: Record<string, Product> = {
  github: {
    id: 'github',
    name: 'GitHub MCP Server',
    icon: '🐙',
    tagline: 'Complete GitHub automation with code-first execution',
    toolCount: 42,
    status: 'production',
    tiers: {
      free: {
        name: 'Open Source',
        price: 0,
        license: 'AGPL v3',
        features: [
          'All 42 tools',
          'Code-first execution included',
          'Open source projects only',
          'Must share source code',
          'Community support',
          'GitHub Discussions',
          'No commercial use'
        ],
        badge: 'Free Forever'
      },
      startup: {
        name: 'Startup',
        price: 399,
        priceMonthly: 39,
        stripePriceIdAnnual: import.meta.env.VITE_STRIPE_PRICE_STARTUP_ANNUAL,
        stripePriceIdMonthly: import.meta.env.VITE_STRIPE_PRICE_STARTUP_MONTHLY,
        maxDevelopers: 10,
        features: [
          'All 42 tools',
          'Revolutionary code-first execution',
          '98% token savings',
          'Up to 10 developers',
          'Email support',
          'No source sharing required',
          'Commercial use allowed'
        ],
        badge: 'Most Popular',
        highlighted: true
      },
      business: {
        name: 'Business',
        price: 1599,
        priceMonthly: 149,
        stripePriceIdAnnual: import.meta.env.VITE_STRIPE_PRICE_BUSINESS_ANNUAL,
        stripePriceIdMonthly: import.meta.env.VITE_STRIPE_PRICE_BUSINESS_MONTHLY,
        maxDevelopers: 50,
        features: [
          'All 42 tools',
          'Code-first execution included',
          'Perfect for AI coding assistants',
          'Cursor, Windsurf, Claude Code',
          'Up to 50 developers',
          'Priority support',
          'No source sharing required'
        ]
      },
      enterprise: {
        name: 'Enterprise',
        price: 3999,
        priceMonthly: 399,
        stripePriceIdAnnual: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL,
        stripePriceIdMonthly: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY,
        maxDevelopers: 'Unlimited',
        features: [
          'All 42 tools',
          'Code-first execution included',
          'Unlimited developers',
          '24/7 support with SLA',
          'Dedicated account manager',
          'Custom feature development',
          'On-premise deployment options'
        ]
      }
    }
  }
};

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS[productId];
}

export function getProductTier(productId: string, tierId: string): PricingTier | undefined {
  const product = getProduct(productId);
  if (!product) return undefined;
  return product.tiers[tierId as keyof typeof product.tiers];
}

export function getStripePriceId(productId: string, tier: string, period: 'monthly' | 'annual'): string | undefined {
  const tierData = getProductTier(productId, tier);
  if (!tierData) return undefined;
  return period === 'annual' ? tierData.stripePriceIdAnnual : tierData.stripePriceIdMonthly;
}
