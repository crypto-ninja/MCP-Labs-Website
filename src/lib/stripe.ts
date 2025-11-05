import { getStripePriceId } from './products';

export async function createCheckoutSession(
  productId: string,
  tier: 'startup' | 'business' | 'enterprise',
  billingPeriod: 'monthly' | 'annual' = 'annual',
  customerEmail?: string
) {
  const priceId = getStripePriceId(productId, tier, billingPeriod);

  if (!priceId) {
    throw new Error(`No price ID found for ${productId} - ${tier} - ${billingPeriod}`);
  }

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        productId,
        tier,
        billingPeriod,
        priceId,
        customerEmail,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/?cancelled=true`,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
}
