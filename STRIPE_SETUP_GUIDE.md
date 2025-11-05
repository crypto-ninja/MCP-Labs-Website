# Stripe Setup & Troubleshooting Guide

## Issue: "Stripe API error: Bad Request"

This error occurs when trying to create a checkout session. Here are the fixes applied and setup required:

## ✅ Fixes Applied

### 1. Fixed Edge Function (create-checkout)
**Problem**: The function was using `"payment"` mode for annual subscriptions instead of `"subscription"` mode.

**Solution**: Changed to always use `"subscription"` mode for both monthly and annual billing.

```typescript
// Before:
"mode": billingPeriod === "monthly" ? "subscription" : "payment"

// After:
"mode": "subscription"
```

### 2. Improved URL Encoding
**Problem**: URLSearchParams might not properly encode all metadata fields.

**Solution**: Using manual form body encoding with proper `encodeURIComponent`.

## 🔧 Required Setup Steps

### Step 1: Uncomment Stripe Keys in .env

Your `.env` file has Stripe keys commented out. You need to uncomment them:

```bash
# Edit .env file and uncomment these lines:
STRIPE_SECRET_KEY=sk_test_51SNGT2EMTAN8BvI5mDVfar35s4oXmebMERHCBokHMBbmtFgHxRoKDL6oyeIs4Z9RQl0FO1t9usafMBCSs5orc6bh000rIJQRuW
STRIPE_WEBHOOK_SECRET=whsec_73OZXRfAV3PmDVMQJssNJXkzXlp4YJqO
```

### Step 2: Deploy Updated Edge Function

The edge function has been updated. Deploy it using the Supabase MCP tool:

```bash
# The function will be automatically deployed
# Or manually trigger deployment via Supabase dashboard
```

### Step 3: Verify Stripe Price IDs

Make sure your Stripe price IDs in `.env` are valid and exist in your Stripe account:

```bash
VITE_STRIPE_PRICE_STARTUP_MONTHLY=price_1SNGf4EMTAN8BvI5y37ud8mT
VITE_STRIPE_PRICE_BUSINESS_MONTHLY=price_1SNGhIEMTAN8BvI5gHKf4v88
VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY=price_1SNGlAEMTAN8BvI5crqVkkzW

VITE_STRIPE_PRICE_STARTUP_ANNUAL=price_1SNGf4EMTAN8BvI59ttdXq6k
VITE_STRIPE_PRICE_BUSINESS_ANNUAL=price_1SNGiJEMTAN8BvI5oMXJ8ZCt
VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL=price_1SNGmoEMTAN8BvI5sKhnJcAH
```

### Step 4: Test Stripe Connection

You can verify your Stripe setup by:

1. Checking that price IDs exist in your Stripe Dashboard
2. Verifying the secret key has permissions for checkout sessions
3. Testing the checkout flow with a test card

## 🔍 Additional Troubleshooting

### Error: "Stripe secret key not configured"
- Make sure `STRIPE_SECRET_KEY` is set in Supabase edge function environment variables
- Check that the key is not commented out

### Error: "No such price"
- Verify the price ID exists in your Stripe account
- Make sure you're using the correct environment (test vs live)
- Check that the price is active in Stripe

### Error: "Invalid request"
- Ensure success_url and cancel_url are valid URLs
- Check that all required parameters are being sent

## 📝 How the Checkout Flow Works

1. User clicks "Buy License" button
2. Frontend calls `createCheckoutSession()` from `src/lib/stripe.ts`
3. Request is sent to `/functions/v1/create-checkout` edge function
4. Edge function creates Stripe checkout session with:
   - Mode: `subscription` (for recurring billing)
   - Price ID: From environment variables
   - Metadata: Product ID, tier, billing period
   - URLs: Success and cancel redirect URLs
5. Stripe returns checkout URL
6. User is redirected to Stripe hosted checkout
7. After payment, Stripe webhook handles license creation

## 🚀 Next Steps

1. Uncomment Stripe keys in `.env`
2. Deploy the updated edge function
3. Test the checkout flow
4. Monitor Supabase logs for any errors

## 📧 Support

If issues persist, check:
- Supabase edge function logs
- Stripe dashboard for API errors
- Browser console for frontend errors
