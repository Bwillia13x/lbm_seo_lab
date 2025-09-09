# Environment Setup Guide

## For Development Testing

Create a .env.local file in the project root with:

```bash
NEXT_PUBLIC_SITE_NAME="Little Bow Meadows"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="" 

# Stripe Test Keys (get from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_secret_here"

# Email (Resend - optional for testing)
RESEND_API_KEY="re_your_key_here"
BUSINESS_EMAIL="orders@littlebowmeadows.ca"

PICKUP_ONLY="true"
```

## For Production

Update NEXT_PUBLIC_SITE_URL to your production domain and use live Stripe keys.

## Getting Stripe Test Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy the Publishable key and Secret key
3. For webhooks: https://dashboard.stripe.com/test/webhooks
4. Create webhook endpoint: https://yourdomain.com/api/stripe/webhook
5. Copy the webhook signing secret

## Getting Resend API Key

1. Go to https://resend.com/api-keys
2. Create an API key
3. Copy it to RESEND_API_KEY
