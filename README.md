# Little Bow Meadows - Farm E-commerce MVP

## 🚀 Quick Start
```bash
npm install
npm run dev
```

## 📦 Adding Products
1. Edit `src/data/products.json`
2. Add product image to `public/images/`
3. Create price in Stripe Dashboard
4. Update `stripe_price_id` in JSON

## 🔧 Setup
1. Copy `.env.local.example` to `.env.local`
2. Add your Stripe and Resend API keys
3. Set up Stripe webhook: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## 🏠 Airbnb Link
Update `src/app/book/page.tsx` with your listing URL.

## 🚀 Deploy
```bash
vercel --prod
```

## 💰 Costs
- Stripe: 2.9% + $0.30/transaction
- Resend: Free tier
- Vercel: Free tier
