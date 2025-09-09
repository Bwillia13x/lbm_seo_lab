# Deployment Checklist

## Pre-Deployment Setup ✅

- [x] Environment variables configured (.env.local created)
- [x] Stripe test keys obtained
- [x] Product data in src/data/products.json
- [x] Product images in public/images/
- [x] Airbnb link updated in src/app/book/page.tsx
- [x] Legal pages created (privacy, terms, refunds)

## Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy to Vercel
```bash
vercel --prod
```

### 3. Configure Environment Variables in Vercel
In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from your .env.local file
3. Use production values (live Stripe keys, production domain)

### 4. Update DNS (if using custom domain)
Point your domain to Vercel's nameservers or add CNAME record.

## Post-Deployment Testing

### 1. Test Basic Functionality
- [ ] Home page loads correctly
- [ ] Shop page shows products
- [ ] Product detail pages work
- [ ] Navigation works
- [ ] Legal pages load

### 2. Test Purchase Flow
- [ ] Click 'Buy now' on product
- [ ] Redirects to Stripe Checkout
- [ ] Complete test purchase
- [ ] Redirects to success page
- [ ] Owner receives email notification

### 3. Test Webhooks
- [ ] Set up Stripe webhook endpoint
- [ ] Test webhook delivery
- [ ] Verify order emails are sent

## Production Environment Variables

```bash
NEXT_PUBLIC_SITE_NAME="Little Bow Meadows"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="" 

# Use LIVE Stripe keys for production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

RESEND_API_KEY="re_..."
BUSINESS_EMAIL="orders@littlebowmeadows.ca"
PICKUP_ONLY="true"
```

## Troubleshooting

### Build Errors
- Check all environment variables are set
- Verify Stripe API keys are valid
- Ensure product images exist

### Stripe Issues
- Confirm webhook endpoint URL is correct
- Test with Stripe CLI: `stripe listen --forward-to https://yourdomain.com/api/stripe/webhook`

### Email Issues
- Verify Resend API key is valid
- Check BUSINESS_EMAIL is a verified domain in Resend
