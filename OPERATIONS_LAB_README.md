# Little Bow Meadows - Operations Lab

A comprehensive web app that reduces workload, smooths pickups, and turns Airbnb demand into clear, capacity-aware decisions.

## 🚀 Quick Start

### 1. Database Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the entire `supabase-schema.sql` file
3. Copy your project URL and API keys from Settings → API

### 2. Environment Variables
Copy `env-setup-template.txt` to `.env.local` and fill in your values:

```bash
# Required environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
AIRBNB_ICAL_URL=https://www.airbnb.com/calendar/ical/your_listing.ics
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
BUSINESS_EMAIL=orders@littlebowmeadows.ca
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
```bash
npm run dev
```

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL + RLS)
- **Payments**: Stripe Checkout with webhooks
- **Email**: Resend for notifications
- **Scheduling**: Vercel Cron jobs
- **Utilities**: QRCode, ICS calendar integration, node-ical

### Key Components

#### 1. Occupancy-Aware Capacity Manager
- **Purpose**: Automatically throttle pickup capacity when Airbnb is occupied
- **API**: `/api/airbnb/refresh` (runs every 6 hours)
- **Data Flow**: Airbnb iCal → Occupancy detection → Capacity rules → Pickup slots

#### 2. Pickup Scheduler
- **Purpose**: Customer-facing slot selection with capacity awareness
- **Pages**: `/pickup-schedule` (customer booking)
- **API**: `/api/pickup-slots/available`, `/api/pickup-slots/generate`
- **Integration**: Stripe metadata for slot reservations

#### 3. Market Events Module
- **Purpose**: Pre-order management for farmers' markets
- **Features**: QR code generation, deadline management, per-customer limits
- **API**: `/api/qr` for printable QR codes

#### 4. Link & QR Campaign Builder
- **Purpose**: Track marketing attribution without ads spend
- **API**: `/r/[slug]` for redirect tracking
- **Analytics**: Click tracking with UTM parameters

#### 5. Local SEO Command Center
- **Purpose**: Google Business Profile optimization checklist
- **Features**: Schema markup builder, review management, NAP consistency tracking

#### 6. Seasonality Planner
- **Purpose**: Automated task generation based on product seasonality
- **Scheduling**: Weekly cron job for task creation

#### 7. Ops Copilot
- **Purpose**: AI-assisted email templates and weekly digests
- **Features**: Smart templates for pickup reminders, market notifications

#### 8. Margins & Fees Dashboard
- **Purpose**: Real-time economics tracking
- **Metrics**: Gross margins, Stripe fees, SKU performance

## 🎯 Business Impact

### For Kyle & Grace (Farm Owners)
- **Less Chaos**: Airbnb occupancy automatically reduces pickup capacity
- **Predictable Revenue**: Pre-orders and slot reservations
- **Market Efficiency**: QR codes and pre-order limits prevent overselling
- **Marketing ROI**: Track which campaigns (posters, Instagram) drive sales
- **Quick Wins**: Add products, set prices, toggle stock in seconds
- **One-Click Reports**: Daily capacity, weekly revenue, stock alerts

### For Customers
- **Convenient Scheduling**: Choose pickup times that work
- **Calendar Integration**: ICS files automatically add to calendars
- **Market Pre-orders**: Reserve items before the event
- **Reliable Availability**: No more "sold out" surprises

## 🔧 API Reference

### Core APIs
- `GET /api/airbnb/refresh` - Import Airbnb occupancy (cron)
- `GET /api/capacity/[date]` - Get capacity for specific date
- `POST /api/pickup-slots/generate` - Create slots for next 14 days (cron)
- `GET /api/pickup-slots/available?date=2024-01-01` - Get available slots
- `GET /api/qr?url=https://...` - Generate QR code
- `GET /r/[slug]` - Trackable link redirects

### Integration APIs
- `POST /api/checkout?slug=eggs&qty=2&pickup_slot_id=uuid` - Stripe checkout
- `POST /api/stripe/webhook` - Handle payment confirmations

## 📊 Dashboard Features

### Main Dashboard (`/lab`)
- **Today's Capacity**: Real-time pickup slot availability
- **Today's Pickups**: Confirmed reservations
- **This Week Revenue**: Gross margin tracking
- **Airbnb Status**: Occupancy indicator

### Tabbed Interface
1. **Orders**: Transaction history and customer details
2. **Pickups**: Calendar view of scheduled pickups
3. **Inventory**: Stock levels and seasonal alerts
4. **Events**: Market event management and QR codes
5. **Links/QR**: Campaign tracking and attribution
6. **SEO**: GBP checklist and schema markup
7. **Customers**: Contact management and waitlists
8. **Analytics**: Revenue trends and SKU performance

## 🔄 Automated Workflows

### Daily (00:05)
1. Generate pickup slots for next 14 days
2. Apply capacity rules based on Airbnb occupancy
3. Update slot availability

### Every 6 Hours
1. Refresh Airbnb occupancy data
2. Update capacity calculations
3. Send alerts if occupancy changes

### Weekly (Monday 09:00)
1. Generate seasonal tasks
2. Send market event reminders
3. Create weekly performance digest

### On-Demand
1. QR code generation for marketing materials
2. ICS calendar attachments for confirmations
3. Email notifications for orders and reminders

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically
4. Cron jobs run automatically

### Manual Deployment
1. Build: `npm run build`
2. Start: `npm start`
3. Set up external cron jobs for automated tasks

## 📈 Success Metrics

### Operational KPIs
- **Pickup Slot Utilization**: Target > 80%
- **On-Time Pickups**: Target > 95%
- **Market Pre-order Rate**: Target > 60%
- **Airbnb Integration Accuracy**: Target > 99%

### Business KPIs
- **Revenue per Pickup Slot**: Track efficiency
- **Customer Repeat Rate**: Measure satisfaction
- **Marketing Attribution**: ROI by campaign type
- **Time Saved**: Hours/week from automation

## 🛠️ Customization

### Adjusting Capacity Rules
Edit `capacity_rules` table in Supabase:
```sql
UPDATE capacity_rules
SET base_pickups = 15, occupied_pickups = 8
WHERE weekday = 5; -- Friday
```

### Adding Products
Use existing product management or extend with seasonal fields.

### Custom Email Templates
Modify templates in `/lib/emails.ts` for your branding.

## 🆘 Troubleshooting

### Common Issues
1. **Airbnb calendar not updating**: Check iCal URL validity
2. **Slots not generating**: Verify cron job configuration
3. **Stripe webhooks failing**: Confirm webhook endpoint URL
4. **QR codes not working**: Check URL encoding

### Debug Commands
```bash
# Test Airbnb import
curl https://your-domain.com/api/airbnb/refresh

# Test capacity lookup
curl https://your-domain.com/api/capacity/2024-01-01

# Test slot generation
curl -X POST https://your-domain.com/api/pickup-slots/generate
```

## 📚 Next Steps

1. **Go Live**: Set up production Supabase and Stripe accounts
2. **Training**: Walk through the dashboard with Kyle & Grace
3. **Marketing Materials**: Generate QR codes for market tables
4. **Customer Communication**: Send pickup reminder emails
5. **Analytics Setup**: Configure revenue tracking
6. **Seasonal Planning**: Set up product seasonality rules

---

**Built for Little Bow Meadows with ❤️**
Reducing farm operations chaos, one automated workflow at a time.
