# MCP Labs SaaS Setup Guide

Complete setup guide for the MCP Labs SaaS website.

## ✅ What's Already Built

- **Landing Page**: Hero, Tools, Use Cases, Pricing, FAQ, Contact Form
- **Payment System**: Stripe checkout integration
- **Database**: Supabase tables with RLS policies
- **Auth**: Email/password authentication
- **Customer Dashboard**: License management
- **Edge Functions**: Stripe checkout and webhook handlers

## 🚀 Quick Start

### 1. Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Your Supabase variables are already in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. Configure Stripe

#### Create Products with Monthly and Annual Pricing
1. Go to https://dashboard.stripe.com/test/products
2. Switch to **Test Mode** (toggle top-right)
3. Click **Add Product** and create each product with BOTH monthly and annual prices:

**Product 1: MCP Labs - Startup License**
- Name: MCP Labs - Startup License
- Add TWO prices:
  - Monthly: £39/month (recurring)
  - Annual: £399/year (recurring)
- Copy both **Price IDs** (start with `price_`)
- Add to `.env`:
  - `VITE_STRIPE_PRICE_STARTUP_MONTHLY=price_xxx`
  - `VITE_STRIPE_PRICE_STARTUP_ANNUAL=price_xxx`

**Product 2: MCP Labs - Business License**
- Name: MCP Labs - Business License
- Add TWO prices:
  - Monthly: £149/month (recurring)
  - Annual: £1,599/year (recurring)
- Copy both Price IDs
- Add to `.env`:
  - `VITE_STRIPE_PRICE_BUSINESS_MONTHLY=price_xxx`
  - `VITE_STRIPE_PRICE_BUSINESS_ANNUAL=price_xxx`

**Product 3: MCP Labs - Enterprise License**
- Name: MCP Labs - Enterprise License
- Add TWO prices:
  - Monthly: £399/month (recurring)
  - Annual: £3,999/year (recurring)
- Copy both Price IDs
- Add to `.env`:
  - `VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxx`
  - `VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL=price_xxx`

#### Get API Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy the **Secret key** (starts with `sk_test_`)
3. Save for next step

#### Setup Webhook
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
5. Copy the **Signing secret** (starts with `whsec_`)

#### Add Secrets to Supabase
1. Go to Supabase Dashboard
2. Navigate to **Project Settings** → **Edge Functions**
3. Click **Manage Secrets**
4. Add these secrets:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

### 3. Install & Run

```bash
npm install
npm run dev
```

Visit http://localhost:5173

### 4. Test Payment Flow

#### Use Test Card
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

#### Test Steps
1. Click "Buy Now" on Startup or Business tier
2. Enter test card details in Stripe Checkout
3. Complete payment
4. Redirected to `/success` page
5. License created automatically via webhook
6. View license at `/dashboard`

## 📋 Database Schema

Already created in Supabase:

### `customers`
- Customer information with Stripe IDs

### `licenses`
- License keys with tier, status, expiration
- Format: `MCP-1.0-[TIER]-[RANDOM12]-[CHECKSUM6]`

### `contact_requests`
- Enterprise sales inquiries

All tables have RLS enabled with appropriate policies.

## 🔧 Edge Functions

Two functions are deployed:

### `create-checkout`
- Creates Stripe checkout sessions
- Called when user clicks "Buy Now"

### `stripe-webhook`
- Processes Stripe webhook events
- Generates license keys automatically
- Stores in database

## 🌐 Deployment

### Build
```bash
npm run build
```

### Deploy
Deploy the `dist` folder to:
- Netlify
- Vercel
- Cloudflare Pages

Make sure to set environment variables in your hosting provider.

## ✅ Production Checklist

Before going live:
- [ ] Switch Stripe to Live Mode
- [ ] Update Stripe Price IDs in production `.env`
- [ ] Update webhook URL to production domain
- [ ] Add live Stripe keys to Supabase
- [ ] Test complete purchase flow in production
- [ ] Configure custom domain
- [ ] Set up SSL certificate

## 📧 Email Configuration (Optional)

To send license emails:
1. Set up SMTP in Supabase
2. Create email template
3. Update webhook function to send emails

## 📊 Monitoring

Monitor in production:
- Stripe Dashboard for payments
- Supabase Dashboard for edge function logs
- Check `licenses` table for new records
- Monitor `contact_requests` for leads

## 🔑 License Key Format

Generated keys: `MCP-1.0-[TIER]-[RANDOM12]-[CHECKSUM6]`

Example: `MCP-1.0-STAR-X7K9P4Q2N8M5-A3F9D2`

## 💬 Support

Customer email: licensing@mcplabs.co.uk

## 🎯 Features

✅ Dual licensing (AGPL + Commercial)
✅ Stripe payment integration
✅ Automatic license generation
✅ Customer dashboard
✅ License key copy/download
✅ Setup instructions
✅ Contact form for Enterprise
✅ Responsive design
✅ Production-ready

---

Built with React, TypeScript, Tailwind CSS, Supabase, and Stripe.
