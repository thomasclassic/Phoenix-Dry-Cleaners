# Vercel Deployment - Step-by-Step Guide

## Prerequisites
✅ Stripe account created at https://dashboard.stripe.com  
✅ Stripe API keys generated  
✅ Price/Product ID created in Stripe Dashboard  
✅ Code pushed to GitHub  

---

## Step 1: Connect Your GitHub Repository to Vercel

1. Go to https://vercel.com/new
2. Sign in with GitHub account (or create if needed)
3. You'll see: **"Import Git Repository"**
4. Search for your repository: **`Phoenix Dry Cleaners`** (or your repo name)
5. Click **"Import"**
6. Wait for Vercel to scan your project

---

## Step 2: Configure Project Settings

After import, you'll see the **"Configure Project"** page:

### Build & Output Settings
- **Framework Preset**: Select **"Vite"** (should auto-detect)
- **Build Command**: Verify it shows `npm run build`
- **Output Directory**: Verify it shows `dist`
- **Install Command**: Leave as `npm install` (default)

✅ All should be auto-detected. Click **"Continue"** if correct.

---

## Step 3: Add Environment Variables (Critical!)

You'll see a section: **"Environment Variables"**

Add these 3 variables exactly as shown:

### Variable 1: STRIPE_SECRET_KEY
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: Paste your `sk_test_...` or `sk_live_...` from Stripe Dashboard
- Click **"Add"**

### Variable 2: VITE_STRIPE_PUBLISHABLE_KEY
- **Name**: `VITE_STRIPE_PUBLISHABLE_KEY`
- **Value**: Paste your `pk_test_...` or `pk_live_...` from Stripe Dashboard
- Click **"Add"**

### Variable 3: VITE_STRIPE_PRICE_ID
- **Name**: `VITE_STRIPE_PRICE_ID`
- **Value**: Paste your price ID `price_...` from Stripe Dashboard
- Click **"Add"**

⚠️ **Important**: Make sure names match EXACTLY (case-sensitive)

---

## Step 4: Deploy

1. Click **"Deploy"** button (bottom right)
2. Wait 1-3 minutes for build to complete
3. You'll see ✅ **"Congratulations! Your project has been deployed"**
4. Click the **"Visit"** button or copy your URL:
   - Format: `https://phoenixdrycleaners.vercel.app`

---

## Step 5: Verify Deployment

Once deployed:

1. Open your live URL: `https://phoenixdrycleaners.vercel.app`
2. Navigate to **Pricing** page
3. Click any **"Checkout"** button
4. You should be redirected to Stripe checkout
5. Test with Stripe test card: `4242 4242 4242 4242` (exp: 12/34, CVC: 123)

---

## Step 6: View Logs & Troubleshoot

If checkout fails:

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Click your **"phoenixdrycleaners"** project
3. Go to **"Deployments"** tab
4. Click the latest deployment (marked ✅ or ⚠️)
5. Scroll to **"Logs"** section
6. Look for error messages

---

## Environment Variables - Get Your Stripe Keys

### To find STRIPE_SECRET_KEY:
1. Go to https://dashboard.stripe.com/apikeys
2. Under **"Secret key"**, click **"Reveal test key"** (or use live key)
3. Copy the full key starting with `sk_test_` or `sk_live_`

### To find VITE_STRIPE_PUBLISHABLE_KEY:
1. Go to https://dashboard.stripe.com/apikeys
2. Under **"Publishable key"**, copy the full key starting with `pk_test_` or `pk_live_`

### To find VITE_STRIPE_PRICE_ID:
1. Go to https://dashboard.stripe.com/products
2. Click any product, then click **"Pricing"** tab
3. Copy the **"ID"** field (format: `price_XXXXXX`)

---

## Continuous Deployment

After first deploy:
- Any push to your GitHub `main` branch auto-deploys to Vercel
- Previous deployments are kept in history (can rollback)

---

## Troubleshooting

**Problem**: "Stripe keys not configured" error  
**Solution**: Double-check env variable names are EXACT (case-sensitive)

**Problem**: Checkout redirects but doesn't process  
**Solution**: Verify Stripe Price ID exists in your Stripe Dashboard

**Problem**: Build fails  
**Solution**: Check Logs tab in Vercel Deployment page for specific error

---

## Final Checks

Before going live:
- [ ] All 3 Stripe env vars added in Vercel
- [ ] Tested checkout on staging/test stripe keys
- [ ] Verified images load (public/\*.svg files)
- [ ] Booking form displays correctly
- [ ] Pricing page shows all services

🎉 You're ready to go live!
