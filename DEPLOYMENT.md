# Phoenix Dry Cleaners - Deployment Guide

## ✅ Environment Setup Complete

### Files Created:
- `.env.local` - Your local environment variables (don't commit this!)
- `.gitignore` - Protects sensitive files from git
- `vercel.json` - Vercel deployment configuration
- `api/create-checkout-session.ts` - Serverless Stripe endpoint

### Files Already Configured:
- `.env.example` - Template for environment variables
- `vite.config.ts` - Updated for Vercel

---

## 🚀 Deploy to Vercel

### Step 1: Update Stripe Keys
Replace the test keys in `.env.local` with YOUR actual Stripe keys:

```
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXX  (from Stripe Dashboard)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXX
VITE_STRIPE_PRICE_ID=price_XXXXXXXXXXXX
```

Get these at: https://dashboard.stripe.com/apikeys

### Step 2: Get Stripe Price ID
1. Go to https://dashboard.stripe.com/products
2. Create or select a product
3. Copy the Price ID (price_XXXXXXXX)

### Step 3: Connect Vercel
Option A - Using Vercel CLI:
```bash
npm install -g vercel
vercel login
vercel
```

Option B - Via GitHub (Recommended):
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard

### Step 4: Add Env Variables in Vercel Dashboard
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all three keys:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_STRIPE_PRICE_ID`

### Step 5: Deploy
- CLI: `vercel`
- Or: Push to main branch (if connected to GitHub)

---

## 🧪 Local Testing

```bash
# Install dependencies
npm install

# Set environment variables
# .env.local is already created with test keys

# Run backend server
npm run backend

# In a second terminal, run the Vite app
npm run dev

# Vite will proxy /api/create-checkout-session to the local backend
# Visit http://localhost:5173 and test Stripe checkout
```

---

## ✅ Pre-Deployment Checklist

- [ ] `.env.local` has real Stripe keys
- [ ] Stripe account created at stripe.com
- [ ] Price ID created in Stripe Dashboard
- [ ] `vercel.json` present in root
- [ ] `api/` folder exists with checkout function
- [ ] Images in `public/` folder working
- [ ] Tested locally with `npm run dev`
- [ ] GitHub repository set up (for continuous deployment)
- [ ] Vercel project linked to GitHub

---

## 📝 Notes

- **Test Mode**: Use `sk_test_` and `pk_test_` keys for testing
- **Live Mode**: Replace with `sk_live_` and `pk_live_` when going live
- Never commit `.env` files - they're in `.gitignore`
- Vercel automatically handles SSL/HTTPS
- Your app URL will be: `https://phoenixdrycleaners.vercel.app`
