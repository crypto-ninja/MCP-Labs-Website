# MCP Labs - GitHub MCP Server SaaS Website

Complete, production-ready SaaS website for selling commercial licenses of the GitHub MCP Server.

## 🎉 What's Included

### Landing Page
- ✅ Hero section with CTAs and GitHub badge
- ✅ 31 tools overview in organized grid
- ✅ 3 use case cards (AI Teams, DevOps, Project Managers)
- ✅ Latest release highlights (v1.3.0 - 9 new tools)
- ✅ Trust indicators section
- ✅ Dual pricing model (AGPL Free + 3 Commercial tiers)
- ✅ FAQ section with 6 questions
- ✅ Enterprise contact form
- ✅ Professional footer

### Payment System
- ✅ Stripe Checkout integration
- ✅ Automatic license generation
- ✅ Webhook handling for payment events
- ✅ License format: `MCP-1.0-[TIER]-[RANDOM12]-[CHECKSUM6]`

### Customer Portal
- ✅ Authentication (email/password)
- ✅ Dashboard with license management
- ✅ Copy license key to clipboard
- ✅ Download setup instructions
- ✅ Success page after purchase

### Database (Supabase)
- ✅ `customers` - Customer records
- ✅ `licenses` - License keys with tiers
- ✅ `contact_requests` - Enterprise inquiries
- ✅ Row Level Security enabled

### Edge Functions
- ✅ `create-checkout` - Creates Stripe sessions
- ✅ `stripe-webhook` - Processes payments & generates licenses

## 🚀 Quick Start

See **SETUP.md** for detailed instructions.

### 1. Configure Stripe
```bash
# 1. Create 3 products in Stripe (£399, £1,599, £3,999)
# 2. Add Price IDs to .env
# 3. Set up webhook
# 4. Add secrets to Supabase
```

### 2. Run Locally
```bash
npm install
npm run dev
```

### 3. Test Payment
Use test card: `4242 4242 4242 4242`

## 📦 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Edge Functions**: Supabase Edge Functions (Deno)
- **Build**: Vite

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── supabase.ts       # Supabase client & types
│   ├── stripe.ts         # Stripe configuration
│   └── license.ts        # License key generation
├── contexts/
│   └── AuthContext.tsx   # Authentication provider
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── Dashboard.tsx     # Customer dashboard
│   └── Success.tsx       # Post-purchase page
├── components/
│   ├── Hero.tsx
│   ├── Pricing.tsx       # With Stripe integration
│   ├── ContactForm.tsx
│   └── ... (other components)
└── App.tsx               # Main app with routing
```

## 💳 Pricing

- **Open Source (AGPL v3)**: FREE
- **Startup**: £399/year (10 developers)
- **Business**: £1,599/year (50 developers)
- **Enterprise**: £3,999/year (unlimited)

## 📄 License

The website code is MIT licensed.
The GitHub MCP Server product uses AGPL v3 for open source, commercial licensing available.

## 🔗 Links

- GitHub: https://github.com/crypto-ninja/github-mcp-server
- Domain: mcplabs.co.uk
- Support: licensing@mcplabs.co.uk

## ✅ Build Status

Build successful! Ready for deployment.

---

Built by developers, for developers.
